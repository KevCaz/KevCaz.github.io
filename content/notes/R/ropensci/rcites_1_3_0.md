---
title: rcites 1.3.0
date: 2023-02-19
tags: [R, R package, rcites]
---

`rcites` 1.3.0 is now available on CRAN :tada:. This was mainly a maintenance release following up on a recent issue in vcr (see [*Overview of fixes for upcoming v1.2*](https://github.com/ropensci/vcr/issues/255)) but I also took the opportunity to improve the `set_token()` function. Now the user has up to five attempts to set up the token when `set_token()` is called, after that error is triggered (previously the error was triggered after the first failed attempt).

```R
# 5 attempts max 
R> set_token()
! No token has been provided yet.

Enter your token without quotes:
! No token has been provided yet.
Enter your token without quotes:
! No token has been provided yet.
Enter your token without quotes:
! No token has been provided yet.
Enter your token without quotes:
! No token has been provided yet.
Enter your token without quotes:
Error in set_token() : Token still not set after 5 attempts.

# Setting the token
R> set_token()
! No token has been provided yet.

Enter your token without quotes: 92bs29b839bs
✔ Token stored for the session.
```

This change made the submission to CRAN harder because I had examples within the tag `\donttest` that were using `set_token()` and the package is actually tested with the `--run-donttest` tag. The worst problem was an infinite while loop in an early version of the code :scream:. Lesson learned, some examples must be put within the `\dontrun` tag and before submitting to CRAN, it is worth testing your package with the `--run-donttest` tag, in my case, all I had to do was:

```R
R CMD build rcites
R CMD check --as-cran --run-donttest rcites_1.3.0.tar.gz 
```
