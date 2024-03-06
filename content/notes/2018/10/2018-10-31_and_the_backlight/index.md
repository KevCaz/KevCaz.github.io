---
title: "And the backlight buttons stopped responding!"
date: 2018-10-31
tags: [Debian, hardware, backlight]
---

### :bat: Happy Halloween! :bat:

In order to celebrate, I thought it would be appropriate to write about something spooky :ghost:! So, as far as I remember, when I first installed Debian on my Lenovo T470p everything was OK, all the buttons were behaving just as expected, but, after a hibernation, the screen backlight buttons where not working anymore :scream:. Even more frightening, since that time, I am not able to change the intensity of the screen backlight from [GNOME control center](https://www.systutorials.com/docs/linux/man/1-gnome-control-center/) and since recently I have the same issue for the keyboard backlight :scream:.

So far, I have never found a way to fix this but I found a workaround by looking on how to fix this issue. Basically, the intensity of the screen backlight and the keyboard backlight are given by numbers stored in files named `brightness` found folders in `/sys/class/` that correspond to the two device (bscreen acklight and keyboard backlight). So I have created two aliases in my `.zprofile` to modify the values in these files:

```sh
alias mysbl='sudo tee /sys/class/backlight/intel_backlight/brightness <<<'
alias mykbl='sudo tee /sys/class/leds/tpacpi::kbd_backlight/brightness <<<'
```

To understand the lines above you must know what [tee](https://en.wikipedia.org/wiki/Tee_(command)) is and what are [here-strings](https://www.tldp.org/LDP/abs/html/x17837.html) (for the latter I found [this answer](https://unix.stackexchange.com/questions/80362/what-does-mean) pretty useful). So now, let's say I want to change my backlight to medium intensity, if so I would open my terminal and then type:

```sh
$ mysbl 800
```

That's it! I wish this will be fixed soon, I guess I have to reinstall something... If I found a solution or if a future update fixes this, I'll write another note, in the meanwhile I'll keep using theses aliases!
