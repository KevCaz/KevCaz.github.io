---
title: "Sent your R package to package builder via devtools"
date: 2019-05-23
tags: [R, devtools, package development, builders, continuous integration]
---

As I was sending a minor patch to [rcites](https://github.com/ropensci/rcites),
I use `devtools::build_win()` and got the following warning message:

```
Warning message:
'devtools::build_win' is deprecated.
```

And the message suggested to check out `check_win_*`, and I so did a quick
check:


```R
R> devtools::check
```

once `tab` typed, the following function names were prompted:

```R
devtools::check_built           devtools::check_cran            devtools::check_win_oldrelease
devtools::check_man             devtools::check                 devtools::check_win_release
devtools::check_win_devel       devtools::check_dep_version
devtools::check_failures        devtools::check_rhub
```

We now have access to [rhub](https://builder.r-hub.io/) via
[devtools](https://cran.r-project.org/web/packages/devtools/index.html), that's
neat :fireworks:! I knew it'd happen at some point, but did not know it was
already availabl!, everything is going very fast, am I the only one struggling
to keep up?
