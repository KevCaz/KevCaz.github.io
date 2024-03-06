---
title: "R-3.6.1 on Ubuntu Bionic"
date: 2019-09-11
tags: [R, Ubuntu, back-port]
---

As detailed in [this post](/notes/hardware/macosubuntu/), I recently installed
Ubuntu on my old MacBookPro (assuming a MacBookPro from mid-2012 is old
:smirk:). In order to run some simulations I needed to install the latest
version of R. I first followed [the procedure to install the latest R on
Debian](/notes/r/r3_6_0onbuster/) before realizing that the backport for Ubuntu
are different :grin:! So if you are on Ubuntu, the correct link to install the
latest R is [here](https://cran.r-project.org/bin/linux/ubuntu/README.html). 
The 3-steps-procedure is pretty straight forward:


1. add


```sh
deb https://cloud.r-project.org/bin/linux/ubuntu bionic-cran35
```

2. add the key used to sign the archives on CRAN:


```sh
$ apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
```

3. install R

```sh
$ apt-get update
$ apt-get install r-base
```

That's all folks!