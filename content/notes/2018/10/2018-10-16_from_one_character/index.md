---
title: "From one character encoding to another"
date: 2018-10-16
tags: [Linux, Unix, file, iconv, character encoding]
---

Today I needed to check the character encoding of a file, I found [this page that explains how to do this](https://www.tecmint.com/convert-files-to-utf-8-encoding-in-linux/). Basically the command `file` will give you the info, for instance:

```sh
$ file example.md
example.md: ASCII text
```

options `-i` for `--mime` and `-b` for `--brief` will give:

```sh
$ file -bi example.md
text/plain; charset=us-ascii
```

I figured out that I needed to convert my file from one character encoding to another and so I used `iconv`. As mentioned in the link above,
`iconv -l` will give you the list of character encodings `iconv` handles. In my case, I needed to convert the file from [Latin1, aka iso8859-1](https://en.wikipedia.org/wiki/ISO/IEC_8859-1)
to [UTF-8](https://en.wikipedia.org/wiki/UTF-8), so I used the following command line:

```sh
$ iconv -f iso8859-1 -t UTF8 changeencoding.md -o changeencoding_utf8.md
```
