---
title: "Cannot boot again [SOLVED]"
date: 2019-03-19
tags: [Linux, Debian Testing, boot, BIOS, UEFI, GRUB2]
---

Within the last two weeks, I ran into serious issues with my Debian machine. Just as I described
in a previous post, after some update, I was not able to which sounds like something
[Grub2]() even though I am not sure. First of these two I was so desperate and not sure what I did that I decided to reinstall Debian. Which was not a bad idea after all ads I had minor [issues with
my hardware](/notes/hardware/backlightgone/)


Using the tutprialas I did not get ascces tp the resu actions.

but now I understand than grub set where is the kernel and so need to iunsertcan
so few links:




2 links to create bootable usb sticks:

- on Linux:
  - [Debian facile](http://debian-facile.org/doc:install:usb-boot) :fr:
  - [askUbutu](https://askubuntu.com/questions/372607/how-to-create-a-bootable-ubuntu-usb-flash-drive-from-terminal)
- on MacOS:
  - [OSXDaily](http://osxdaily.com/2015/06/05/copy-iso-to-usb-drive-mac-os-x-command/)
  - [Ubuntu](https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-macos#0)

Below is the command I use (I downlod the image here) and d

```
sudo dd bs=4m if=Downloads/debian-testing-amd64-DVD-1.iso of=/dev/disk1 && sync
```

- https://wiki.debian-fr.xyz/R%C3%A9installer_Grub2 :fr:
-

Basically mention ti grub where is the kerel

ls (hd0,gpt2) detect all the file system expected.
ls (hd0,gpt2) tab should show.

The real issue is that finding reliable information is
about Grub2 and how to deal with it properly is hard. Very often people
describe what work for them, but it does not mean this will work for other...
which is quite misleading.

So I have my USB stick ready now and no how to reboot using it in case of emergency
which should lower my level of stress in such circunstances.
