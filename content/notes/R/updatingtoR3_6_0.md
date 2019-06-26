---
title: "Upgrading to R.3.6.0 on Debian Buster"
date: 2019-06-25
tags: [Debian, apt-get, R]
---

Since March of this year, [Buster (Debian 10) is now frozen and is the new
Debian stable](https://release.debian.org/buster/freeze_policy.html) and for
this reason the installation of [R 3.6.0 is
available](https://stat.ethz.ch/pipermail/r-announce/2019/000641.html),
(available since April 26th) on Buster requires [the backports kindly provided
by Johannes Ranke](https://cran.r-project.org/bin/linux/debian/), and so I used
them, which means:

1. I appended `deb http://cran.wu.ac.at/bin/linux/debian buster-cran35/` to `/etc/apt/sources.list`;
2. I added the key to configure the secure apt.

In order to do a fresh install, I first removed all the files releated to R.3.5.2, which basically means I opened a terminal and entered:

```
# apt-get --purge remove r-base r-base-dev r-base-core
```

Then, I installed the new version

```
# apt-get update
# apt-get install r-base r-base-dev r-base-core
```

R 3.6.0 was installed and ready to do stats :white_check_mark:. Before installing my list of packages I took two extra steps. I configured [Java](https://www.oracle.com/java/) for R (because some packages need it).

```
# R CMD javareconf JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
```

And I edited `Renviron.site`. For Debian-based linux distributions, R 3.6.0 is now shipped with a  `Renviron.site` file that includes the following line:

```
 _R_CHECK_COMPILATION_FLAGS_KNOWN_='-Wformat -Werror=format-security -Wdate-time'
```

which avoids [a note when checking a package](https://stat.ethz.ch/pipermail/r-sig-debian/2019-May/003081.html). I edited this file to add back my default packages and the token I used for [rcites](https://github.com/ropensci/rcites):

```
R_DEFAULT_PACKAGES='utils,datasets,grDevices,graphics,stats,methods,devtools'

# TOKENS
SPECIESPLUS_TOKEN='cannot_reveal_iit'
```

Note that if I would have open R at this stage it would have complained about unistalled packahes :wink:.

<br>

Then, I installed the set of :package: I employ the most. In the past, I have used `sudo apt-get install "r-cran-.*"` but I decided not to this time. First, because I do not use all of them. Second, because I found some conflicts. For instance, I was not able to install both `r-cran-rmarkdown` and `r-cran-v8`: the latter requires `libnode64` while the former requires `nodejs` which are not compatible and so if I try to install `r-cran-rmarkdown` while `r-cran-v8` is installed, I get:

```
The following packages will be REMOVED:
  libnode64
```

so I decided to cherry-pick the packages to be installed with `apt-get` and here is my list of packages (Note that it triggers the installation of a longer list):

```
# apt-get install r-cran-v8
# apt-get install "r-cran-rcpp.*" r-cran-reticulate r-cran-rjava r-cran-devtools r-cran-doparallel r-cran-sf r-cran-lwgeom r-cran-lme4 r-cran-ade4 r-cran-ape r-cran-vegan r-cran-rgl r-cran-webshot r-cran-cli r-cran-pillar r-cran-taxize r-cran-repr r-cran-reprex r-cran-biocmanager
```

By the way, if you are looking for specific package with `apt-get`, you can use `apt search "r-cran-"` for CRAN packages, and `apt search "r-bioc-"` for Bioconductor ones. Afterwards, I opened R and checked the paths to library:

```R
R> .libPaths()
[1] "/usr/local/lib/R/site-library" "/usr/lib/R/site-library"      
[3] "/usr/lib/R/library"
```

So what we should remind is that:

- `/usr/lib/R/library` includes all the core and recommended packages.
- `/usr/lib/R/site-library` includes the packages installed via `apt-get`

I decided to use `/usr/local/lib/R/site-library` to store packages installed via `install.packages()`. To do so, I simply chnage the permission to make this folder writable by myself without using super user privileges: `sudo chmod 777 /usr/local/lib/R/site-library`. Then I completed the installation:

```R
install.packages(c('docopt', 'tidyverse', 'pkgdown', 'blogdown', 'Hmisc', 'IRkernel'))
```

This way, I do not need to use a [user library](https://community.rstudio.com/t/help-regarding-package-installation-renviron-rprofile-r-libs-r-libs-site-and-r-libs-user-oh-my/13888/5) which I don't really need as I am the only user of my computer :sweat_smile:.

<br>

To conclude this post, I'd like to show the list of packagea included in the 3 different folders:


```R
R> pkgs <- lapply(.libPaths(), list.files)
R> pkgs
[[1]]
 [1] "acepack"      "assertthat"   "BH"           "blogdown"     "bookdown"    
 [6] "broom"        "cellranger"   "checkmate"    "dbplyr"       "dplyr"       
[11] "ellipsis"     "forcats"      "Formula"      "generics"     "glue"        
[16] "gridExtra"    "haven"        "highlight"    "Hmisc"        "htmlTable"   
[21] "IRdisplay"    "IRkernel"     "knitr"        "latticeExtra" "modelr"      
[26] "packrat"      "pbdZMQ"       "pkgdown"      "plogr"        "Rcpp"        
[31] "RCurl"        "readr"        "readxl"       "rematch"      "rematch2"    
[36] "rlang"        "rmarkdown"    "rsconnect"    "rvest"        "servr"       
[41] "tibble"       "tidyr"        "tidyverse"    "tinytex"      "uuid"        
[46] "viridis"      "xfun"        

[[2]]
  [1] "abind"            "ade4"             "ape"              "askpass"         
  [5] "assertthat"       "backports"        "base64enc"        "bindr"           
  [9] "bindrcpp"         "bit"              "bit64"            "bitops"          
 [13] "blob"             "bold"             "brew"             "callr"           
 [17] "classInt"         "cli"              "cliapp"           "clipr"           
 [21] "clisymbols"       "colorspace"       "commonmark"       "crayon"          
 [25] "crosstalk"        "crul"             "curl"             "data.table"      
 [29] "DBI"              "DBItest"          "desc"             "devtools"        
 [33] "digest"           "doMC"             "dplyr"            "e1071"           
 [37] "evaluate"         "fansi"            "fauxpas"          "filehash"        
 [41] "foreach"          "fs"               "ggplot2"          "gh"              
 [45] "git2r"            "glue"             "gtable"           "hexbin"          
 [49] "highr"            "hms"              "htmltools"        "htmlwidgets"     
 [53] "httpcode"         "httpuv"           "httr"             "ini"             
 [57] "iterators"        "jsonlite"         "knitr"            "labeling"        
 [61] "later"            "lazyeval"         "littler"          "lme4"            
 [65] "lubridate"        "lwgeom"           "magrittr"         "manipulateWidget"
 [69] "mapproj"          "maps"             "markdown"         "memoise"         
 [73] "mime"             "miniUI"           "minqa"            "mockery"         
 [77] "mockr"            "multicore"        "munsell"          "natserv"         
 [81] "nloptr"           "openssl"          "permute"          "pillar"          
 [85] "pkgbuild"         "pkgconfig"        "pkgKitten"        "pkgload"         
 [89] "plyr"             "png"              "praise"           "prettycode"      
 [93] "prettyunits"      "processx"         "progress"         "promises"        
 [97] "ps"               "purrr"            "R6"               "rcmdcheck"       
[101] "RColorBrewer"     "Rcpp"             "RcppAnnoy"        "RcppArmadillo"   
[105] "RcppEigen"        "RcppGSL"          "RcppProgress"     "RcppRoll"        
[109] "remotes"          "rentrez"          "repr"             "reprex"          
[113] "reshape"          "reshape2"         "reticulate"       "rgl"             
[117] "ritis"            "rJava"            "rlang"            "rmarkdown"       
[121] "rncl"             "rotl"             "roxygen2"         "rprojroot"       
[125] "rredlist"         "RSQLite"          "rstudioapi"       "RUnit"           
[129] "scales"           "selectr"          "sessioninfo"      "sf"              
[133] "shiny"            "solrium"          "sourcetools"      "sp"              
[137] "stringi"          "stringr"          "sys"              "taxize"          
[141] "testit"           "testthat"         "tibble"           "tidyselect"      
[145] "tikzDevice"       "tinytex"          "triebeard"        "units"           
[149] "urltools"         "usethis"          "utf8"             "vcr"             
[153] "vegan"            "viridisLite"      "webmockr"         "webshot"         
[157] "webutils"         "whisker"          "WikidataR"        "WikipediR"       
[161] "wikitaxa"         "withr"            "worrms"           "xfun"            
[165] "XML"              "xml2"             "xopen"            "xtable"          
[169] "yaml"             "zoo"             

[[3]]
 [1] "base"         "boot"         "class"        "cluster"      "codetools"   
 [6] "compiler"     "datasets"     "foreign"      "graphics"     "grDevices"   
[11] "grid"         "KernSmooth"   "lattice"      "MASS"         "Matrix"      
[16] "methods"      "mgcv"         "nlme"         "nnet"         "parallel"    
[21] "rpart"        "spatial"      "splines"      "stats"        "stats4"      
[26] "survival"     "tcltk"        "tools"        "translations" "utils"

```

As you may have spotted, some packages are installed in both `/usr/local/lib/R/site-library` and in `/usr/lib/R/site-library`

```R
R> pkgs[[1]][pkgs[[1]] %in% pkgs[[2]]]

[1] "assertthat" "dplyr"      "glue"       "knitr"      "Rcpp"       "rlang"     
 [7] "rmarkdown"  "tibble"     "tinytex"    "xfun"
```

and R uses the one from `/usr/local/lib/R/site-library`

```R
R> find.package("assertthat")
[1] "/usr/local/lib/R/site-library/assertthat"
```

Why? I don't know yet! But I sure will let you know when I understand this!
