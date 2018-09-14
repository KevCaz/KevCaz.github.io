---
title: "Find the right Coordintes reference system"
date: 2018-09-20
tags: [R, GIS, CRS]
---

For spatial objects manipulation and spatial analyses, I mainly use R, meaning
I use R packages that turn R into a powerful Geographoic Information System.
Before 2017, I was using [sp], [rgdal], [rgeos] for vector objects and [raster]
for raster objects. Well since the developement of sp successor, [sf](),
I use sf and (plus mapview to get quick map).

One of the most important manipulation is the transformation as you cannot
manipulate two objects is differente CRS. A previous was to use
[proj4](https://proj4.org/) and use string specific thta was us in CRS
argument of sp object.

Now with sf, you can still to so but you can also use the code defined
by the [European Petroleum Survey Group]()

So instead of

"NAD 83 +proj=utm +zone=17 +ellps=GRS80 +datum=NAD83 +units=m +no_defs
"
EPSG:26917



"+proj=utm +zone=17 +datum=NAD27 +units=m +no_defs "


https://epsg.io/ is a search engine to find them  "Ontario NAD27 UTM",
then find what you need https://epsg.io/26717 and exprt in any format you ndeed.

extremely helpful
