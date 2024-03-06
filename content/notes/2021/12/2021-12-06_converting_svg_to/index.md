---
title: "Converting svg to eps with Inkscape cli"
date: 2021-12-06
tags: [Inkscape, cli, convert, SVG, EPS]
---

:fast_forward: **tl;dr**: You can convert your SVG file `myfig.sv` to EPS using `inkscape myfig.svg -o myfig.eps --export-ps-level=3`.


## The problem

For the latest paper we've submitted, the journal required figures in EPS, but all the figures I've had created were in SVG. That really puzzled me! Why on earth forcing authors to submit in EPS? At the very least the journal policy should allow authors to submit in other vector formats... I actually think this is rather problematic because 1. EPS has some known vulnerabilities (see [this article on The Register](https://www.theregister.com/2017/05/09/may_2017_ms_patch_tuesday/)) and 2. there are *better* alternatives available. 

[Encapsulated PostScript](https://en.wikipedia.org/wiki/Encapsulated_PostScript) is a proprietary vector format for graphics that sort of extends [PostScript](https://en.wikipedia.org/wiki/PostScript) so that graphics can be integrated in PostScript documents while remaining self-contained and as such, a standalone file. EPS was released by Adobe in the second half of the 80's (the [speciation for the version 3.0](https://www.adobe.com/content/dam/acom/en/devnet/actionscript/articles/5002.EPSF_Spec.pdf) was released in 1992). About the same time, Adobe was also working on PDF (which basically is a descendant of PostScript) and [Adobe Illustrator Artwork (AI)](https://en.wikipedia.org/wiki/Adobe_Illustrator_Artwork) which, according to <i class="fab fa-wikipedia-w" aria-hidden="true"></i>ikipedia, is "a proprietary file format developed by Adobe Systems for representing single-page vector-based drawings in either the EPS or PDF formats". After reading some articles about this it looks like EPS was super useful at that time but PDF and AI have since become *de facto* the new standards. Even Adobe recognizes EPS as a less modern file format

> .eps: Encapsulated PostScript is an older type of vector graphics file. .eps files don’t support transparency in the way more modern file formats like .ai do. *<https://www.adobe.com/creativecloud/design/discover/vector-file.html>*

So here you go, there are at least two others more modern alternatives: PDF and AI. There is a least another very legit alternative, [Scalable Vector Graphics](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) a.ka. SVG. As explained in the Wikipedia article 

> Scalable Vector Graphics (SVG) is an XML-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999. 

The speciation for the current version (1.1, released in 2011) is available at the following https://www.w3.org/TR/2011/REC-SVG11-20110816/ and a version 2.0 has been recently drafted https://svgwg.org/svg2-draft/. SVG is very popular, supported by most modern graphical software and most programming languages (at least the one used to draw figures!). Not to mention [Inkscape](https://inkscape.org/), a fantastic piece of free and open-source software that allows you to create edit SVGs in a very friendly way...


<!-- https://docs.fileformat.com/page-description-language/eps/ -->

So why are some journals forcing us to use EPS files instead of allowing alternatives such as SVG?. My two cents about this is that EPS were common some 20 years ago and the journal was (and probably still is) using a combination of Latex and PostScript and in their  stack it is easier to use EPS. And so, instead of updating their stack to include a wider range of file format, they ask authors to solely submit EPS... again, that's my two cents' worth.




## A solution

Fortunately, there is a relatively simple way to convert SVG to EPS: [Inkscape cli](https://wiki.inkscape.org/wiki/Using_the_Command_Line)[^n1], which ships with any recent version of [Inkscape](https://inkscape.org/). On Debian, you can installed it via `apt-get`.


[^n1]: A google search will likely lead you to [this answer on <i class="fab fa-stack-overflow" aria-hidden="true"></i>](https://stackoverflow.com/questions/30242672/inkscape-command-line-need-to-convert-svg-to-eps-without-filter-rasterisation).

```sh
# check the version installed
$ apt policy inkscape
inkscape:
  Installed: 1.1.1-2
  Candidate: 1.1.1-2
  Version table:
 *** 1.1.1-2 500
        500 http://ftp.ca.debian.org/debian bookworm/main amd64 Packages
        100 /var/lib/dpkg/status
```

Once installed, I recommend you check out the manual for more details 

```sh
$ man inkscape # to have more info
```

As a first command, you can run the following one that displays the version installed.

```sh
$ inkscape --version
Inkscape 1.1.1 (3bf5ae0d25, 2021-09-20)
```

Below is what I do to export my SVG file (`myfig.eps`) to EPS (you will probably find similar answers elsewhere, e.g. on [<i class="fab fa-stack-overflow" aria-hidden="true"></i>](https://stackoverflow.com/questions/30242672/inkscape-command-line-need-to-convert-svg-to-eps-without-filter-rasterisation)).


```sh
inkscape myfig.svg -o myfig.eps --export-dpi=600 --export-ps-level=3
```

Pretty neat! And to make this even more useful, I've created a small bash function, `svgtoeps()`, that I added to my `.zshrc` file.

```sh
svgtoeps() {
  for file in $@
  do
     inkscape $file -o "${file%.svg}.eps" --export-dpi=600 --export-ps-level=3  
  done
}
```

Briefly, `--export-ps-level=3` specifies the PS/EPS version to be used and `--export-dpi=600` determines the resolution for raster images. :warning: I'm not 100% sure whether this actually converts raster parts of a SVG to the right dpi in EPS, so this might actually be useless. Anyway, I can now use `svgtoeps` to convert SVG files like this 

```sh
svgtoeps cool.svg
```

Note that with this function, to convert a batch of SVG in the current directory, all I need is the following line.

```sh
svgtoeps *.svg
```

While I was creating this, I thought it would be convenient to have a similar function to convert SVG to PNG. Below is my bash function that does such conversion. 

```sh
svgtopng() {
  for file in $@
  do
     inkscape $file -o "${file%.svg}.png" --export-dpi=600 --export-type=png --export-background=ffffffff
  done
}
```

Note that `export-background=ffffffff` adds a white background instead of a transparent one (default behavior).


That's all folks. 