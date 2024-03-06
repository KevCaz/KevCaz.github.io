---
title: Migrating from Buster to Bullseye
date: 2020-09-18
tags: [setup, Linux, Debian, Buster, Bullseye]
---


In July 2019, [Buster became the stable release of
Debian](https://lists.debian.org/debian-announce/2019/msg00003.html) and the
Bullseye became *de facto* the new testing distribution. After spending almost 2
years on Buster, I decided last week that it was time to migrate to Bullseye. 


## Backing up

I frequently backup my files (so far with a simple bash function that copies
them to my external hard drive). Plus, I also have a <i class="fab fa-github"
aria-hidden="true"></i> repository,
[dotfiles](https://github.com/KevCaz/dotfiles), where I stored my configuration
files (the ones I can share). Before the migration, I created a separate backup
with my regular files and as many configuration files as possible (for instance
I backed up my `.local` folder). For this migration, I was eager to learn how to
backup my GNOME keybindings as well as the GNOME terminal profiles I used.
Turned out I only needed one command: `dconf` [see this page on
developer.gnome.org](https://developer.gnome.org/dconf/unstable/dconf-overview.html)
that I used as follows:

```sh
dconf dump /org/gnome/terminal/legacy/profiles:/ > config/gnome-terminal-profiles.dconf.bak
dconf dump /org/gnome/settings-daemon/plugins/media-keys/ > config/media-keys-keybindings.dconf.bak
```

Note that in order to restore my keybindings and my profile, I need to call
`load` instead of `dump`, like so:

```sh
dconf load /org/gnome/terminal/legacy/profiles:/ < config/gnome-terminal-profiles.dconf.bak
dconf load /org/gnome/settings-daemon/plugins/media-keys/ < config/media-keys-keybindings.dconf.bak
```


## Creating a bootable USB stick

After I ensured that all I needed was safely stored in a external drive, I  created a bootable USB stick. I first [downloaded the last Debian testing image](https://www.debian.org/CD/http-ftp/) and as I opted for **.iso** image I unmounted the stick and copied this image to the stick (as explained on the [official website](https://www.debian.org/releases/jessie/amd64/ch04s03.html.en)): 


```sh 
cp debian.iso /dev/sda && sync
```

Then I rebooted my machine and pressed <kbd>F12</kbd> on startup (I own a Lenovo ThinkPad T470p) to display the list of devices and access the installation disk and I went through all the steps to complete the installation of Bullseye (which is relatively quick). 


## Setting up the set of software I frequently use 

Once Debian Buster was installed, I first edited `/etc/apt/sources.list` in super user mode (`su`):


```sh
# my sources.list file
## Canada mirror 
deb http://ftp.ca.debian.org/debian/ bullseye main contrib non-free
deb-src http://ftp.ca.debian.org/debian/ bullseye main contrib non-free

## security updates 
deb http://security.debian.org/ bullseye-security main contrib non-free
deb-src http://security.debian.org/ bullseye-security main contrib non-free
```


Then I went thought the following steps to install all the software I needed and then I copied my files.  



<script src="https://gist.github.com/KevCaz/ad87721016ba091f8bf9d594fc6dac55.js"></script>


## Current system 

Below is a description of my current system, i.e. what was installed during the process described above.

```sh
$ inxi -S
System:    Host: debkev Kernel: 5.7.0-3-amd64 x86_64 bits: 64 Desktop: GNOME 3.36.6 
           Distro: Debian GNU/Linux bullseye/sid 
```
