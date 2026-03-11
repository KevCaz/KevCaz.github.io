---
title: rmangal is back on the CRAN
date: 2026-02-07
tags: [R, R package, rmangal]
---

At last, after substantial efforts, [rmangal](https://docs.ropensci.org/rmangal/) made it back to the [CRAN](https://cran.r-project.org/web/packages/rmangal/index.html) on January 21, 2026. Below, I gathered a few notes about this important update.  


## `rmangal` was archived 

In March 2024, `rmangal` was archived. A few days before, I received this message from the CRAN team:

> Dear maintainer,
> 
> Please see the problems shown on  https://cran.r-project.org/web/checks/check_results_rmangal.html.
> 
> Please correct before 2024-03-01 to safely retain your package on CRAN.
> 
> It seems we need to remind you of the CRAN policy:
> 
> 'Packages which use Internet resources should fail gracefully with an informative message if the resource is not available or has changed (and not give a check warning nor error).'
> 
> This needs correction whether or not the resource recovers.
> 
> The CRAN Team

Fair, `rmangal` was not failing gracefully in such cases. Instead, errors were thrown that were not explicit relative to the actual root cause of the error. 
What puzzled me when I received this message was the reason why the problem surfaced then, given that the package has been hosted on the CRAN for months.

I guess I will never know.

At the time I did not have the willpower to address the problem, plus the package was easily available on GitHub. And so I did not fix the issue, thus the package was archived!


## httr2 

When I started to work again on `rmangal`, I decided to do more than fixing the issue raised by the CRAN team: I switched the core of the package from [`httr`](https://httr.r-lib.org/) to [`httr2`](https://httr2.r-lib.org/). This may go unnoticed for most users, but this represents a considerable improvement in the underlying code structure.

First, it made the fix of the actual problem easy. Indeed, for HTTP errors (status codes 4xx/5xx) and connection failures, the response of a request inherits the class `httr2_failure`. A simple call to `tryCatch()` and the package now fails gracefully! 

The usage of `httr2` was also a major improvement for data retrieval on multiple pages. With `httr` I did the code to get them all.  With `httr2`, [`req_perform_iterative()`](https://httr2.r-lib.org/reference/req_perform_iterative.html) handles this, which streamlines the code.

Another `httr2` feature that was leveraged for the update is the [caching of the requests](https://httr2.r-lib.org/reference/req_cache.html). Again, this clarifies the code and it allows us to drop [`memoise`](https://github.com/r-lib/memoise) from the dependencies list.

More generally, this major code refactoring was a good opportunity to strengthen the internals of the package and even fix one [old issue](https://github.com/ropensci/rmangal/issues/113). See the PR [#117](https://github.com/ropensci/rmangal/pull/117) for more details. Big thanks to [Benjamin Mercier](https://github.com/BenMerSci) for reviewing my PR.


## Improved package verbosity

For a good user experience with a package, a good amount of clear messages is required. Plus, to avoid annoying advanced users with too many messages, a certain control on the amount is needed. For the new update I improved the verbosity of `rmangal`. 

To create styled messages, `rmangal` leverages the fantastic [`cli`](https://github.com/r-lib/cli/issues) package. And to give some control on the amount of information provided, I follow the recommendation of the rOpenSci blog post ['Please Shut Up! Verbosity Control in Packages'](https://ropensci.org/blog/2024/02/06/verbosity-control-packages/). 

Now to quiet all `rmangal` functions, users can use

```r
options(rmangal.verbose = "quiet")
```

and to switch on the verbosity they would do:

```r
options(rmangal.verbose = "verbose")
```

See issue [#116](https://github.com/ropensci/rmangal/issues/116) for more details.



## Stricter rules on CRAN?

After my work on `rmangal`, I submitted my package to the CRAN, my submission was automatically rejected because [`vcr`](https://docs.ropensci.org/vcr/) was in the 'Suggest', but was required for the tests to pass (the `noSuggests` check). According to the CRAN team, this meant that the package should be added to the 'Import' list.


I was surprised, `vcr` has always been in the 'Suggest' list for my first successful submissions a few years ago and many packages list it as 'Suggest' and use it in tests, including my own package [rcites](https://cran.r-project.org/web/packages/rcites/index.html). 
But it looks like that the CRAN now runs a new `noSuggests` check, with `_R_CHECK_DEPENDS_ONLY_=true` ([see this thread](https://stackoverflow.com/questions/79067855/r-cmd-check-cannot-find-packages-during-package-build-with-r-check-depends-only) on Stackoverflow), which explains the problem. 

To resolve the problem, I used [`skip_if_not_installed()`](https://testthat.r-lib.org/articles/skipping.html), to skip all tests that call `vcr`. On the bright side, `testthat 3.3.0` [automatically skips tests](https://tidyverse.org/blog/2025/11/testthat-3-3-0/) if packages are not installed. 