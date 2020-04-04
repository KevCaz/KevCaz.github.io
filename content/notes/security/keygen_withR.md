---
title: Generate a ssh key with R
date: 2020-04-04
tags: [keygen, ssh, R, continuous integration, GitHub pages]
---

I now frequently use [GitHub actions](https://github.com/features/actions) to
deploy websites on gh-pages. One way to do so requires to use a [ssh
key](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)
(the full procedure is well explained, *inter alia*, in the README of
[peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)). As
I am used to work with the Terminal, when I need such a key, I use the following
command line:


```sh
$ ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
```

which generates two files:

1. gh-pages.pub
2. gh-pages that contains the private one.


For some reasons, I was interested in replicating this behavior with <i class="fab
fa-r-project"></i>. Fortunately, the package
[openssl](https://CRAN.R-project.org/package=openssl) includes `rsa_keygen()`
and `write_pem()` that makes this super easy:

```R
library(openssl)
# 1. generate the pair of keys
key <- rsa_keygen(4096)
# 2. write the public key with my email in ""gh-pages.pub"
cat(paste0(key$pubkey$ssh, "kcazelle@uoguelph.ca") , file = "gh-pages.pub")
# 3. write the private key
cat(write_pem(key), file = "gh-pages")
```

So now, I can gather this step in a handy function that I can append to  `.Rprofile`!

```R
gen_key <- function(bits = 4096, email = "kcazelle@uoguelph.ca", file = "gh-pages") {
  key <- openssl::rsa_keygen(bits)
  cat(paste(key$pubkey$ssh, email), file = paste0(file, ".pub"))
  cat(openssl::write_pem(key), file = "gh-pages")
  key
}
```


That's all folks :tada:!
