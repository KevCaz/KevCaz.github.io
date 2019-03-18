---
title: "Cannot boot again [SOLVED]"
date: 2019-03-18
tags: [Linux, Debian Testing, boot, BIOS, UEFI, GRUB2]
---

Within the last two weeks, I ran into serious issues with my Debian machine. Two weeks ago, just as I described in a [previous post](/notes/linux/cannotboot), after some updates, I was not able to boot anymore. Given that everything was working very well before, I was convinced that this was an issue with [GRUB2](http://www.gnu.org/software/grub/), but was not able to fix it despite a very demanding quest for a solution. I was so desperate that I decided to reinstall Debian (which turned out to be a good thing as it fixed [minor issues I had with my hardware](/notes/hardware/backlightgone/).

After the re-installation (2 weeks ago) on my system, I worked without rebooting the system untill today as I decided to try to reboot. But sadly, I ran into the same issue... After a couple of minutes of intense disappointment, I rolled up my sleeves and looked for a solution once again. First thing first, I had to get a [bootable stick with the Debian installer for my Levono ThinkPad](https://cdimage.debian.org/cdimage/weekly-builds/amd64/iso-dvd/). If you don't know how to proceed, there are several tutorials online that explain how to do so:

- on Linux:
  - [Debian facile](http://debian-facile.org/doc:install:usb-boot) :fr:
  - [askUbutu](https://askubuntu.com/questions/372607/how-to-create-a-bootable-ubuntu-usb-flash-drive-from-terminal)
- on MacOSX:
  - [OSXDaily](http://osxdaily.com/2015/06/05/copy-iso-to-usb-drive-mac-os-x-command/)
  - [Ubuntu](https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-macos#0).


On the MacOSX machine I had access, I used the following command line:

```
# dd bs=4m if=Downloads/debian-testing-amd64-DVD-1.iso of=/dev/disk1 && sync
```

With Debian installer on my USB stick, I was able to use a GRUB2 terminal and found this post on [HowtoForge](https://www.howtoforge.com/tutorial/repair-linux-boot-with-grub-rescue/) to better understand what I was doing. Basically, I needed to set the path to properly boot, after checking where was my file system (using the GRUB's `ls` command I found that it was `(hd0,gpt2)` in my case), I followed [these guidelines](https://wiki.debian-fr.xyz/R%C3%A9installer_Grub2) :fr: and typed:

```
grub> prefix=(hd0,gpt2)/boot/grub
grub> set root=(hd0,gpt2)
grub> insmod linux
grub> insmod boot
grub> insmod normal
grub> normal
```

Afterwards, I was then able to access my Debian partition on the boot menu (and new entry was added to the menu displayed by the installer). Now, with this USB stick I am now able to boot even if the GRUB on my hard drive is not working properly.

The last step was to reinstall GRUB on my hard drive (the steps about is just a work around to boot with a broken GRUB). After several unsuccessful attempts, I ended up checking out the [GRUB manual](http://www.gnu.org/software/grub/manual/grub/grub.html) and it turned out that all I had to do was to reinstall GRUB with a simple command line. First, I needed to locate the partition where the EFI system was installed:

```
# fdisk -l
[...]
Device              Start        End    Sectors   Size Type
/dev/nvme0n1p1       2048    1050623    1048576   512M EFI System
/dev/nvme0n1p2    1050624 1967138815 1966088192 937.5G Linux filesystem
/dev/nvme0n1p3 1967138816 2000408575   33269760  15.9G Linux swap
[...]
```

and then I used `grub-install`:

```
# grub-install /dev/nvme0n1p1
```

#### And now **my computer boots properly** :fireworks: :trophy:!

After this experience, I came to realize that one of the major issue to fix this issue was the abundance of resources that lack accuracy. On such topics, a quick search on the Internet may not be enough as there are many tutorials/answers on different websites that solve similar issues but that do not provide enough information to let the reader realize that it is actually not the very same issue. On such topics (quite advanced for somebody like me), one shall recall this: "just read to the manual" :smile:.
