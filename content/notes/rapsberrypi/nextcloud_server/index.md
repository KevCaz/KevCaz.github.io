---
title: Next Cloud server on a Raspberry Pi 3B
date: 2022-01-05
tags: [raspberry pi, nextcloud] 
---

I have already written elsewhere all the good that I think about Raspberry Pi. It is a fantastic project supported by a great community. I personally own a [Rapsberry Pi model 3B](/notes/rapsberrypi/raspberrypi3b/) and so far I have been using it for several small projects. For more than a year I have been thinking about running some small services on my Raspberry Pi, but never took the time to set it up. I finally took Christmas time to do it and I started with [NextCloud](https://nextcloud.com/). This post summarizes the different installation steps I went through to get a NextCloud server running on my Raspberry Pi. Note that I do not intend to provide a walk-through for the installation, I rather explain what needs to be done, give some commands and point to online documentation and tutorials. There are plenty of good tutorials available on line, notably the ones by [Pi My Life Up](https://pimylifeup.com/), I don't think they need to be duplicated!



## Install Rapsberry Pi OS 

For this project, I decided to re-install my Raspberry from scratch. Before doing so, I checked the version of Raspbian installed on it using [inxi](https://smxi.org/docs/inxi.htm):

```sh
$ inxi -S
System:    Host: raspberrypi Kernel: 5.10.17-v7+ armv7l bits: 32 Console: tty 0 
           Distro: Raspbian GNU/Linux 10 (buster) 
```

Note that Raspbian is now referred to as [Raspberry Pi OS](https://www.raspberrypi.com/software/), but is still a Debian image suited/optimized for Raspberry Pi devices. As I was looking for a way to download the image and install it on my microSD card (FWIW, a 64&nbsp;Go one), I was very excited to learn that since March 2020, there is a new image utility, [Raspberry Pi Imager](https://www.raspberrypi.com/news/raspberry-pi-imager-imaging-utility/), that makes the installation of Raspberry Pi seamless, so I used it! First, I downloaded the `.deb` file directly from the website and I installed it on my Debian machine as follows  

```sh
$ dpkg -i imager_1.6.2_amd64.deb 
```

Then I opened and used Raspberry Pi Image which is very intuitive interface. That step actually took less time than I anticipated!

{{< figcenter "img/imager.png" 80 >}}


 






## Basic settings

Once the microSD card ready, I inserted it in my Raspberry Pi and started the device. For this step, I use it as a personal computer, meaning that I used a keyboard, a mouse and a screen. That way I was able to [enable SSH](https://phoenixnap.com/kb/enable-ssh-raspberry-pi) (this is the only step that is actually *not* needed for what follows, if you are only interested in Nextcloud you can skip the rest of this section) and to check out the graphical interface, which is pretty nice! I decided to have a look at the recommended software and I was happy to see that [we can now install Visual Studio on a Raspberry Pi](https://www.raspberrypi.com/news/visual-studio-code-comes-to-raspberry-pi/)! I install it along with LibreOffice and Mathematica, I just thought that having some software installed wouldn't hurt in case somebody needs to do some work on it at some point. 


{{< figcenter "img/vscode.png" 100 "Visual Studio on my Raspberry Pi model 3B." >}}



At that point, I realized than several tools were already installed, e.g.

```sh
$ python --version
Python 3.9.2

$ git version
git version 2.30.2
```

I only needed to install a few others. Again, these are not needed for the NextCloud installation presented below, but those are tools I use frequently, namely [Docker](https://www.docker.com/), [duf](https://github.com/muesli/duf), [Hugo](https://gohugo.io/), [inxi](https://smxi.org/docs/inxi.htm), [Julia](https://julialang.org/) and [R](https://www.r-project.org/):

```sh
# 4 of these can be installed via apt-get 
$ apt-get install hugo inxi julia r-cran-bit64
[...]

# there is a bash script available online for docker 
$ curl -fsSL https://get.docker.com -o get-docker.sh
sh docker.sh

# duf is released on GitHub 
$ wget -O duf.deb https://github.com/muesli/duf/releases/download/v0.6.2/duf_0.6.2_linux_armv7.deb 
$ dpkg -i duf.deb 
$ rm duf.deb

# below are the versions installed
$ julia --version
julia version 1.5.3

$ hugo version
Hugo Static Site Generator v0.80.0/extended linux/arm BuildDate: 2021-02-09T18:47:48Z (raspbian 0.80.0-6)

$ R --version
R version 4.0.4 (2021-02-15) -- "Lost Library Book"
[...]

$ docker --version
Docker version 20.10.12, build e91ed57

$ duf --version
duf 0.6.2 (d1d2865)

# new version of the OS 
$ inxi -S
System:    Host: raspberrypi Kernel: 5.10.63-v7+ armv7l bits: 32 Console: tty 0 
           Distro: Raspbian GNU/Linux11 (bullseye) 
```

Note that in order to identify the right version of `duf` I needed, I checked out my CPU model with `inxi`:

```sh
inxi -C
CPU:       Info: Quad Core model: ARMv7 v7l variant: cortex-a53 bits: 32 type: MCP 
          Speed: 1200 MHz min/max: 600/1200 MHz Core speeds (MHz): 1: 1200 2: 1200 3: 1200 4: 1200 
```

This is how I knew that I needed to use the `ARMv7` image of `duf`. 





## Connect to my Raspberry Pi via SSH 

After the installation described above, I shut my Raspberry Pi down, and moved it next to my box, no keyboard, no mouse and no screen. And then I went back on my Debian machine. At this point I needed to locate my Raspberry Pi on my local network. Fortunately there are network tools to do so seamlessly, [`arp-scan`](https://linux.die.net/man/1/arp-scan) is one of then that I was able to install using `apt-get`

```shell
$ apt-get install arp-scan
```

Then all I had to do was running the following command (I had to run it as super user)

```shell
$ arp-scan --localnet 
```

In the output I found something like this  

```sh
192.168.1.25	b8:27:eb:f6:48:76	Raspberry Pi Foundation
```

actually there were two lines like this because the wi-fi was up (and I [disabled it] by editing [disable the wi-fi](https://raspberrytips.com/disable-wifi-raspberry-pi/) by editing `/boot/config`). So there I knew that I could connect to my Rapsberry Pi with the following commad. 

```sh 
ssh pi@192.168.1.25
```

Note that instead of looking for the right IP address, it is possible to use [multicast DSN (mDSN)](https://en.wikipedia.org/wiki/Multicast_DNS), on recent Raspberry Pi OS images, [avahi](https://github.com/lathiat/avahi) is probably installed (see `systemctl status avahi-daemon.service`), otherwise [it can be installed](https://medium.com/@pierre.loret.dev/install-avahi-on-your-pi-4cd63682ce37). Assuming `avahi-daemon.service` is up and running, then you can directly do

```sh 
ssh pi@raspberrypi.local
```

The last thing I've done is that I added one of my public ssh keys to my Raspberry Pi to avoid typing my password in every time I connect to i. This is [well-explained in a post by Py My Life Up](https://pimylifeup.com/raspberry-pi-ssh-keys/):

1. generate a ssh pair of keys with `ssh-keygen`, 
2. copy a public key to your Raspberry Pi using `ssh-copy-id`.




## Using a static IP

This is super easy to do, **but** I honestly think that before doing that there are several terms you should know. I spent a fair amount of time reading about these, playing a bit with my home rooter (e.g. I change the range of dynamic IP), and it is worth it. At least I now have a better idea of what I am doing and why I needed to get a static IP. Fortunately there are a lot of good resources available on line (on Wikipedia for instance). Below is a list of term that are worth getting acquainted with.

- IP address (also [the difference between IPv4 and IPv6](https://www.guru99.com/difference-ipv4-vs-ipv6.html
));
- Static versus dynamic IP;
- [DHCP](https://fr.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol);
- [NAT](https://en.wikipedia.org/wiki/Network_address_translation);
- [LAN](https://en.wikipedia.org/wiki/Local_area_network) ;
- [Gateway](https://en.wikipedia.org/wiki/Network_address_translation);
- [Subnetwork](https://en.wikipedia.org/wiki/Subnetwork);
- Subnet masks;
- [Port](https://en.wikipedia.org/wiki/Port_(computer_networking));
- [DSN](https://aws.amazon.com/route53/what-is-dns/)

I'd like to mentioned specific page on [routersecurity.org](https://routersecurity.org/ipaddresses.php) that helped me a lot. Now, assuming that you have a basic understanding of the terms above and that you know the range of dynamic IP used by you DHCP, you can set a static IP chosen accordingly, it only requires to check `/etc/resolv.conf` and edit `/etc/dhcpcd.conf`, as explained on [Pi My Life Up](https://pimylifeup.com/raspberry-pi-static-ip-address/).




## Setting NextCloud 

I don't actually need to write anything about this because the tutorial on Py My Life Up, ["How to Setup a Raspberry Pi Nextcloud Server"](https://pimylifeup.com/raspberry-pi-nextcloud-server/), proposed an excellent tutorial that I basically followed. So if you want to set up your NextCloud server on your Raspberry Pi, just read this tutorial! 

Well, ... I can actually add a bit to the tutorial, because in my case I add a domain name, so I did not follow the last sections! Below are the section of the tutorial that I've followed 

1. Installing Apache and PHP
2. Setting up a MySQL Database and User for Nextcloud (I had to install [Mariadb](https://mariadb.org/) first)
3. Downloading Nextcloud on your Raspberry Pi
4. Configuring Apache for Nextcloud
5. Nextcloud Initial Setup 
6. Moving Nextcloud’s data folder
7. Increasing Nextcloud’s max upload size

Once those were done, I went on my DSN provider, I created an [A record](https://support.dnsimple.com/articles/a-record/) to point to my public IP. Note that you can check your public IP by using websites that return your public IP, for instance https://wtfismyip.com/ and you can also access this info using commands, e.g. 

```sh
# see https://askubuntu.com/questions/95910/command-for-determining-my-public-ip
wget -qO- https://ipecho.net/plain ; echo  
```

Then I opened ports 80 and 43, 

```sh
$ sudo ufw allow 80,443/tcp
```

and then I set up the [port forwarding](https://en.wikipedia.org/wiki/Port_forwarding) on my rooter to my Rapsberry Pi. Last, I used [Let's Encrypt](https://letsencrypt.org/) via `certbot` in the `python3-certbot-apache` (see this other [post by Py My Life Up](https://pimylifeup.com/raspberry-pi-ssl-lets-encrypt/))


```sh
$ sudo certbot --apache
```

I answered the questions and then I got a congratulation message, which basically means that now I could be using HTTPS for the NextCloud web interface of my serve. 

Then I did some configuration work: I [created several users](https://docs.nextcloud.com/server/latest/admin_manual/configuration_user/user_configuration.html) and add a security app, [Two-Factor TOTP Provider](https://apps.nextcloud.com/?search=TOTP) as suggested in [this youtube video](https://www.youtube.com/watch?v=OZ3zvyhJ8io&t=585s) (in French) which was also super useful for dealing with the installation. 

Two remarks to conclude this section and this post. First, if you don't want to go through all these steps and are just interested in having NextCloud up and running ASAP, you can use a preinstalled SD card images proposed by [NextCloudPi](https://ownyourbits.com/nextcloudpi/#download). Second, all the steps described above led me to install the following packages:

```sh
$ sudo apt install apache2 php8.0 php8.0-gd php8.0-sqlite3 php8.0-curl \
  php8.0-zip php8.0-xml php8.0-mbstring php8.0-mysql php8.0-bz2 php8.0-intl \
  php-smbclient php8.0-imap php8.0-gmp libapache2-mod-php8.0 mariadb-server \
  python3-certbot-apache
```




