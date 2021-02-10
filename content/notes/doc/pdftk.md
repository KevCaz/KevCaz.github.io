---
title: "Extract a range of pages from a pdf file"
date: 2019-05-30
tags: [pdftk, pdf, cli]
---

Today, I was looking for a way to extract pages from a pdf file with the command
line interface and stumbled on this answer [on <i class="fab fa-stack-exchange"
aria-hidden="true"></i>](https://askubuntu.com/questions/221962/how-can-i-extract-a-page-range-a-part-of-a-pdf),
and so I decided to try [PDFtk](https://www.pdflabs.com). After a quick
installation (`apt-get install pdftk`), I simply reproduced the example in the
answer with my file!

```sh
$ pdftk book.pdf cat 34-45 output chapter2.pdf
```

Very handy, quite easy to use and efficient! Digging a little more the [documentation](https://www.pdflabs.com/docs/pdftk-man-page/), it turns out that you can do way more! For instance, with the same `cat` options, you can actually create assemblages of different PDF files with specific range of pages and specific orientations, for instance :

```sh
pdftk A=book1.pdf B=book2.pdf cat A1-5oddsouth B2-4even output out.pdf
```

This single command line:

1. take the 2 pdf `book1.pdf` and `book2.pdf` files as inputs;
2. take the pages from 1 to 5 that have an `even` number (so 1, 3 and 5) of the first pdf and turn them upside down (`south`);
3. take `even` pages from 2 to 4 (so 2 and 4) from the second file;
4. combine them in `out.pdf`.

Pretty sweet :smile:!
