---
title: "Find the Coordinate Reference System (CRS) you need"
date: 2018-11-20
tags: [R, GIS, CRS]
---

For the manipulation of spatial objects and spatial analyses, I mainly use R,
meaning that I use R packages that turn R into a powerful Geographic Information
System (GIS). Before 2017, I was using [sp](https://cran.r-project.org/web/packages/sp),
[rgdal](https://cran.r-project.org/web/packages/rgdal), [rgeos](https://cran.r-project.org/web/packages/rgeos) for vector objects and [raster](https://cran.r-project.org/web/packages/raster)
for raster objects. Now I use a combination of [sf](https://cran.r-project.org/web/packages/sf)
(created to replace sp, rgoes and rgdal), raster and sf and [mapview](https://cran.r-project.org/web/packages/mapview).

One of the most common manipulation is to convert coordinates
(see `sf::st_transform()` in `raster::projectRaster()`). With my previous
set up one one of the main difficulty was to find the right [proj4](https://proj4.org/) string,
For instance, to use [UTM](https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system) for the zone 17N, with **rgdal** I used to write:

```R
rgdal::spTransform(
  mysp,
  CRS("NAD 83 +proj=utm +zone=17 +ellps=GRS80 +datum=NAD83 +units=m +no_defs")
)
```

Now **sf** makes things way easier with the use the code defined by the
[European Petroleum Survey Group](http://www.epsg.org/). So now I write:


```R
st_transform(mysf, crs = 26917)
```

Pretty neat! Also, I'd like to mention https://epsg.io/ that makes the search of
a specific projection very efficient. For instance, if you search for
"Ontario NAD27 UTM", you'll end up on https://epsg.io/26717, extremely helpful!
