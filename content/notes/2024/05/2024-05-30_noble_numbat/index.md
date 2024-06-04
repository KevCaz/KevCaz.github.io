---
title: "From Mantic Minotaur to Noble Numbat"
date: 2024-06-04
tags: [Ubuntu, release, installation]
---

{{< figcenter "./assets/noble_numbat.png" 50 "Screenshot of my current desktop wallpaper, *Little numbat boy* by @azskalt, see [*The Coronation of a New Mascot: Noble Numbat*](https://ubuntu.com/blog/the-coronation-of-a-new-mascot-noble-numbat)." >}}

After a [freezing phase](https://lists.ubuntu.com/archives/ubuntu-devel-announce/2024-March/001343.htm) that started last March, Ubuntu 24.04 codenamed **Noble Numbat** was released last April. It comes with a great deal of new features, listed in the release [release notes](https://discourse.ubuntu.com/t/ubuntu-24-04-lts-noble-numbat-release-notes/39890). 

As a Mantic Minotaur user, the option to update to Noble Numbat was presented in May, in a window that popped up after a regular update. At first it did not work, so I hit `sudo do-release-upgrade` to better understand the problem. I quickly figured out that that the issue stems from a package that I set on hold. After unholding it, the updating process worked like a charm.

{{< figcenter "./assets/update.png" 95 "Screenshot of the pop-up window to trigger the update (leftpanel) and a screenshot while upgrading (right panel)." >}}

Throughout the process, several Personal Package Archive (PPA) repositories were deactivated (the source files files were appended with a `distUpgrade` suffix). After the release, I took this opportunity to go through those repositories, conduct necessary pruning, and updated the remaining PPA.

As I use R on a daily basis, my R setup is of most importance. Over the last year, I installed and reinstalled R packages in various (and inconsistent) ways. So I decided to remove them all and reinstall them properly using the amazing [r2u](https://eddelbuettel.github.io/r2u/) initiative by [Dirk Eddelbuettel](https://dirk.eddelbuettel.com/). Once installed, I install the following 3 packages to install numerous packages I frequently use: 

```R
apt install r-cran-tidyverse r-cran-devtools r-cran-mapview
```

That's all folks :smile:! 


<details>
<summary>Current configuration</summary>
```.sh
$ inxi -S
System:
  Host: ubudel Kernel: 6.8.0-35-generic arch: x86_64 bits: 64
  Desktop: GNOME v: 46.0 Distro: Ubuntu 24.04 LTS (Noble Numbat)
```
</details>