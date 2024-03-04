---
title: "Combine multiple pdf files"
date: 2019-10-24
tags: [cli, pdf, pdftk]
edits: 
  - Note about installation and more steps to reproduce the example (2024-03-04)
---

For a recent job application, I needed to combine several pdf files into a
single one and to number its pages afterwards. 
I already knew that I would be able to use [PDFtk](https://www.pdflabs.com), 
a smart CLI tool I [mentioned in a previous note]({{< ref "/notes/doc/pdftk" >}}) 
to combine the pdf files, but I was not sure how to proceed for the page numbering. 
Turns out that PDFtk is also useful for this too! 

To install pdftk on Ubuntu (or Debian) and MacOS, you should look for `pdftk-java`:

```sh
# ubuntu
apt-get install pdftk-java
# MacOS 
brew install pdftk-java
```

Once installed, it is relatively easy to find short tutorials that explain how to combine pdf
files with PDFtk, for instance, there is a [very good one on *Make Tech
Easier*](https://www.maketecheasier.com/combine-multiple-pdf-files-with-pdftk/).
Basically, it is a simple call to the command `cat` of PDFtk:

```shell
$ pdftk file1.pdf file2.pdf file3.pdf cat output final.pdf
```

For the page numbering, I found [this post by Dr. Chloé-Agathe
Azencott](http://cazencott.info/index.php/post/2015/04/30/Numbering-PDF-Pages).
Following Dr. Azencott did, I created `number.tex` (see below), an empty document with pages numbered (my final document had 15
pages):

```tex
 \documentclass[12pt,a4paper]{article}
 \usepackage{multido}
 \usepackage[hmargin=.8cm,vmargin=1.5cm,nohead,nofoot]{geometry}
 \begin{document}
 \multido{}{15}{\vphantom{x}\newpage}
 \end{document}
```

Then I called `pdflatex` to obtain `number.pdf` with the desired 15 pages:

```sh
pdflatex test_number.tex -o test_number.pdf
```

Then I used the `multibackground` argument of PDFtk concisely introduced in the
[documentation](https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-background) :


```shell
$ pdftk input.pdf multibackground background.pdf output final.pdf
```

Finally, I combined these two steps in the following
[makefile](https://www.gnu.org/software/make/manual/make.html) so that I could rebuild my application with `make`:


```makefile
# combine all pdf documents I needed: the
pdfs := $(patsubst %.md, %.pdf, $(wildcard *.md extra.pdf))
target = final.pdf

ALL: $(target)

$(target): $(pdfs)
	pdftk $(sort $(pdfs)) cat output tmp.pdf # sort and combine pdf
	pdftk tmp.pdf multibackground numbers.pdf output $(target) # create final pdf
	rm tmp.pdf # remove the temporary file

# convert Markdown files to pdf files (pattern rule)
%.pdf: %.md
	pandoc $< -o $@
```

Hope this could be useful! 
