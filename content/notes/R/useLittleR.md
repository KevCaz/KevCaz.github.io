---
title: "Use litller!"
date: 2019-02-26
tags: [R, littler]
---

There are a couple of operations I'm doing very regularly with R:

- install and update packages
- render `.Rmd` document
- use a set of commands when I develop a package

In my terminal I used [Z shell (a.k.a. zsh)](https://en.wikipedia.org/wiki/Z_shell) and I was looking for an efficient way to do all the to when I remember about
[littler](http://dirk.eddelbuettel.com/code/littler.html) and I decided
to try to use it.

> littler provides the `r` program, a simplified command-line interface for GNU R. This allows direct execution of commands, use in piping where the output of one program supplies the input of the next, as well as adding the ability for writing hash-bang scripts, i.e. creating executable files starting with, say, `#!/usr/bin/r`
(see http://dirk.eddelbuettel.com/code/littler.html)

As explained the command is `r` but with zsh it redoes the last command. So
the first step was to use a alias to make [`r` works as expected](https://github.com/eddelbuettel/littler/issues/57):

```
$ alias r=/usr/bin/r
```

Note that you can use another alias say `lr` if you want to keep the `r` as
is.

```
$ r -pe "2+2"
>> KevCaz  - 26/01/19 12h35min23sec
[1] 4
 26/01/19 12h35min23sec Até mais! <<
```

https://opensource.com/article/17/6/set-path-linux


Well as expected, Dirk Eddelbuettel (who maintains littler) has script to
do all the action I was looking for and more so go to
https://github.com/eddelbuettel/littler/tree/master/inst/examples.



By the way, I've also learned (see [this thread](https://github.com/eddelbuettel/littler/issues/24)).

Combined woth docopt... powerful
