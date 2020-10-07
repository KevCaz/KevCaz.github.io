---
title: "Send a set of command lines to GNOME Terminal with Wayland"
date: 2020-09-20
tags: [Atom, cli, gnome-terminal, window manager, xclip, xdotool, xsel]
---

## Context

new set up I was eager to give another chance to write script with Wayland 
to send a command to terminal via [xdotool]()


Before going any further, I must admit that the subject is fairly technical and way beyond my expertise but I had to dig a bit cause I wanted to understand why I cannot do something very very helpful to me with Wayland so I read a bit.  


https://en.wikipedia.org/wiki/Wayland_(display_server_protocol)

https://wayland.freedesktop.org/docs/html/

https://wayland.freedesktop.org/architecture.html

https://blogs.gnome.org/mclasen/2016/03/04/why-wayland-anyway/

https://unix.stackexchange.com/questions/202891/how-to-know-whether-wayland-or-x11-is-being-used


[ydotool](https://github.com/ReimuNotMoe/ydotool) allows sone 


There is no active window in wayland??


massive security vulnerabilities present in X11
https://github.com/hluk/CopyQ/issues/27

Cause of all 

I get the security issue cause more and more application goes on the web for various reason. 
(more than just updates, sending stack, retrieveing information, data) so if they can act as cheval to Troies to acess other potentially more sensitive apps" That said the idea of making secure so apps cannot communicate is too bad may be better if communication improved while mroe secured (i.e. securize in/out communications)


[sway](https://swaywm.org/)

https://github.com/swaywm/sway

compositor

Not everything is native there is XWayland (X11 compatibility layer)

making some command  working so kind of confusing https://unix.stackexchange.com/questions/392437/how-can-i-minimise-all-gnome-wayland-windows-from-the-command-line

https://web.archive.org/web/20180402235234/https://fedoraproject.org/wiki/How_to_debug_Wayland_problems

So 

Currently GNOME has all windows native Wayland so I cannot switch to GNOME terminal. which prevents me form.

xdotool search --class firefox-esr  
xdotool search --class slack  
xdotool search --class VSCodium

still works 

xdotool search --class gnome-terminal

does not 


So as of 21/09 cannot really see the plus side of id. Happy but still in progression hopefully the next year will bring tools to help managing safely windows in order to send command from safely. 



```sh
$ sudo apt-get install wl-clipboard
$ wl-copy Hello
$ wl-paste  
```



https://www.linux-magazine.com/Online/Features/Is-Wayland-the-New-X



https://en.wikipedia.org/wiki/Mesa_(computer_graphics)



https://stackoverflow.com/questions/45465016/how-do-i-get-the-active-window-on-gnome-wayland

https://stackoverflow.com/questions/48797323/retrieving-active-window-from-mutter-on-gnome-wayland-session

https://www.freedesktop.org/software/gstreamer-sdk/data/docs/2012.5/gio/gdbus.html

https://dbus.freedesktop.org/doc/dbus-tutorial.html#uses


https://docs.fedoraproject.org/en-US/fedora/rawhide/system-administrators-guide/Wayland/

https://fedoramagazine.org/simulate-device-input-evemu/

see evemu-tools/

sudo apt-get install evemu-tools



clear info 

https://wiki.ubuntu.com/Wayland

>  Wayland also permits running an X11 server inside itself, so you also always have the option of just running X11 clients on top of the server. 