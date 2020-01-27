---
title: "How to get all web fonts from one format [SOLVED]"
date: 2019-11-25
tags: [code, font, programming]
draft: true
---

There are several ways and as explained [on css-triks](https://css-tricks.com/understanding-web-fonts-getting/), you may consider using more than one format to better. Basically, I was looking for how to built the all the set of one

```sh
any format => all of them
```

There are several for instamce
[](https://www.fontsquirrel.com/tools/webfont-generator). I saw package that
[icon-font-generator](https://www.npmjs.com/package/icon-font-generator) and
specific to generale (for instance
https://stackoverflow.com/questions/1979826/how-can-i-convert-otf-ttf-files-to-eot-format).

```sh
$ sudo apt-get install eot-utils
$ mkeot fontfilename.otf > fontfilename.eot
```

But for looks like the bets option is [FontForge](https://fontforge.org/en-US/)
has a command line and several questions pointed to this so
[scripting](https://fontforge.org/en-US/documentation/scripting/)


```perl
#!/usr/bin/fontforge
Open($1)
Generate($1:r + ".ttf")
# Generate($1:r + ".svg") # NB not supported by chrome anymore
Generate($1:r + ".eof")
Generate($1:r + ".woff")
Generate($1:r + ".woff2")
```

> If you want to expand support as wide as possible, then add EOT and TTF files to the mix.

```sh
$ fontforge -script getwebfonts.pe Beyond_Wonderland.ttf
```

```sh
$ ls
.   Beyond_Wonderland.afm  Beyond_Wonderland.svg  Beyond_Wonderland.woff   
..  Beyond_Wonderland.eof  Beyond_Wonderland.ttf  Beyond_Wonderland.woff2    
```

then

https://css-tricks.com/snippets/css/using-font-face/

```css
@fontface
```
