---
title: "The number of dependencies"
date: 2018-11-16
tags: [R, packages, dependencies]
---

I was looking at some issues on GitHub when I found [this example provided by Dirk Eddelbuettel](https://github.com/RcppCore/RcppEigen/issues/62#issuecomment-438830002)
to evaluate the number of species of a dependencies of a package. I decided to
experiment a little bit `package_dependencies()`.

```R
R> library(tools)
R> ap <- available.packages()
R> nrow(ap) # nb available package
[1] 13385
```

Retrieve the packages [`rcites`](https://github.com/ropensci/rcites) depends on:

```R
R> rc <- tools::package_dependencies("rcites", ap, "Imports")
R> rc
$rcites
[1] "httr"       "jsonlite"   "data.table" "methods"
```

The number of packages that depend or import [`Rcpp`](https://cran.r-project.org/web/packages/Rcpp/index.html):

```R
R> rc <- package_dependencies("Rcpp", ap, reverse = TRUE) %>% unlist %>% length
R> rc
$rcites
[1] "httr"       "jsonlite"   "data.table" "methods"
```
https://twitter.com/eddelbuettel/status/1063051483661381633

```R
R> rc <- package_dependencies("Rcpp", ap, reverse = TRUE) %>% unlist %>% length
R> rc
[1] 1503
```

Yep, >1500! Dirk Eddelbuettel mentioned this recently:

{{< twitter user="eddelbuettel" id="1063051483661381633" >}}


A last example, the full list of packages
[`rcites`](https://github.com/ropensci/rcites) depends on (including the
dependencies of the dependencies):

```R
R> rcf <- tools::package_dependencies("rcites", ap, recursive = TRUE)
R> rcf
$rcites
[1] "httr"       "jsonlite"   "data.table" "methods"    "mime"       
[6] "curl"       "openssl"    "R6"         "tools"
```
