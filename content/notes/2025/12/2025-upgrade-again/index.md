---
title: "SSD Upgrade & Ubuntu 25.10 Setup"
date: 2025-12-23
tags: [hardware, Ubuntu, installation]
---


## Swapping my SSD

I have a Dell Precision 5530, which I really like, except for its storage capacity. I had been hesitating to take it to a service center for an SSD upgrade until a friend told me it was actually very easy because the SSD is easily accessible. So I bought a 2 TB SSD and did the upgrade myself, following this video: https://www.youtube.com/watch?v=nGS9QDnsxP0. It really was easy and took less than 10 minutes, even for someone inexperienced like me.

## Main setup

After the upgrade, I installed [Ubuntu 25.10](https://releases.ubuntu.com/questing/) and set up the machine. Over the years, I’ve installed macOS, then Debian, and now Ubuntu, and I used to maintain long setup scripts. I no longer do that, mainly because there are only a few steps I really need to take, and once my files and dotfiles are in place, about 90% of the work is done.
If I ever need a fully reproducible installation process, I use a tool like [Ansible](https://docs.ansible.com/). Otherwise, I’ve become very comfortable with Ubuntu installations, so for the remaining 10%, I just install things as needed.

Below are the tools I frequently use

```sh
sudo apt-get install \
    duf fonts-firacode gh htop hugo hunspell hunspell-fr hunspell-en inxi \
    imagemagick npm pass python3-venv nextcloud-desktop pandoc taskwarrior xournal zsh 
```

There are several applications that I install via `apt`.

```sh
apt-get install gimp xournal inkscape vlc calibre okular libreoffice nextcloud-dektop 
```

Others are installed via `snap`.

```sh
snap install dbeaver-ce brave discord picard slack thunderbird zotero
```


## Advanced setup

There are a few tools that require a bit more setup:

* **r2u**: [https://github.com/eddelbuettel/r2u](https://github.com/eddelbuettel/r2u)
* **Docker**: [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)
* **VS Code**: [https://code.visualstudio.com/docs/setup/linux](https://code.visualstudio.com/docs/setup/linux)
* **Positron**: [https://positron.posit.co/download.html](https://positron.posit.co/download.html)
* **Quarto**: [https://quarto.org/docs/download/](https://quarto.org/docs/download/)

Once everything is installed, the last steps are:

* Set up Nextcloud
* Copy/paste my dotfiles
* Create a virtual environment at the root of my home directory:
  `python3 -m venv .venv`
* Install my R, Python, and Node packages

Two notes:

* A very effective shortcut for installing R and many packages I commonly use is to install **sf** via apt: `sudo apt-get install r-cran-sf`. This one-liner pulls in R itself plus a large dependency stack.

* Since I use two different computers, symbolic links (`ln`) combined with cloud-synced files are extremely useful. The real file/directory is sync on Nextcloud and I point to this sync file from the location where it is required. Simple and very effective.
