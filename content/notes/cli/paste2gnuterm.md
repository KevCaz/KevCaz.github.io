---
title: "Send a set of command lines to GNOME Terminal"
date: 2019-06-10
tags: [Atom, cli, gnome-terminal, window manager, xclip, xdotool, xsel]
---

## Context

As mentioned several times on this website, I use [Atom](https://atom.io/) for
my coding as well as for writing posts and manuscripts. While coding, one often
needs to run commands in a terminal. To do so, I use specific Atom packages such
as [IDE-R](https://atom.io/packages/ide-r) or [Julia
Client](https://github.com/JunoLab/atom-julia-client) to run R and Julia
commands respectively and
[platformio-ide-terminal](https://github.com/platformio/platformio-atom-ide-terminal).
The latter meets most of my expectations, but:

1. the terminal emulated is in a bottom panel and when I'm working on my laptop I cannot get a good overview of the code and the corresponding outputs at the same time, pretty annoying... and having the terminal in the right panel is a [feature unlikely to be implemented in a near future](https://github.com/platformio/platformio-atom-ide-terminal/issues/198);

2. in many cases, I'd prefer to run command lines in a terminal emulator that is
not a child process of Atom so that the commands are run independently from it.

The solution I've envisioned for a while now is to use Atom for coding and run
the commands in GNOME terminal (which I very much like, [but many good
alternatives
exist](http://www.linuxandubuntu.com/home/10-best-linux-terminals-for-ubuntu-and-fedora). Of course I have always been able to do so, but I had to copy paste every code chunk :arrow_down:.

{{< screencast src="/notes/cli/assets/copypaste.webm">}}

And this has always been bothering me (more than it should have) for a long time
now. So last weekend I decided to find a way to get a shortcut that would
directly send command lines to GNOME Terminal and execute it.

There actually is an Atom package to send command to Terminal,
[r-exec](https://atom.io/packages/r-exec), but it only works for MacOS as it
uses
[AppleScript](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptX/AppleScriptX.html). So, all I had to do was to do an Linux equivalent of r-exec, no less... I rolled up my sleeves and
read and code and read and code and finally came out with a solution :smile:!


## Solution

### Requirements

Before detailing the bash script I created, I must mention a couple of important point about prerequisites. First, here is my current OS and desktop environment (I've used [inxi](https://github.com/smxi/inxi) to share these infos):

```
$ inxi -S
System:
 Host: debkev Kernel: 4.19.0-5-amd64 x86_64 bits: 64
 Desktop: Gnome 3.30.2 Distro: Debian GNU/Linux 10 (buster)
```

Second, **the solution below only works if GNOME is running atop
[X.org](https://www.x.org/wiki/)**, not on
[Walyand](https://wayland.freedesktop.org/) which is [the default on Debian
Buster](https://www.phoronix.com/scan.php?page=news_item&px=Debian-10-GNOME-Wayland-vs-X). In my case, the very first step was to go back to [X.org](https://www.x.org/wiki/). To do so, I commented the line `WaylandEnable=false` in `/etc/gdm3/daemon.conf` :arrow_down::


{{< imgcenter "/notes/cli/assets/backtoXorg.png" 65 >}}

<br>

That being said, if you are using a UNIX distro and your terminal window is managed by X.org, it should fairly easy to adapt the approach below.


### Bash script

In order to use the script, `xclip` and `xdotool` must be installed:

```
# apt-get install xclip xdotool
```

The bash script I've created automates 4 operations:

1. it copy-pastes the current selection with [xclip](https://github.com/astrand/xcli);

2. it calls [xdotool](https://github.com/jordansissel/xdotool) to identify where GNOME-Terminal windows and use the id of the last one (with `tail`);

3. it changes the focused window with `xdotool`;

4. it pastes the content of the clipboard in the Terminal and executes the command via `xdotool`.


Here is the bash script I used:

```
#!/bin/bash
# Current selection to clipboard
xclip -o -selection primary | xclip -i -selection clipboard

# pause to let me have all my keys are up
# see https://stackoverflow.com/questions/34092604
sleep .1

# Find the last gnome terminal window
w=$(xdotool search --class gnome-terminal | tail -1)

# test if a terminal is actually open, otherwise opens one
if ! [[ $w =~ [0-9]+ ]]; then
  gnome-terminal
  w=$(xdotool search --class gnome-terminal | tail -1)
fi

# focus on the right window
xdotool windowfocus $w

# paste the command (ctrl+shift+v) and execute it (Return)
xdotool key --clearmodifiers ctrl+shift+v Return
```

The final step was to create a [key
shortcut](https://docs.fedoraproject.org/en-US/quick-docs/proc_setting-key-shortcut/)
that triggers this script (which I named `tognuterm` and turned into an
executable with `chmod 755 tognuterm`). This works pretty well :fireworks:
:fire: :boom: and not only I can easily run any command from Atom but I also can run a command from any
application (for instance, from my Internet browser :wink:).

{{< screencast src="/notes/cli/assets/newshortcut.webm">}}



### Important notes

#### Extra readings

First of all, in order to create the script above I've got good hints reading [this answer on <i class="fa fa-stack-exchange" aria-hidden="true"></i>](
https://unix.stackexchange.com/questions/11889/pasting-x-selection-not-clipboard-contents-with-keyboard)! Second, there is a tool similar to `xclip`: [xsel](https://github.com/kfish/xsel) that you can use here (see below) and  [Fernando Basso wrote a nice piece about these two](https://fernandobasso.github.io/shell/copy-paste-from-command-line-xclip-xsel-clipboard.html) that I strongly recommend (obviously, you should also look at the documentation: `man xclip` and `man xdotool`). Third, you should better read a bit about `xdotool` as it is pretty handy: it simulates keyboard input and mouse activity, so you can create script that resize windows, enter keys, [clicks](https://www.youtube.com/watch?v=SIjumbdkq_w), etc. Note that due to its nature, it does interact with your own activity and [that is why using `sleep` could be useful](https://stackoverflow.com/questions/34092604/xdotool-why-sleep-before-running-commands), it took me some time to understand this but it explains why some time your script does not work!

#### Using `xsel` instead of `xlip`

Here, `xsel` and `xclip` are interchangeable, you can use either and even the two of them. If you prefer `xsel` over `xclip`, simply replace the line `xclip -o -selection primary | xclip -i -selection clipboard` by `xsel | xsel --clipboard`.


### Only `xdotool` approach

You can actually simulate a copy event with `xdotool` instead of using `xsel` or `xclip`. I refrained using this approach because ultimately, I would rather opt for a solution that do not require to simulate keyboard events. Anyway, it you want to give it a try, you can replace `xclip -o -selection primary | xclip -i -selection clipboard` by `xdotool key --clearmodifiers ctrl+c` and for the reasons explained above you better add a pause before the command (e.g. `sleep .2`).


### Using another Terminal emulator

The solution should work with any terminal emulator, you simply need to use the
relevant `xdotool search` command. For instance, if you want to use
[Terminator](https://gnometerminator.blogspot.com/p/introduction.html), the
search command should be `xdotool search --class terminator`. If you do not know
how to retrieve info about about windows, check [`xwininfo`](https://linux.die.net/man/1/xwininfo) out!



## Concluding remarks

1. The solution I came up with is far from being perfect, but it works well and it is a good starting point. If I improve it in a near future, I'll write another note about this!

2. Looks like Wayland is meant to replace X.org, so I'd better think about a solution that would work on Wayland... Again, IMHO, the best approach would not depend on a specific window manager.


## That's all folks!
