---
title: "rgeos v0.4-2"
date: 2019-02-02
tags: [R, rgeos]
---


As explained in a [previous note](/notes/r/rgeos), a few weeks ago I was not able to install [`rgeos`](https://cran.r-project.org/web/packages/rgeos/index.html) version 0.4-1. I ran into a new issue today and I decided to figure out what was wrong with it. After a quick search, I found [this answer on <i class="fa fa-stack-overflow" aria-hidden="true"></i>](
https://stackoverflow.com/questions/53042751/when-trying-to-install-rgeos-r-cannot-find-lgeos) and it turned out that all I needed was to install [libgeos++-dev](https://packages.debian.org/sid/libgeos++-dev) and so I did:

```
sudo apt install libgeos++-dev
```

After that the command:

```
Rscript -e "install.packages('rgeos')"
```

worked like a charm! I guess this is mentioned somewhere in the doc, I obviously missed something (as far as I understand, `libgeos++-dev` was not required before version v0.4-x, only `libgeos-dev`). Anyway, once again, thanks to the <i class="fa fa-stack-overflow" aria-hidden="true"></i> users!
