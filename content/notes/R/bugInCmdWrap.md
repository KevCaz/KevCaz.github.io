---
title: "A bug in the command wrapper of r-core-base 3.5.1-1+b2"
date: 2018-11-18
tags: [R, command wrapper, efficiency]
---


Today, as I working on a post, I got this issue when using the R command wrapper:

```R
$ Rscript --no-site-file -e 'blogdown::serve_site()'
/usr/lib/R/bin/R: line 193: /usr/bin/sed: No such file or directory
ERROR: option '-e' requires a non-empty argument
```

I did not understand what happened so I decided to google it! The [bug was already identified and reported :smile:](https://www.mail-archive.com/search?l=debian-bugs-dist@lists.debian.org&q=subject:%22Bug%23913982%5C%3A+r%5C-base%5C-core%5C%3A+R+executable+wrapper+scripts+hard%5C-code+the+wrong+path+to+sed.%22&o=newest&f=1). A side note to mention that several packages now imports
[callr](https://cran.r-project.org/web/packages/callr/index.html) (for instance
[pkgdown](https://pkgdown.r-lib.org/)) and as it uses the R command wrapper
(if I understand correctly) the current bug actually affects several different
packages. A simple example is when I try to rebuild the website of [rcites](https://cran.r-project.org/web/packages/rcites/index.html)
(using pkgdown):


```R
R> pkgdown::build_site()
/usr/lib/R/bin/R: line 201: /usr/bin/sed: No such file or directory
ERROR: option '-f' requires a filename argument
Error: callr failed, could not start R, exited with non-zero status, has crashed or was killed /usr/lib/R/bin/R: line 201: /usr/bin/sed: No such file or directory
ERROR: option '-f' requires a filename argument
```

Solution? Dirk Eddelbuettel is working on this, so it should be fixed very soon!

> I think I'll just build and ship a fresh 3.5.1-2 which should take care of this.
