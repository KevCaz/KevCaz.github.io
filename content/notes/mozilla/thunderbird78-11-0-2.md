---
title: "The Thunderbird Debian package has already been patched!"
date: 2021-06-30
tags: [Debian, Thunderbird, bug fix]
---

In my [previous note](/notes/mozilla/thunderbird78-11-0-1), I reported major issues with Thunderbird 78.11.0-1. As it turned out, it was an actual bug that [has been reported](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=989839). Shortly after the report, a work around has been proposed, and the new patch uploaded last Sunday (2021/06/29) solves all the issues I encountered. So everything is back to normal! 

```sh
$ apt-cache show thunderbird | head -n 5
Package: thunderbird
Version: 1:78.11.0-2
Installed-Size: 168899
Maintainer: Carsten Schoenert <c.schoenert@t-online.de>
Architecture: amd64
```

IIUC, there was something wrong with [libnss3](https://packages.debian.org/sid/libnss3), but I may not have understood the thread correctly :laughing:... I am very pleased that Thunderbird is fixed now (many thanks to the maintainer, Carsten Schoenert) and I am also happy I took that opportunity to have a quick look at how a bug in a Debian package is actually solved. It also gave me a good reason to try Evolution out, I enjoyed it, but I am much more accustomed to write my mail with Thunderbird, and damn... it only took a few day for me to miss [writing my emails in Markdown](notes/mozilla/markdowninthunderbird/)! 
