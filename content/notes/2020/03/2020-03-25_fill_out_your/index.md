---
title: "Fill out your XFA forms with Master PDF"
date: 2020-03-25
tags: [pdf, XFA forms]
---


The other day I needed to fill out some [XFA forms](https://en.wikipedia.org/wiki/XFA). 
On the website I was told to use Acrobat Reader :fearful:... which is [**not** supported on Linux](https://unix.stackexchange.com/questions/3505/how-to-install-adobe-acrobat-reader-in-debian). 
So I looked for an alternative to work on Debian 10, when I stumbled into this 
[answer on <i class="fab fa-stack-exchange"></i>](https://askubuntu.com/questions/1184128/is-there-any-software-that-can-fill-xfa-forms-in-ubuntu) 
mentioning [Master PDF](https://code-industry.net/free-pdf-editor/), so I installed it:


```sh
$ apt-get install master-pdf-editor
```

and you know what? Worked like a charm! :fireworks: