---
title: R packages rmangal and rcites updated on CRAN 
date: 2021-11-25
tags: [R, R package, rmangal, rcites, unit testing]
---

Over the past few weeks, I took some time to review the unit tests for [`rmangal`](https://CRAN.R-project.org/package=rmangal) and [`rcites`](https://CRAN.R-project.org/package=rcites). Both packages are R clients for web APIs: 

* `rmangal` allows users to search ecological interactions available in the [Mangal](https://mangal.io/#/) database;
* `rcites` allows users to query the Species+ database by leveraging the [Speciesplus/CITES Checklist API](https://api.speciesplus.net/documentation/v1.html).

One of the main challenges with such packages is to not get archived on CRAN :scream:! `rmangal` was actually archived a year ago for policy violation on internet access, and so one of my main goals was to get it back on CRAN. I was relatively aware of ways to avoid using the Internet on CRAN as I had already used [`vcr`](https://CRAN.R-project.org/package=vcr) for a small project, but I clearly needed to learn more to use it efficiently. Fortunately, [Maëlle Salmon](https://masalmon.eu/) had been working on a very useful book on the topic, [*HTTP testing in R*](https://books.ropensci.org/http-testing/), that has a lot of valuable advice that helped me design my tests with [`vcr`](https://CRAN.R-project.org/package=vcr)! 

Below is a code chunk that exemplifies how I proceeded

```R
tx_id <- 4521
test_that("spp_cites_legislation() scope & language works", {
  vcr::use_cassette("spp_cites_legislation_sco", {
    res <- spp_cites_legislation(taxon_id = tx_id, scope = 'all', 
      language = 'fr', verbose = FALSE)
  })  
  expect_s3_class(res, "spp_cites_leg")
  expect_true(!all(res$cites_listings$is_current))
  expect_true("Guinée" %in% res$cites_suspensions$geo_entity.name)
})
```

Basically, I created blocs of tests (initiated by `test_that()`) around one request. Every request (or sometimes, a couple of requests) had its own cassette (`vcr::use_cassette()`) followed by the tests associated (`expect_*(...)`). In the example above, I do one request to access CITES appendix listings and reservations for the taxon `4521`, which actually is the African bush elephant (*Loxodonta africana*). Then I test whether I get the right class (line 7) and whether the output has some expected features given the parameters I passed to `spp_cites_legislation()`. Specifically, I know that all entries of `$cites_listings$is_current` aren't true because `scope` (time scope of legislation) is set to `all` so I test this (line 8). Also, given that I selected `fr` as language, I know that "Guinée" should be part of the geographical entities `$cites_suspensions$geo_entity.name` (Guinea with the French spelling), thus the line 9. If you want to see more, the unit tests for `rmangal` are available on GitHub (<https://github.com/ropensci/rmangal/tree/main/tests>) and so are the tests for `rcites` (<https://github.com/ropensci/rcites/tree/main/tests>).


Reviewing my unit tests was also an opportunity to learn a bit more about tests in general. Notably, I found out that I wasn't testing the classes the right way! Wanna know why? Check out Martin Maechler's blog post [*When you think `class(.) == *`, think again!*](https://developer.r-project.org/Blog/public/2019/11/09/when-you-think-class.-think-again/). Now I use the dedicated function `expect_s3_class()`, which by the way has an `exact` parameter that I should have used! I probably will use it in future releases. I've also learned some features of [testthat 3.0.0](https://testthat.r-lib.org/articles/third-edition.html), especially the [snapshot testing](https://testthat.r-lib.org/reference/expect_snapshot.html) that is very useful to test messages! That's another good learning.


That's all folks! 

