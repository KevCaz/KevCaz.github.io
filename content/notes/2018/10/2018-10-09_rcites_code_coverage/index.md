---
title: "rcites code coverage dropped to 0"
date: 2018-10-09
tags: [continuous integration, coverall, codecov, rcites, R]
---

We (a couple of colleagues and myself) are currently finishing a major release
for our R package [rcites](https://github.com/ibartomeus/rcites). After adding the latest
feature I have been working on via a pull request, I messed up with my local
master branch and overwrite/delete some files :angry:. I thought it was not
a big deal as all of them were files created/edited when the package is built (well, I
thought so). But after the very next push, [the code coverage weirdly dropped to
zero](https://github.com/ibartomeus/rcites/issues/37) :scream:.

I googled all potential issues not related with the package itself for an
hour or so (while it was clearly my sole responsibility) and finally realized that
I mistakenly deleted `tests/test-all.R` which basically triggers the tests
:unamused: and so there was no test reported to [codecov](https://codecov.io/gh/ibartomeus/rcites)
and thus a code coverage of 0%. Actually, all this mess turned out to be a
good opportunity to learn more about how [covr](https://cran.r-project.org/web/packages/covr/index.html)
works (the vignette ["How does covr work anyway"](https://cran.r-project.org/web/packages/covr/vignettes/how_it_works.html)
is extremely helpful for this). Also, while I was (wrongly) wondering if there was something wrong
on codecov side, I set up [coveralls](https://coveralls.io/github/ibartomeus/rcites?branch=master)
for our repository, I must say that I really like the design of this website!
