---
title: "Convert a pdf file to a text file with pdftotext"
date: 2019-11-04
tags: [pdftotext, XpdfReader, pdf, cli]
---

Today I was asked whether I was aware of a way to extract a table from a pdf
file. I actually knew about one CLI tool [`pdftotext`
:link:](https://www.xpdfreader.com/pdftotext-man.html) that converts a pdf file
to a text file and I had this memory that I had used it for tables in the
past. `pdftotext` is developed by [Glyph & Cog](https://www.glyphandcog.com/)
with several other CLI tools to manipulate pdf files and the pdf viewer
[Xpdf](https://www.xpdfreader.com/index.html). On Debian (and Debian
derivatives), `pdftotext` and the other CLI tools are included in the package Debian package
[poppler-utils](https://packages.debian.org/buster/poppler-utils) that can be installed like so:


```sh
$ sudo apt-get install poppler-utils
```

Once installed, the following command line does the conversion

```sh
$ pdftotext input.pdf output.txt
```

There are several additional option and if one means to extract a table, the `-layout` option is pretty helpful as it maintains the original physical layout (as explained in the [documentation](https://www.xpdfreader.com/pdftotext-man.html)):


```sh
$ pdftotext -layout input.pdf table.txt
```

Pretty sweat :smile:!