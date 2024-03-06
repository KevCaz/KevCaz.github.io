---
title: "Markdown tables to Word tables `[WORK AROUND]`"
date: 2019-11-18
tags: [libreoffice, pandoc, conversion, odt, docx, tables]
---


[Pandoc](https://pandoc.org/) is an amazing document converter that I use very
frequently. Earlier today, as I was converting a Markdown document (`.md`) to a
Word one (`.docx`) I realized that the tables weren't rendered properly. More
precisely, after opening the document with
[LibreOffice](https://en.wikipedia.org/wiki/LibreOffice), the first column of
every tables was using the full width of the document and I was not able to
quickly fix this issue with LibreOffice. I figured that this was caused by
either pandoc or LibreOffice and so I first checked the version of pandoc
installed:

```sh
$ apt policy pandoc
pandoc:
 Installed: 2.2.1-3+b2
 Candidate: 2.2.1-3+b2
 Version table:
*** 2.2.1-3+b2 500
       500 http://debian.mirror.rafal.ca/debian buster/main amd64 Packages
       500 http://deb.debian.org/debian buster/main amd64 Packages
       100 /var/lib/dpkg/status
```

Given that this version was more than a year old, I thought that this issue could have being fixed in newer versions and so I installed [v2.7.3 (released last June)](https://github.com/jgm/pandoc/releases) (downloading `pandoc-2.7.3-1-amd64.deb` and using `dpkg`):

```sh
$ apt policy pandoc
pandoc:
 Installed: 2.7.3-1
 Candidate: 2.7.3-1
 Version table:
*** 2.7.3-1 100
      100 /var/lib/dpkg/status
    2.2.1-3+b2 500
      500 http://debian.mirror.rafal.ca/debian buster/main amd64 Packages
      500 http://deb.debian.org/debian buster/main amd64 Packages
```

This did not solve the issue but I quickly found a two-steps work around. First I converted the Markdown file to a [OpendDocument one (`.odt`)](https://en.wikipedia.org/wiki/OpenDocument):

```sh
$ pandoc file.md file.odt
```

Second I used LibreOffice to do the conversion! This does not solve the issue but it's a good work around (good enough for me).
