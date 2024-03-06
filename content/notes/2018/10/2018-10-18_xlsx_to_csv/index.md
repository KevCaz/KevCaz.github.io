---
title: ".xlsx to .csv with ssconvert"
date: 2018-10-18
tags: [GNU, Gnumeric, ssconvert]
---

Even if I use [Calc](https://www.libreoffice.org/discover/calc/) more
often than [Gnumeric](http://www.gnumeric.org/) (and actually I tried to
spend as less time as possible on spreadsheet programs), the latter
provides a tool I'm fond of,
[ssconvert](http://manpages.ubuntu.com/manpages/bionic/man1/ssconvert.1.html):

> ssconvert - a command line spreadsheet format converter

It offers a very efficient way to convert `.xlsx` into `.csv`,
for instance:

```sh
mkdir csvFiles
ssconvert -S spreadsheet.xlsx csvFiles/%s.csv
```

I the command lines above, I first create the folder 'csvFiles' with `mkdir` and then I use
`ssconvert` with option `-S` that stands for `--export-file-per-sheet`:

> Export a file for each sheet if the exporter only supports one  sheet  at  a  time.
  The  output  filename is treated as a template in which sheet number is substituted
  for %n and/or sheet name is substituted for %s.  If there are not substitutions,  a
  default of ".%s" is added. (see `man ssconvert`)

So, basically, assuming there are two sheets 'sheet1' and 'sheet2' in
my file `spreadsheet.xlsx`, then I'll get `sheet1.csv` and `sheet2.csv` in my folder
'csvFiles' :fireworks:.

I find `ssconvert` extremely helpful in my workflow as several colleagues of
mine work with spreadsheet programs as a database management software :neutral_face::
I use `ssconvert` as the first step of my analysis pipeline so that I never
modify the original database and use a format easy to manipulate with the
programming languages I use :smirk:.
