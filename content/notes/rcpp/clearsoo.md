---
title: "Mind your object and shared object files!"
date: 2018-10-17
tags: [Rcpp, R, gcc, compilation]
---

[Rcpp](www.rcpp.org) profoundly changed the R landscape. Basically, it made all performance bottlenecks vanish and I'm not surprised that so many packages are now using it:

>  As of May 2017, 1026 packages on CRAN and a further 91 on BioConductor deploy Rcpp to extend R. (www.rcpp.org - October 17, 2018)

Even people that do not know nothing about Rcpp are likely to use it on a regular basis as most packages for data science are now linked to Rcpp (e.g. [dplyr](https://cloud.r-project.org/web/packages/dplyr/index.html)).

Even though I am comfortable with Rcpp, I still do silly mistakes. Yesterday for instance, I was working on a package I am contributing to and ran into a
problem that I should have easily avoided. I compiled one of the `.cpp` files
without any issue but after a while (and when I tried to exit R) I got the error below:


```R
*** caught segfault ***
address (nil), cause 'unknown'

Possible actions:
1: abort (with core dump, if enabled)
2: normal R exit
3: exit R without saving workspace
4: exit R saving workspace
```

So after I spent few minutes wondering what did I do wrong, I realized that since the last time I worked on this package I had installed newer versions of R, Rcpp and [gcc](https://gcc.gnu.org/). So, I figured out that it is likely that the [compilation process](http://faculty.cs.niu.edu/~mcmahon/CS241/Notes/compile.html) must have changed enough that I needed to rebuild all [`.o` (object) and `.so` (shared object) files](https://stackoverflow.com/questions/30186256/what-is-the-difference-between-o-a-and-so-files) files. That's what I did and it worked :trophy:!
