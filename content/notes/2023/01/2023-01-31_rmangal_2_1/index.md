---
title: rmangal 2.1.2
date: 2023-01-31
tags: [R, R package, rmangal]
---

A new release of rmangal is now [available on CRAN](https://CRAN.R-project.org/package=rmangal). Following up on a recent issue in vcr (see ['
Overview of fixes for upcoming v1.2'](https://github.com/ropensci/vcr/issues/255) for more details), I decided to have fixtures written in JSON rather than in YAML, the change was pretty straightforward

```R
# see tests/testthat/setup-rmangal.R 
# in https://github.com/ropensci/rmangal/commit/9a2293d75b8af7f4b856e024dc8760f97d349e50#diff-ab9aa624c8da203a8b11856c8203c5de205fa4cabceb048838c965106a3d406f
vcr::vcr_configure(
    dir = "../fixtures",
    write_disk_path = "../files",
    serialize_with = "json"
)
```

instead of

```R
vcr::vcr_configure(
    dir = "../fixtures",
    write_disk_path = "../files",
    # 'yaml' is (was?) the default value
)
```

I'd like to add that this CRAN release was seamless, it made CRAN quickly after the first submission!