---
title: "From Lunar Lobster to Mantic Minotaur"
date: 2023-11-05
tags: [Ubuntu, release, installation]
---

I have recently decided to upgrade to the most recent Ubuntu release on my Dell Precision machine, in other words, I wanted to get closer to [Ubuntu's release cycle](https://ubuntu.com/about/release-cycle). Previously, I would reinstall the latest long time release (LTS) every time a new update pops up (see [the documentation](https://ubuntu.com/server/docs/upgrade-introduction)). 
About 3 months ago, I switched to Ubuntu 23.04 (Lunar Lobster) and yesterday I upgraded to the October's release, [Mantic Minotaur (23.10)](https://ubuntu.com/blog/ubuntu-desktop-23-10-mantic-minotaur-deep-dive). 
The two upgrades were seamless, I just had to change a setting in the update-manager (see [this](https://help.ubuntu.com/community/LunarUpgrades)) and confirm the upgrade when I got notified. Once the installation completed, I had to edit a couple of source files for which only the latest LTS is available (22.04, a.k.a Jammy Jellyfish). 
Here is my current configuration in a nutshell:

```sh
$ inxi -S
System:
  Host: ubudel Kernel: 6.5.0-10-generic arch: x86_64 bits: 64 Desktop: GNOME
    v: 45.0 Distro: Ubuntu 23.10 (Mantic Minotaur)
```


{{< figcenter "./assets/update.png" 50 "Screenshot of the upgrade process from Lunar Lobster to Mantic Minotaur.">}}

