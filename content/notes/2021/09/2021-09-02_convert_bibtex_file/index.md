---
title: "Convert bibtex file to YAML with pandoc"
date: 2021-09-02
tags: [references, pandoc, yaml, bib]
---


When I need to update my publication list, I usually retrieve a bibtex file (`.bib`) from [OrcID](https://orcid.org/0000-0001-6619-9874). I used to convert this file into a YAML with [pandoc-citeproc](https://github.com/jgm/pandoc-citeproc) like this 

```sh
$ pandoc-citeproc --bib2yaml pubs.bib > pubs.yaml
```

Since [pandoc 2.11](https://github.com/jgm/pandoc/releases/tag/2.11), `pandoc-citeproc` is no longer used to format citations and the repository is now archived:

> Pandoc now uses the [citeproc](https://github.com/jgm/citeproc) library, and no external filter is needed.


So I decided to give it a try and adjust some scripts of my own using the new way of doing the conversion. The first step was to get a newer version of Pandoc because, even in Sid, [Debian currently packages Pandoc 2.9.1](https://packages.debian.org/sid/pandoc). So I installed the latest version manually by doing 

```sh
$ wget https://github.com/jgm/pandoc/releases/download/2.14.2/pandoc-2.14.2-1-amd64.deb -O /tmp/pandoc.deb
$ sudo dpkg -i /tmp/pandoc.deb
```

And here is the version I am now using

```sh
$ pandoc -v
pandoc 2.14.2
Compiled with pandoc-types 1.22, texmath 0.12.3.1, skylighting 0.11,
citeproc 0.5, ipynb 0.1.0.1
User data directory: /home/kevcaz/.local/share/pandoc
Copyright (C) 2006-2021 John MacFarlane. Web:  https://pandoc.org
This is free software; see the source for copying conditions. There is no
warranty, not even for merchantability or fitness for a particular purpose.
```

Then, I had to figure out how to do the conversion! So I looked up the documentation and it is all explained in the section ["Specifying bibliographic data"](https://pandoc.org/MANUAL.html#specifying-bibliographic-data). Now, all I need to do for this conversion is

```sh
$ pandoc pubs.bib -s -f biblatex -t markdown > pubs.yaml  
```

Pretty neat! And if at some point I decide to use JSON rather than YAML, I simply edit the line above as follows

```sh
pandoc works.bib -s -f biblatex -t csljson > pubs.json
```

Pandoc is definitively a very important tool for me, it sure has made my life way easier over the past 7 years now. 






