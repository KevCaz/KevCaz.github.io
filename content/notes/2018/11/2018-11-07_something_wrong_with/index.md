---
title: "Something wrong with rgeos 0.4-1?"
date: 2018-11-07
tags: [R, rgeos, R package, GIS]
---

The last update of [rgeos (version 0.4-1)](https://cran.r-project.org/web/packages/rgeos/index.html)
was released on October 19th, 2018 and with my current R set up:

```R
R> sessionInfo()
R version 3.5.1 (2018-07-02)
Platform: x86_64-pc-linux-gnu (64-bit)
Running under: Debian GNU/Linux buster/sid
```

I got the following error:

```R
checking geos_c.h  presence and usability... yes
checking geos: linking with libgeos_c... no
/usr/bin/ld: cannot find -lgeos
collect2: error: ld returned 1 exit status
configure: Install failure: compilation and/or linkage problems.
configure: error: initGEOS_r not found in libgeos_c.
ERROR: configuration failed for package ‘rgeos’
* removing ‘/home/kevcaz/R/x86_64-pc-linux-gnu-library/3.5/rgeos’
```

My version of `libgeos-dev` is 3.7.0-1 and I think I had this before
the update of the R package. I tried to find a way to fix this and found this
[answer on <i class="fa fa-stack-overflow" aria-hidden="true"></i>](https://stackoverflow.com/questions/52922060/rgeos-package-installation-error-on-linux-google-compute-instance-r) claiming that it is a bug. The build indeed fails for [r-release-linux-x86_64](https://cran.r-project.org/web/checks/check_results_rgeos.html)
but there is no more details... So, as recommended in the answer, I downgraded
to version 0.3-28:

```
library(devtools)
install_version("rgeos", version = "0.3-28")
```

Hopefully this will be fixed soon!
