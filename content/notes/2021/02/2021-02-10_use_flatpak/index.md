---
title: "Use flatpak!"
date: 2021-02-10
tags: [Linux, setup, desktop applications, flatpak]
---


Two days ago, I was attempting to install [GNOME Fractal](https://wiki.gnome.org/Apps/Fractal) but `apt-get` couldn't find it... Cause it's a GNOME application I thought is was unexpected, so I checked the [README file](https://gitlab.gnome.org/GNOME/fractal). It turned out that the developers actually suggest to install their app with either [Snap](https://snapcraft.io/) or [Flatpak](https://flatpak.org/). As I knew about the former and hadn't heard about the later, I decided to install flatpak.

```.sh
$ apt install flatpak 
```

I then used flatpak to install Fractal. I must stress that the installation was seamless and that the information displayed during it was clear and helpful.

{{< figcenter "./assets/flatpakfirst.png" 80 "Screenshot of my first installation with flatpak.">}}


Neat, right!? But what is flatpak exactly? Another package manager meant to replace `apt-get`? Not really, flatpak was created to [ease desktop application delivery in Linux](https://www.zdnet.com/article/the-future-of-linux-desktop-application-delivery-is-flatpak-and-snap/) (only in Linux). It uses container technology to deliver applications inside a desktop session (see the [FAQ](https://flatpak.org/faq) for more details). This removes major limitations that have been around for some time in the Linux world. Indeed, with such technology, application developers don't need to worry about how their applications will be distributed across Linux distributions, at least for [28 distributions](https://flatpak.org/setup). All they need to do is to [create a manifest and use `flatpak-builder`](https://docs.flatpak.org/en/latest/first-build.html) and their application is ready to go on 28 distributions! 

This is a significant step towards making application updates easy in Linux[^note2]. Mainly because there is no longer a need of one maintainer per distribution per package (desktop application packages are big packages and I guess they are hard to maintain). The easiness of building and shipping application with this kind of technology ultimately allows users to quickly have access to the newest release of the application and package maintainers get a reduced workload, so they can spend more time on other projects. 

I wouldn't say flatpak is new, because the [project origins go back in 2007](https://github.com/flatpak/flatpak/wiki/Flatpak's-History), but it has certainly matured since that time and it has reached a high maturity level with the release of its application store, 
[flathub](https://flathub.org) in July 2017. With Flathub it is now super easy to cherry pick and install the set of desktop applications you need is with a few clear and concise command lines (e.g. [VLC](https://flathub.org/apps/details/org.videolan.VLC), [QGIS](https://flathub.org/apps/details/org.qgis.qgis), etc.). All you need to do is to add Flathub as a repository 


```.sh
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

and then use the installation command line provided on the web page of the application.For instance, for [Fractal](https://wiki.gnome.org/Apps/Fractal), the installation becomes: 

```.sh
flatpak install -y flathub org.gnome.Fractal
```

Tchao extra external personal package archives (PPA) for Slack & Microsoft teams & co! Now on I'll use Flatpak and I've already edited my 
[installDebian.sh gist](https://gist.github.com/KevCaz/29536740b9150383a9d543ec1be96103#file-installdebian-sh-L62-L73) accordingly.


```.sh
flatpak apt install gnome-software-plugin-flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak install -y flathub \
  org.videolan.VLC com.slack.Slack us.zoom.Zoom com.dropbox.Client \
  com.github.IsmaelMartinez.teams_for_linux com.discordapp.Discord \
  com.simplenote.Simplenote org.qgis.qgis org.gnome.Fractal
```

Note that because it is a simple command to run the application, one can created aliases easily, which mean I can use the same command line to launch one application: 

```.sh
alias vlc='flatpak run org.videolan.VLC'
```

Obviously, just as other package managers do, Flatpak makes it easy to update packages ...



```.sh
$ flatpak update 
Looking for updates…


       ID                        Branch Op Remote  Download
1. [✓] org.gnome.Platform.Locale 3.38   u  flathub 17.5 kB / 326.1 MB
2. [✓] org.gnome.Platform        3.38   u  flathub 22.1 MB / 344.0 MB

Updates complete.
```

... and remove them.


```.sh
$ flatpak remove com.github.IsmaelMartinez.teams_for_linux   [12:07:29]


       ID                                             Branch     Op
1. [-] com.github.IsmaelMartinez.teams_for_linux      stable     r

Uninstall complete.
```


:clap: :clap: :clap: I'm glad I've spent some time understanding Flatpak and using it. It is already part of my setup now and I am confident that I'll be using it for months. I might dig deeper in future posts to understand what could possibly be the downside of using Flatpak (e.g. I wonder whether there are some performance costs) and also to understand what are the differences between Snap, Flatpak and [AppImage](https://appimage.org/)[^note3]. I'll certainly report my findings here!



[^note2]: a major limitations of most Linux distributions [according to Linus Torvald](https://www.youtube.com/watch?v=5PmHRSeA2c8).

[^note3]: there is at least one discussion about this on [Ask Ubuntu](https://askubuntu.com/questions/866511/what-are-the-differences-between-snaps-appimage-flatpak-and-others).
