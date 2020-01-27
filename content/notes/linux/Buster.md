---
title: "Debian 10 *buster* released"
date: 2019-07-09
tags: [Linux, Debian, buster]
---

I have been on Debian *buster* for more than a year while it was the Debian Testing. After a frozen period that lasted a few months, [*buster* is the new stable Debian distribution since yesterday](https://www.debian.org/News/2019/20190706)!

What does this change on my end? Not much! Basically, as I was already using *buster* in my  `/etc/apt/sources.list.d/` file, when I used `apt-get update` I got the following message:

```sh
Get:1 http://security.debian.org/debian-security buster/updates InRelease [39.1 kB]
Get:2 http://deb.debian.org/debian buster InRelease [118 kB]           
[... NOT SHOWN FOR THE SAKE OF BRIVETY]
Reading package lists... Done
N: Repository 'http://security.debian.org/debian-security buster/updates InRelease' changed its 'Version' value from '' to '10'
E: Repository 'http://security.debian.org/debian-security buster/updates InRelease' changed its 'Suite' value from 'testing' to 'stable'
N: This must be accepted explicitly before updates for this repository can be applied. See apt-secure(8) manpage for details.
[... NOT SHOWN FOR THE SAKE OF BRIVETY]
```

As explained [on <i class="fab fa-stack-exchange"></i>](
https://superuser.com/questions/1456989/how-to-configure-apt-in-debian-buster-after-release), all I had to do was:

```sh
$ apt-get update --allow-releaseinfo-change
```

I am gonna stick to Buster for a couple of months and I'll switch to Debian 11 [*bullseye*](https://pixar.fandom.com/wiki/Bullseye) at the end of this year, or early 2020!

