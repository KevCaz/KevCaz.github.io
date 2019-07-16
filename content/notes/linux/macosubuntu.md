---
title: "Dual Boot MacOS/Ubuntu"
date: 2019-07-16
tags: [Linux, kernel, Ubuntu, Debian]
---


## Context

I must say that I have been quite unhappy with my old Mac Book Pro (mid 2012)
for almost a year now. IIRCs I got it early 2013 and it served me well during my
PhD but now it is kind of slow :turtle: and often behaves weirdly on boot. This
weekend, I got a nasty black screen on boot :scream:. Turns out it happens
frequently and there [are no less than four different solutions to this issue
:scream:](http://osxdaily.com/2014/11/22/fix-macbook-pro-booting-black-screen/)
(in my case, emptying the PRAM did the job)... Windows, MacOS, blue screen,
black screen, yunno... I found having these issues actually rather worrisome
because I care about my computer, I update it frequently and I'm actually
capable of solving this kind of issues, so why these happen? Also, I truly
wonder what other people that have no idea to deal with this kind of problem
would do them would do... My guess is they would go to an fancy Apple store to
either get it fixed :moneybag: or get a new shinny Mac
:moneybag::moneybag::moneybag:.

As the time went on, I started to feel frustrated and as I was not a big fan of MacOS Mojave (it really brings nothing I need and I haven't see any [improvement in term of performance](https://www.apple.com/ca/fr/macos/mojave/), just the opposite). Given this I decided 2 things:

1. get rid of Mojave and do a clean install of High Sierra on one partition;
2. create a second partition with Ubuntu.



## Clean install MacOS High Sierra


This is a two steps procedure detailed in several posts (e.g. [here](https://setapp.com/how-to/how-to-clean-install-macos-high-sierra) and [there](https://9to5mac.com/2018/06/18/how-to-create-a-bootable-macos-mojave-10-14-usb-install-drive-video/)):

1. create a bootable installer (the easiest way is to use a USB stick) which requires to [download the installer for High Sierra and use the 'createinstallmedia' command in Terminal](https://support.apple.com/en-us/HT201372);

2. use the bootable installer, i.e. rebooting the Mac while holding `alt` and then boot on the installer which guides you through all the steps.

Note that in my case as I wanted to create a second partition with Ubuntu I had to use [Disk Utilities](https://support.apple.com/en-ca/guide/disk-utility/welcome/mac) to create the partition (NB you need to select `Show All Devices` in the `View` menu to create the partition at the right level)

Once this done I installed [Homebrew](https://brew.sh/), i.e. I opened the terminal and entered:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Then I a couple of packages for the time being:

```
$ brew install git imagemagick ffmpeg docker hugo R postgresql hugo
$ brew cask install atom firefox google-chrome iterm julia libreoffice vlc sage
```

I couldn't resist to install [SteamOS](https://store.steampowered.com/steamos)
and [OpenEmu](https://openemu.org/) :laughing: even though I'm not spending much
time on them (`brew cask install steam openemu`). After this te first step was
done :white_check_mark:.




## Dual boot MacOS/Ubuntu

There are several blogposts/tutorials covering this online, see for instance [the post on Lifewire](https://www.lifewire.com/dual-boot-linux-and-mac-os-4125733). In a nutshell, the installation requires to:

1. create a bootable installer with Ubuntu, I used the latest release: [Ubuntu  18.04 - *Bionic Beaver*](http://releases.ubuntu.com/18.04/);

2. use the bootable installer;


I actually tried to create a the bootable installer on my Debian computer and guess what? MacOS was not capable of recognizing the installer (did not try to solve this issue that just irritates me)...
So I did it on MacOS, i.e. once the [Ubuntu desktop image downloaded]((http://releases.ubuntu.com/18.04/)), I used `dd` to create the installer on my USD stick. Note that I got the right location, `disk1`, using `diskutil list` in a termimal, I would have used `lsblk` on Debian). So here is what I did



```
$ sudo umount /dev/<disk#>
$ dd if=./ubuntu-18.04.2-desktop-amd64.iso of=<disk#> bs=4m && sync
```

where `<disk#>` was `disk1` in my case. For the records, I would have used the following on Debian:


```
$ sudo umount /dev/<disk#>
$ sudo dd bs=4M if=./ubuntu-18.04.2-desktop-amd64.iso of=/dev/<disk#> conv=fdatasync
```

where `<disk#>` would have been `sda1` (again, in my case). Once the Ubuntu
installer created I rebooted and held `alt` to launch the Ubuntu installer. the
tricky part was to find the right partition. For me it was `sda4` which I add to
remove (using `-`) to make it free space before using it to create the partition
where to install Ubuntu. Once done, I installed a couple of process.

```
# apt-get update && apt-get upgrade
# apt-get install inkscape libreoffice gimp imagemagick ffmpeg vlc steam
# apt-get r-base r-base-core r-recommeneded r-cran-*
```

When I first rebooted I was confused because it now boots on Ubuntu and I don't have any choice. After a couple of minutes I figured out that all I have to do os to hold `alt` on boot to access to the MacOS partition. I actually like it this way, it's kind of a hidden partition!
