---
title: Joining a list of data frames with `Reduce()`
date: 2026-02-11
tags:
  - R
  - join
  - Reduce
---


Last week, I was working on an R script in which I generated a list of data
frames and was looking for a way to join them quickly. I thought I would be able to leverage `do.call()` but I found this thread on [StackOverflow](https://stackoverflow.com/questions/66360589/how-to-recursively-join-nested-lists-that-share-one-column-name-in-r) that suggested using `Reduce()` to do that and it worked very well.

`Reduce()` is one of the *"Common Higher-Order Functions in Functional Programming Languages"*, a set of functions that are more advanced, maybe not super friendly to use at first, but very powerful!

> 'Reduce' uses a binary function to successively combine the
> elements of a given vector and a possibly given initial value

Here is a simple example, a simplified version of what I was working on:

``` r
vrbl <- c("pH", "salinity", "temperature")
site <- paste0("site", 1:6)

ls_df <- vrbl |> lapply(\(x) {
    out <- data.frame(site = site)
    out[[x]] <- runif(6)
    out
})
ls_df
```

    [[1]]
       site         pH
    1 site1 0.40696251
    2 site2 0.09590183
    3 site3 0.68285947
    4 site4 0.46012124
    5 site5 0.92826767
    6 site6 0.94730994

    [[2]]
       site   salinity
    1 site1 0.93431986
    2 site2 0.75389578
    3 site3 0.89646509
    4 site4 0.31757034
    5 site5 0.84771590
    6 site6 0.03696824

    [[3]]
       site temperature
    1 site1  0.95577654
    2 site2  0.06747292
    3 site3  0.49588110
    4 site4  0.03272121
    5 site5  0.76317572
    6 site6  0.33745719

Note that I often work with lists and `lapply()`, this is very powerful and
here it is again: to do the join of all data frames, I call `Reduce()` and `inner_join()`
(from `dplyr`) to do the join:

``` r
ls_df |> Reduce(f = dplyr::inner_join)
```

    Joining with `by = join_by(site)`
    Joining with `by = join_by(site)`

       site         pH   salinity temperature
    1 site1 0.40696251 0.93431986  0.95577654
    2 site2 0.09590183 0.75389578  0.06747292
    3 site3 0.68285947 0.89646509  0.49588110
    4 site4 0.46012124 0.31757034  0.03272121
    5 site5 0.92826767 0.84771590  0.76317572
    6 site6 0.94730994 0.03696824  0.33745719

Done, I love this!

<details>
<summary>
Session Information
</summary>

``` r
sessionInfo()
```

    R version 4.5.1 (2025-06-13)
    Platform: x86_64-pc-linux-gnu
    Running under: Ubuntu 25.10

    Matrix products: default
    BLAS:   /usr/lib/x86_64-linux-gnu/blas/libblas.so.3.12.1 
    LAPACK: /usr/lib/x86_64-linux-gnu/lapack/liblapack.so.3.12.1;  LAPACK version 3.12.0

    locale:
     [1] LC_CTYPE=en_US.UTF-8       LC_NUMERIC=C              
     [3] LC_TIME=en_US.UTF-8        LC_COLLATE=en_US.UTF-8    
     [5] LC_MONETARY=en_US.UTF-8    LC_MESSAGES=en_US.UTF-8   
     [7] LC_PAPER=en_US.UTF-8       LC_NAME=C                 
     [9] LC_ADDRESS=C               LC_TELEPHONE=C            
    [11] LC_MEASUREMENT=en_US.UTF-8 LC_IDENTIFICATION=C       

    time zone: America/Toronto
    tzcode source: system (glibc)

    attached base packages:
    [1] stats     graphics  grDevices utils     datasets  methods   base     

    loaded via a namespace (and not attached):
     [1] vctrs_0.7.1         cli_3.6.5           knitr_1.51         
     [4] rlang_1.1.7         xfun_0.56           otel_0.2.0         
     [7] processx_3.8.6      targets_1.11.4      generics_0.1.4     
    [10] jsonlite_2.0.0      data.table_1.18.2.1 glue_1.8.0         
    [13] prettyunits_1.2.0   backports_1.5.0     htmltools_0.5.9    
    [16] ps_1.9.1            rmarkdown_2.30      evaluate_1.0.5     
    [19] tibble_3.3.1        fastmap_1.2.0       base64url_1.4      
    [22] yaml_2.3.12         lifecycle_1.0.5     compiler_4.5.1     
    [25] dplyr_1.2.0         codetools_0.2-20    igraph_2.1.4       
    [28] pkgconfig_2.0.3     digest_0.6.39       R6_2.6.1           
    [31] tidyselect_1.2.1    pillar_1.11.1       callr_3.7.6        
    [34] magrittr_2.0.4      tools_4.5.1         secretbase_1.2.0   

</details>
