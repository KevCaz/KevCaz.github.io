---
title: "Exceeding GitHub API rate limits?"
date: 2018-11-13
tags: [Github, API, limit]
---

Yesterday, while [Travis was testing rcites](https://travis-ci.org/ibartomeus/rcites)
I got this error message for the 3 jobs:

```sh
Error: HTTP error 403.
  API rate limit exceeded for 104.154.255.220. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)
  Rate limit remaining: 0/60
  Rate limit reset at: 2018-11-12 23:24:16 UTC
  To increase your GitHub API rate limit
  - Use `usethis::browse_github_pat()` to create a Personal Access Token.
  - Add `GITHUB_PAT` to your travis settings as an encrypted variable.
Execution halted
The command "Rscript -e 'devtools::install_github(c("r-lib/covr"), build_vignettes = FALSE)'" failed and exited with 1 during .
```

I was very surprise because:

1. it was the first time I got this message;

2. I doubt my activity [exceeds the rate limits](https://developer.github.com/v3/#rate-limiting).


Anyway, I found a few references to this issue, [here](https://github.com/forestgeo/learn/issues/148) and [there](http://johnmuschelli.com/neuroc/getting_ready_for_submission/index.html)
and I resigned myself to do what the error message suggested, i.e. create a token
that [`usethis`](https://github.com/r-lib/usethis) looked for when you build
your R package on Travis. It worked, I restarted the build jobs and thew were
successfully completed, but I still do not fully understand what happened :disappointed:.
