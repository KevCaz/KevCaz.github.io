---
title: "Cannot boot after upgrade on Debian Testing `[SOLVED]`"
date: 2018-12-17
tags: [Linux, Debian Testing, boot, BIOS, UEFI, GRUB2]
---

Yesterday, I upgraded some packages on my Debian machine as I regularly do (cannot remember the exact list) but when I rebooted the system, I was not able to access the file system anymore :scream:.

It was the first time I had no clue about what I did wrong and also the first time I had no idea of what to do. Basically, every time I started my computer, I ended up on a page I had never seen before where I had only two options:

1. select the device to boot on;
2. test the hardware.

I tested the hardware, everything was normal so I came to the conclusion that the problem was with option 1: I was not able to access the file system that I knew was on my Samsung hard drive but it was not possible to access it. From this and dozens of queries on Google I figured out that something was wrong with [GNU GRUB](https://en.wikipedia.org/wiki/GNU_GRUB).


GNU GRUB stands for "GNU Rand Unified Bootloader", as explained in the [GNU GRUB manual](https://www.gnu.org/software/grub/manual/grub/grub.html#Overview) it is

> [...] a boot loader is the first software program that runs when a computer starts. It is responsible for loading and transferring control to an operating system kernel software (such as Linux or GNU Mach). The kernel, in turn, initializes the rest of the operating system (e.g. a GNU system).

According to the same manual:

> GNU GRUB is a very powerful boot loader, which can load a wide variety of free operating systems, as well as proprietary operating systems with chain-loading.

A computer's hardware is controlled by [firmware](https://en.wikipedia.org/wiki/Firmware) that are initialized by a  the [BIOS](https://en.wikipedia.org/wiki/BIOS) which is replaced by the [UEFI](https://en.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface)
in recent computers. As explained in this article on [Make Tech Easier](https://www.maketecheasier.com/differences-between-uefi-and-bios/):

> BIOS and UEFI are two firmware interfaces for computers which work as an interpreter between the operating system and the computer firmware. Both of these interfaces are used at the startup of the computer to initialize the hardware components and start the operating system which is stored on the hard drive.

> BIOS works by reading the first sector of the hard drive which has the next device’s address to initialize or code to execute. BIOS also selects the boot device that needs to be initialized for starting the operating system. Since BIOS has been in use since the very beginning, it still works in 16-bit mode, limiting the amount of code that can be read and executed from the firmware ROM.

> UEFI does the same task a little differently. It stores all the information about initialization and startup in an .efi file instead of the firmware. This file is stored on the hard drive inside a special partition called EFI System Partition (ESP). The ESP partition will also contain the boot loader programs for the Operating System installed on the computer.

Basically the BIOS or the UEFI initializes the necessary system hardware for booting and then the boot loader (so GNU GRUB here) is launched
([see this article of the archlinuxwiki for more details](https://wiki.archlinux.org/index.php/Arch_boot_process#Under_UEFI)). There was nothing wrong with the UEFI, I deduced from this that there was something wrong with GNU GRUB.

I did not know how to process but I read that [the Debian Installer can be used to rescue systems](https://wiki.debian.org/DebianInstaller/Rescue). I therefore downloaded [the latest DVD image of Debian Testing](https://cdimage.debian.org/cdimage/weekly-builds/amd64/iso-dvd/) and [created a bootable USB stick with it](https://cdimage.debian.org/cdimage/weekly-builds/amd64/iso-dvd/). I plugged it to my computer and try different approaches. First I tried to use the rescue mode (in the advanced on the 'live install' image) by clicking on rescue mode in the `Advanced options` section:

{{< imgcenter "https://i.stack.imgur.com/UzxgF.png" >}}

<br>

I was a bit lost and did not succeed at the first attempt. Then I found [this tutorial on linux.com](
https://www.linux.com/learn/how-rescue-non-booting-grub-2-linux%20%20)
and tried it (starting by typing <kbd>C</kbd> when the screen above popped up).
Again, I was a bit confused because I always ended up in [BusyBox](https://en.wikipedia.org/wiki/BusyBox) and everything I tried was unsuccessful. I finally solved the issue by reinstalling GNU GRUB following the steps of this [great tutorial on  TecMint](https://www.tecmint.com/rescue-repair-and-reinstall-grub-boot-loader-in-ubuntu/) (it is for Ubuntu but Ubuntu is based on Debian). After the re-installation everything went back to normal :smile:.


Once again I learned a lot by solving this issue but this time it was not a good timing for me at all... Anyway, now I will keep an live install ready to rescue my system. Also I now understand why there are three partitions on my Samsung hard drive: one for the file system, one for the SWAP and one for the UEFI!
