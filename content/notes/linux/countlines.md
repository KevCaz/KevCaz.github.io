---
title: "How to count non-blank lines of a set of files?"
date: 2018-09-23
tags: [Linux, Unix, sed, wc, cat]
---


Yesterday, I was trying to find a way to count lines of a set of R files without comments nor empty lines and found [this answer on stackoverflow](https://stackoverflow.com/questions/114814/count-non-blank-lines-of-code-in-bash):

```sh
cat R/* | sed '/^\s*#/d;/^\s*$/d' | wc -l
```

Exactly what I needed! A few explanations are in order:

- [cat](https://en.wikipedia.org/wiki/Cat_(Unix)) reads files sequentially;
- ["|"](https://en.wikipedia.org/wiki/Pipeline_(Unix)) is the the pipe operator;
- [sed](https://en.wikipedia.org/wiki/Sed) parses and transforms text;
- [wc](https://en.wikipedia.org/wiki/Wc_(Unix)) counts words, lines and more!


Basically, counting lines of a file is done with the option `-l` of `wc`
(option `-m` for characters, see `man wc` to learn more):

```sh
wc -l file   
```

`cat` reads the set of file and with pass it to `wc` using the pipe:

```sh
cat R/* | wc -l     
```

To remove blank lines (here comments and empty lines) we use the stream editor
as follows:

```sh
sed '/^\s*#/d;/^\s*$/d'
```

There are two instructions separated by a semi colon:

1. `/^\s*#/d`
2. `/^\s*$/d`

Characters between the two slashes `/ /` is the selection and `d` at the end of the instruction means "delete the selection". `^\s*#` means "lines starting by (`^`) an arbitrary number (`*`) of whitespace characters (`\s`) followed by a `#` (the character for comments)", so basically lines of comments. The second line is similar but `$` indicates the end of the line, so `/^\s*$/d` reads "lines that start and end by an arbitrary number of whitespace characters", that is blank lines!

```sh
cat R/* | sed '/^\s*#/d;/^\s*$/d' | wc -l
cat R/* | sed '/^\s*#/d' | sed '/^\s*$/d' | wc -l
```

Stream editors are very powerful tools, if you are interested in learning more about one of them, have a careful look at the [documentation of GNU sed](https://www.gnu.org/software/sed/manual/sed.html).
