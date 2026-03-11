---
title: Setting a Reserved IP for an Ethernet connection on a Helix Fi Gateway
date: 2026-03-11
tags:
    - MAC
    - Helix
    - Raspberry Pi
---


I use Videotron as my internet provider; more precisely, I use the [Helix](https://www.videotron.com/en/helix) service. Therefore, I have a Helix Fi Gateway at home that I use to connect my devices to the internet, including a Raspberry Pi that hosts a Nextcloud service.  

As I need to use this service outside my home, I need to forward ports. As it turns out, with Helix, you must use the 'Helix Fi' application to do so. You download the application, go to Advanced Settings (see steps 1 to 4 in Figure 1), and then select the devices available in the list. Easy enough, **but only devices connected via Wi-Fi are available**.


So I was able to make everything work while the Raspberry Pi was connected by Wi-Fi. But recently I ran into trouble with the Wi-Fi connection on my Raspberry Pi, so I needed to connect it via Ethernet instead. That was not as easy as I had hoped. 

{{< figcenter "img/flow.svg" 90 "Figure 1. Screenshots of the Helix page. The workflow for port forwarding is: 1. Click on 'View Wi-Fi equipment'. 2. Go to 'Advanced settings'. 3. Go to 'Port forwarding'. 4. Select the device and set up the desired port forwarding. Step 5 shows where to click to allow admin tool access via an internet browser." >}}

Sadly, most of the answers I found online were erroneous. I even read somewhere on Reddit that somebody bought a different router to do that. Chatting with AI and looking for a more general understanding was how I figured this out. I needed to reserve an IP on the router to add my Ethernet-connected device. Below is how I proceeded: 

1. Go to the 'Helix Fi' app.

2. Go to Advanced Settings (steps 1-2 in Figure 1).

3. Go to 'Gateway admin tool', allow admin tool access via an internet browser (step 5), and note the router URL.

4. On your device (mine was the aforementioned Raspberry Pi), get the [MAC address](https://en.wikipedia.org/wiki/MAC_address) corresponding to the Ethernet port you will be using. Note that the MAC address is made of 12 hexadecimal digits, in my case presented as 6 pairs of digits separated by colons (e.g. `9a:34:61:c3:12:f0`). On Linux, you can get it using the `ip` command:

```sh
$ ip a
# You should get something like the line below
[...]
eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether <THE MAC ADDRESS>
[...]
```

5. Go to the router page and reserve the IP (see Figure 2). Enter the host name you want, the MAC address, and the IP you want, which must be in the DHCP range.

6. Finally, go back to the 'Helix Fi' app, go through steps 1-4 in Figure 1, select the newly added device, and you should be done.


{{< figcenter "img/setup.png" 60 "Figure 2. Screenshot of the router page where you can reserve an IP." >}}


I hope this is useful!
