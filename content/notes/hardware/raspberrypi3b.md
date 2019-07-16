---
title: My Raspberry Pi 3B
date: 2019-07-12
tags: [hardware, installation, setup, Raspberry Pi, Linux, Debian, Raspbian]
---

Two years ago now, I bought myself a [Raspberry Pi
3B](https://en.wikipedia.org/wiki/Raspberry_Pi) (back in 2015, I bought a model
2B and since June of this year, [model 4B is
out](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) but has [some
issues](https://www.theverge.com/2019/7/10/20688655/raspberry-pi-4-usb-c-port-bug-e-marked-cables-audio-accessory-charging)).
Even if don't use it as much as I would like to, this small computer never
ceases to amaze me! The concept is awesome, the education goals are meaningful
and timely and the community is great, just check out the official website
https://www.raspberrypi.org/.

Back in 2017, I opted for [Raspbian](https://www.raspberrypi.org/downloads/),
which I enjoy, and I installed a bunch of software (I don't remember the full
set, but it is a subset of the ones I installed on my Lenovo, [see this gist
:link:](https://gist.github.com/KevCaz/29536740b9150383a9d543ec1be96103)) including [inxi](https://smxi.org/docs/inxi.htm) that I use to give more detail about the hardware below:

```
$ inxi -F
System:    Host: kevcaz Kernel: 4.9.35-v7+ armv7l (32 bit)
           Console: tty 1 Distro: Raspbian GNU/Linux 9 (stretch)
Machine:   No /sys/class/dmi; using dmidecode: you must be root to run dmidecode
CPU:       Quad core ARMv7 rev 4 (v7l) (-MCP-) (ARM)
           clock speeds: max: 1200 MHz 1: 1200 MHz 2: 1200 MHz
           3: 1200 MHz 4: 1200 MHz
Graphics:  Card: Failed to Detect Video Card!
           Display Server: N/A drivers: fbdev (unloaded: modesetting)
           tty size: 75x54 Advanced Data: N/A out of X
Audio:     Card bcm2835 ALSA driver: bcm2835 Sound: ALSA v: k4.9.35-v7+
Network:   Card: Standard Microsystems SMSC9512/9514 Fast Ethernet Adapter
           IF: N/A state: N/A speed: N/A duplex: N/A mac: N/A
Drives:    HDD Total Size: NA (-)
           ID-1: /dev/mmcblk0 model: N/A size: 63.9GB
Partition: ID-1: / size: 59G used: 11G (20%) fs: ext4 dev: /dev/root
           ID-2: /boot size: 41M used: 21M (52%) fs: vfat dev: /dev/mmcblk0p1
Sensors:   None detected - is lm-sensors installed and configured?
Info:      Processes: 181 Uptime: 36 min Memory: 586.8/923.4MB
           Init: systemd runlevel: 5 Client: Shell (bash) inxi: 2.3.5
```

By the way, if you want to get the model of your Raspberry Pi, [check out this
:link:](
https://www.raspberrypi-spy.co.uk/2012/09/checking-your-raspberry-pi-board-version/),
here is mine:


```
$ cat /proc/device-tree/model
Raspberry Pi 3 Model B Rev 1.2p
```
<br>

Today, I needed to run a computation that may last days and as I hadn't use my Raspberry for months, I updated it. I switched from jessie to stretch (the new Debian old stable), i.e. I updated my `/etc/apt/sources.list` which now contains the following lines:

```
deb http://mirrordirector.raspbian.org/raspbian/ stretch main contrib non-$
# Uncomment line below then 'apt-get update' to enable 'apt-get source'
# deb-src http://archive.raspbian.org/raspbian/ stretch main contrib non-f$
# deb http://archive.raspbian.org/raspbian/ stretch main
```

and then I ran

```
# apt-get update && apt-get upgrade
```

Below are reported the version numbers of a selection of software after the upgrade:

```
$ git --version
git version 2.11.0
$ R --version
R version 3.3.3 (2017-03-06) -- "Another Canoe"
$ python --version
Python 2.7.13
$ python3 --version
Python 3.5.3
$ hugo version
Hugo Static Site Generator v0.43 linux/arm BuildDate: 2018-07-09T10:00:46Z
$ psql --version
psql (PostgreSQL) 9.6.13
```

The final step was [to access the command line of my Raspberry Pi remotely using a secure shell](https://www.raspberrypi.org/documentation/remote-access/ssh/), so I:

- note down the IP address with `hostname -I`;
- enable SSH using `sudo raspi-config`.

and I created an alias in my `.zprofile` on my Lenovo (`alias torasp='ssh pi@XXX.XXX.XXX.XXX'` where `pi@XXX.XXX.XXX.XXX` is given by `hostname -I`).

My Raspberry Pi is ready to compute and I have a easy way to access it :smiley:!
