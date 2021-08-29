---
title: From bullseye to bookworm
date: 2021-08-29
tags: [Linux, Debian, bookworm, release]
imageOG: bookworm.webp
descriptionOG: |
  This post explains how I switch from Debian 11 to Debian 12. 
---


Two weeks ago, [Bullseye](https://wiki.debian.org/DebianBullseye) became the new stable Debian release. As I prefer using Debian testing, today, I jumped on Debian 12 codenamed [**Bookworm**](https://wiki.debian.org/DebianBookworm). To do so, I simply updated my [source list](https://wiki.debian.org/SourcesList) by replacing instances of `bullseye` by `bookworm`, and then I used the combo 
`apt update`/ `apt upgrade`. 

```sh
$ apt-get update
[...] 
$ apt-get upgrade   
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Calculating upgrade... Done
The following packages were automatically installed and are no longer required:
  gir1.2-handy-0.0 gnome-getting-started-docs libgcrypt20-dev libgl1-mesa-glx libjuh-java libjurt-java
  liblibreoffice-java libridl-java libunoloader-java
Use 'sudo apt autoremove' to remove them.
The following packages have been kept back:
  cryptsetup cryptsetup-bin cryptsetup-initramfs gnome-software  [...]
  udisks2 vlc-plugin-video-output
The following packages will be upgraded:
  adwaita-icon-theme aisleriot alsa-topology-conf alsa-ucm-conf anacron [...]
797 upgraded, 0 newly installed, 0 to remove and 68 not upgraded.
Need to get 841 MB of archives.
After this operation, 43.4 MB of additional disk space will be used.
Do you want to continue? [Y/n] Y
```

It took a few minutes, then I dealt with the "kept back" packages with the following:

```sh
$ apt-get --with-new-pkgs upgrade 
```

That is it for updating Debian! 

```sh
$ lsb_release -a
No LSB modules are available.
Distributor ID:	Debian
Description:	Debian GNU/Linux bookworm/sid
Release:	testing
Codename:	bookworm
```

Note that I could easily use `testing` in the source list rather than the codename of the Debian release, but I actually like the codename better, it's not much of an effort and it forces me to keep an eye on what's going on! 

{{< figcenter "bookworm.webp" 50 "**Bookworm**. Debian releases are codenamed after Toy Story characters. Debian 12 has been codenamed Bookworm, a reference to a character that appears in Toy Story 3. This picture is available at the following https://pixar.fandom.com/wiki/Bookworm. " >}}


I did not stop there, I took two extra steps. First, I installed R 4.1.1, following the guidelines available at https://cran.r-project.org/bin/linux/debian/#debian-sid-unstable. Note that reinstall some of the package because of this (quoting from the webpage I've just mentioned): 


> Note that R 4.1.x has bumped the Graphics API, so graphics packages like svglite, tikzDevice, rgl, rvg, ggplot2 or vdiffr (embedding svglite) will need to be reinstalled. If you don’t you will get an error message


Just to be sure (not 100% if it was needed), I re-installed the following packages (and meta-packages):


```R
R> install.packages(c("sf", "stars", "mapview" "tidyverse", "fastverse")) 
```


Second (and last), I reinstall Docker following the walkthrough available at https://docs.docker.com/engine/install/debian/ and made sure the installation was correct using the following:

```sh
$ sudo docker run hello-world 
```

So all is working great! For the sake of completeness, below in my current source list `/etc/apt/sources.list` (I have a few others in `/etc/apt/sources.list.d` but they don't matter for this post!):

```sh
# Canada mirror 
deb http://ftp.ca.debian.org/debian/ bookworm main contrib non-free
deb-src http://ftp.ca.debian.org/debian/ bookworm main contrib non-free
deb http://deb.debian.org/debian bookworm-proposed-updates main contrib non-free

# security updates 
deb http://security.debian.org/ bookworm-security main contrib non-free
deb-src http://security.debian.org/ bookworm-security main contrib non-free

# R
deb http://cloud.r-project.org/bin/linux/debian bullseye-cran40/

# docker
deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian bullseye stable
```




