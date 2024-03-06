---
title: "`sf` is fast"
date: 2018-11-09
tags: [R, sf, GIS]
---

[`sf`](https://cran.r-project.org/web/packages/sf/index.html) have become the
new standard to read, manipulate, write vector files in R. I recently had
a 1.6GB shapefiles that I needed to open

```sh
$ du geodata/*
717M    geodata/OHN_WATERBODY.dbf
4.0K    geodata/OHN_WATERBODY.prj
1.6G    geodata/OHN_WATERBODY.shp
11M     geodata/OHN_WATERBODY.shx
```


and I was wondering about how much time it would take for `sf` to open it, and
it was pretty fast :rocket:


```R
R> system.time(
+... wat_all <- st_read("geodata/OHN_WATERBODY.shp")
+... )
Reading layer `OHN_WATERBODY' from data source `/home/kevcaz/Github/Studies/streamFish/geodata/OHN_WATERBODY.shp' us
ing driver `ESRI Shapefile'
Simple feature collection with 1324960 features and 13 fields
geometry type:  MULTIPOLYGON
dimension:      XY
bbox:           xmin: -97.3913 ymin: 41.67656 xmax: -74.30778 ymax: 57.00001
epsg (SRID):    4269
proj4string:    +proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs
   user  system elapsed
 35.986   2.081  38.072
```

once loaded filtering and manipulation are very as well, so `sf` :arrow_right: :trophy: :+1:.
