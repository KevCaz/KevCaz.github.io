---
title: Back to Thunderbird 52.9.1!
date: 2018-09-18
tags: [Debian, Thunderbird, apt-get, installation]
---

Recently, Firefox 60 and [Thunderbird 60](https://www.thunderbird.net/en-US/)
were made available for Debian Testing and so I installed them. While I was
and still amhappy with Firefox when I tried Thunderbird I had some issues...
Basically, I was not able to send a message and one of my favorite add-on,
[Markdown-Here](https://markdown-here.com/index.html), was not available
for this version :cry:. So, I needed to get the previous version back.
I searched for an answer and found [this
one](https://askubuntu.com/questions/138284/how-to-downgrade-a-package-via-apt-get),
very helpful! So I checked the version available using `apt-cache policy`:

```sh
❯ apt-cache policy thunderbird
thunderbird:
 Installed: 1:60.0-3~deb9u1
 Candidate: 1:60.0-3~deb9u1
 Version table:
*** 1:60.0-3~deb9u1 500
       500 http://security.debian.org stable/updates/main amd64 Packages
       100 /var/lib/dpkg/status
    1:52.9.1-1 500
       500 http://debian.mirror.rafal.ca/debian testing/main amd64 Packages
    1:52.8.0-1~deb9u1 500
       500 http://ftp.debian.org/debian stable/main amd64 Packages
```

`1:52.9.1-1 500` means version `1:52.9.1-1` is installable, well, it was the one
I was looking for to to re-install Thunderbird (btw `100 /var/lib/dpkg/status`
is the one installed):

```sh
❯ sudo apt-get install thunderbird=1:52.9.1-1  
[...]
❯ thunderbird -v                                
Thunderbird 52.9.1
```

YEAH:fireworks::fireworks:! Plus, in order to prevent from re-installing version 60, I marked version 52:

```sh
❯ sudo apt-mark hold thunderbird     
[sudo] password for kevcaz:
thunderbird set on hold.
```

I'll wait some weeks and the new version of Markdown Here that should [come soon](https://github.com/adam-p/markdown-here/pull/520) before using version
60 and its new features :smiley_cat:.
