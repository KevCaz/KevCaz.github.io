---
title: DNS, IP and Router
date: 2021-06-30
tags: [router, setup, IP]
draft: true
---


I am thinking about setting my rapsberry Pi to host some services to set a local Nextcloud using my (basically creating a nextcloud box of my own). To do so, I minimally need to assign a static IP to my raspberry Pi. Just to be clear, so far, I intend to keep the nextcloud local but I would still need to do that, but it is possible to made it availbale. 

Below I have jotted a few notes about IP. By no means am I a professional and so that is my basic understanding after reading a bit on the topic. 

So first what are IP  addresses? There is 


[Classless Inter-Domain Routing (CIDR)](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) with the **submask** we have a subnet the **host identifier**. 

now there are  

4 octets

[0-255]

and Ipv6 

4 hextesseparter

A range of IP for instance if with a submask 255.255.255.0 255 IP

So one public IP. There are many looking add website and can be seen simply using `curl`, e.g. 

```sh
$ curl ifconfig.me
```

https://test-ipv6.com/

nternet Service Provider (ISP)

To

[]()

This is 


First of all it is important to understand that we there IP private and public. DNS]

The router is c

https://www.digitaltrends.com/computing/modem-vs-router/


[DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol)

Very cool

https://superuser.com/questions/261818/how-can-i-list-all-ips-in-the-connected-network-through-terminal-preferably

```shell
$ apt-get install arp-scan
```

```shell
$ arp-scan --localnet 
```

https://manpages.debian.org/unstable/arp-scan/arp-scan.1.en.html

dynamic assign by your box rooter) DHCP and so it may changes and it would very likely be different if you plug unpliug and have a new setup!

ssh pi@192.168.0.37 

Use an IPv4 and and a subnetwork https://en.wikipedia.org/wiki/Subnetwork

looks like a common practice is 

255.255.255.0

https://routersecurity.org/ipaddresses.php

which allows 254 different connected devcie id and is ofetn enough

which correspond de `/24` and whia is suggets

nano /etc/dhcpcd.conf


You need to use a static IP 

https://fr.wikipedia.org/wiki/Sous-r%C3%A9seau


https://community.spiceworks.com/topic/6996-how-do-find-the-ip-address-ranges-on-a-server

https://forum.fizz.ca/fr/discussion/2027698/acceder-configuration-routeur-fizz


https://forum.fizz.ca/fr/discussion/2027698/acceder-configuration-routeur-fizz

http://192.168.0.1

https://www.guru99.com/difference-ipv4-vs-ipv6.html