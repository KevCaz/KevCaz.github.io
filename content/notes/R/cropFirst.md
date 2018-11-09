---
title: "Clip, but crop first!"
date: 2018-11-10
tags: [R, sf, raster, GIS]
---

I often clip raster in R, with [sf](https://cran.r-project.org/web/packages/sf/index.html)
and [raster](https://cran.r-project.org/web/packages/raster/index.html) it
is straightforward and efficient. That said, I'd like to mention one tip
tip R users that clip should be aware of: cropping before clipping.
It does significantly improve the performance, as shown in the R script below:

```R
library(sf)
library(raster)
library(tidyverse)

## download Canada boundaries (level of the county)
ont <- getData("GADM", country = "CAN", level = 2) %>%
  st_as_sf %>% filter(NAME_1 == "Ontario")
## Download elevation raster (NB resolution is coarse)
can_elv <- getData("alt", country = "CAN")


R> system.time(
+... ont_elv <- rasterize(ont, can_elv, mask = TRUE)
+... )
    user  system elapsed
  69.938  87.836 157.786
R> system.time(
+... ont_elv <- rasterize(ont, crop(can_elv, ont), mask = TRUE)
+... )
   user  system elapsed
  7.584   3.820  11.406
```
