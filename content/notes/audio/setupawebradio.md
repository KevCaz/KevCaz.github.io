---
title: "Set up your own webradio"
date: 2021-05-02
tags: [icecast, liquidsoap, mixxx, fapg, audio, internet radio]
---

Three friends and I have decided to start a webradio so we could listen to musique, 
mix live and even air podcasts of our own. I thought that would be a long and hard way to reach that goal. Turned out that was not that complicate thanks to the great open souces available. Here I just want to report back the steps to foow. I don't want to go into details, just give the key element. 


## Rent a server 

The first step if you want is to rent a . Of course you could your own computer but I think it is safer to have a sever where you have that actually take care of it and ensure securtiy. We went with []() and so far, so good, the set up was quick, we used a VM, works great and the use there own mirir dor the ubuntu package. Great. 

```sh
# inxi -S
System:    Host: radio-rab Kernel: 5.4.0-66-generic x86_64 bits: 64 Console: tty 2 Distro: Ubuntu 20.04.2 LTS (Focal Fossa) 
```

## Set up icecast 

As explains in the []

> Icecast is a streaming media (audio/video) server which currently supports Ogg (Vorbis and Theora), Opus, WebM and MP3 streams.
It can be used to create an Internet radio station or a privately running jukebox and many things in between. It is very versatile in that new formats can be added relatively easily and supports open standards for communication and interaction. (<https://icecast.org/>)



## Open source 

| Soft     | Licence | Repository | Documentation | 
|:---------|:----|:----|:----|
|Icecast 2 |GPL 2|:----|
|Liquidsoap|GPL >= 2|:----|
|Mixxx     |[GPL >= 2](https://github.com/mixxxdj/mixxx/blob/main/LICENSE#L17) |https://github.com/mixxxdj/mixxx|
| http://manpages.ubuntu.com/manpages/bionic/man1/fapg.1.html


GPL >= 2 


* Icecast is distributed under the GNU GPL, version 2. https://gitlab.xiph.org/xiph/icecast-server/-/tree/master
* Liquidsoap GPL >= 2 https://github.com/savonet/liquidsoap
* https://manual.mixxx.org/2.0/en/chapters/appendix.html#appendix-command-line-options 
https://www.liquidsoap.info/doc-1.4.4