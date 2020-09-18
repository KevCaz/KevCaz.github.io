---
title: "Dual Boot MacOS-Ubuntu"
date: 2019-07-16
tags: [hardware, installation, setup, MacBookPro, MacOS, Linux, Debian, Ubuntu]
---


## Context

I must say that I have been quite unhappy with my old Mac Book Pro (mid 2012)
for almost a year now. IIRC, I got it early 2013 and it served me well during my
PhD but now it is kind of slow :turtle: and often behaves weirdly on boot. Last
weekend fir instance, I got a nasty black screen on boot :scream:. Turns out it
happens frequently and there are no less than [four different solutions to this
issue
:scream:](http://osxdaily.com/2014/11/22/fix-macbook-pro-booting-black-screen/)
(in my case, emptying the PRAM did the job)... Windows, MacOS, blue screen,
black screen, yunno... I found having these issues actually rather worrisome
because I care about my computer, I update it frequently and I'm actually
capable of solving this kind of issues, so WTF? This whole situation makes me
wonder what people unable to deal with this kind of problem would do... My guess
is they would go to an fancy Apple store to either get it fixed :moneybag: or
get a new shinny Mac :moneybag::moneybag::moneybag:! Anyway, as the time went on, I started to feel frustrated and as I was not a big fan of [MacOS Mojave](https://www.apple.com/ca/fr/macos/mojave/) (it brings nothing I need and I haven't noted any improvement). Given this I decided:

1. to get rid of Mojave and clean install High Sierra on one partition;
2. to install Ubuntu 18.04 on a second one.



## Clean install MacOS High Sierra


This is a two steps procedure detailed in several posts (e.g. [here](https://setapp.com/how-to/how-to-clean-install-macos-high-sierra) and [there](https://9to5mac.com/2018/06/18/how-to-create-a-bootable-macos-mojave-10-14-usb-install-drive-video/)):

1. create a bootable installer (the easiest way is to use a USB stick) which requires to [download the installer for High Sierra and use the 'createinstallmedia' command in a terminal](https://support.apple.com/en-us/HT201372);

2. use the bootable installer, i.e. rebooting the Mac while holding the Option key (`alt`) and then boot on the installer which guides you through all the steps.

Note that as I wanted to create a second partition with Ubuntu I had to use
[Disk Utility](https://support.apple.com/en-ca/guide/disk-utility/welcome/mac)
to partition the hard drive (NB this requires to select `Show All Devices` in
the `View` menu in Disk Utility in order to select the hard drive -- not a
container). Afterwards I installed [Homebrew](https://brew.sh/) and a couple of
of software for the time being, i.e. I opened the terminal and entered:

```sh
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install git imagemagick ffmpeg docker hugo R postgresql hugo
$ brew cask install atom firefox google-chrome iterm julia libreoffice vlc sage
```

I couldn't resist to install [SteamOS](https://store.steampowered.com/steamos)
and [OpenEmu](https://openemu.org/) :laughing: even though I'm not spending much
time on them (`brew cask install steam openemu`).

After this, the first part was completed :white_check_mark:.




## Dual boot MacOS/Ubuntu

There are several blog posts/tutorials covering this, see for instance [the post on Lifewire](https://www.lifewire.com/dual-boot-linux-and-mac-os-4125733). In a nutshell, the installation of Ubuntu requires to:

1. create a bootable installer for [Ubuntu 18.04 - *Bionic Beaver*](http://releases.ubuntu.com/18.04/);

2. use the bootable installer;


I actually tried to create a bootable installer on my Debian computer but MacOS
was not capable of recognizing the installer (did not try to solve this issue,
that just irritates me). So I did it on my freshly MacOS High Sierra partition,
i.e. after I [downloaded the Ubuntu desktop
image]((http://releases.ubuntu.com/18.04/)), I used the `dd` command to create
the installer on my USD stick. Note that I got the right location, `disk1`,
using `diskutil list` in a terminal (I would have used `lsblk` on Debian). So
here is what I did:

```sh
$ sudo umount /dev/<disk?>
$ sudo dd if=./ubuntu-18.04.2-desktop-amd64.iso of=<disk?> bs=4m && sync
```

where `<disk?>` was replaced by `disk1` in my case. For the records, I would have done the following on Debian:

```sh
$ sudo umount /dev/<sda?>
$ sudo dd bs=4M if=./ubuntu-18.04.2-desktop-amd64.iso of=/dev/<sda?> conv=fdatasync
```

where `<sda?>` would have been `sda1` (again, in my case). Once the Ubuntu
installer created I rebooted and held `alt` to launch the Ubuntu installer. The
tricky part was to find the right partition so I used the partition manager to select the right partition (for me it was `sda4` and I needed to first remove it with `-` to turn it into free space which I used to install Ubuntu. Once done, I installed several packages:

```sh
# apt-get update && apt-get upgrade
# apt-get install inkscape libreoffice gimp imagemagick ffmpeg vlc git inxi \
  openssh-server gconf2 pandoc texlive fonts-powerline zsh cmake python-pip \
  r-base r-base-core r-recommeneded r-cran-*
```

and below are a couple of characteristics of my MacBookPro returned by [inxi](https://github.com/smxi/inxi) on my Ubuntu partition:

```sh
$ inxi -SMCGP
System:    Host: kevcaz-mbp Kernel: 4.18.0-25-generic x86_64 bits: 64 Desktop: Gnome 3.28.4
          Distro: Ubuntu 18.04.2 LTS
Machine:   Device: laptop System: Apple product: MacBookPro9 1 v: 1.0 serial: N/A
          Mobo: Apple model: Mac-4B7AC7E43945597E v: MacBookPro9 1 serial: N/A
          UEFI: Apple v: 226.0.0.0.0 date: 04/16/2019
CPU:       Quad core Intel Core i7-3720QM (-MT-MCP-) cache: 6144 KB
          clock speeds: max: 3600 MHz 1: 2498 MHz 2: 2829 MHz 3: 3346 MHz 4: 2571 MHz 5: 2573 MHz 6: 2609 MHz
          7: 2640 MHz 8: 2521 MHz
Graphics:  Card-1: Intel 3rd Gen Core processor Graphics Controller
          Card-2: NVIDIA GK107M [GeForce GT 650M Mac Edition]
          Display Server: x11 (X.Org 1.20.4 ) drivers: i915,nouveau
          Resolution: 1440x900@59.90hz, 1440x900@59.90hz
          OpenGL: renderer: NVE7 version: 4.3 Mesa 18.2.2
Partition: ID-1: / size: 458G used: 11G (3%) fs: ext4 dev: /dev/sda4
```

When I first rebooted my Mac, I was confused because Ubuntu was directly
launched and I cannot select the MacOS partition. After a couple of minutes I
figured out that all I had to do now is to hold `alt` [to access the Startup
Manager](https://support.apple.com/en-ca/HT201255) (as I did above to access the
installers) and select the right partition! I actually like it this way, it's
kind of a hidden partition!
