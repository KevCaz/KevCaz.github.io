---
title: Generate a ssh key with R
date: 2020-04-04
tags: [keygen, R, numerical approximation]
draft: true 
---


Travis foolowd

https://gist.github.com/gaborcsardi/68960fb01bec74d89611bb9c2b0b7e5a

very useful

but some issue with deployment work then stop

so changes

```
```

for I ended up using a [token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) and


```
deploy:
  provider: pages
  skip_cleanup: true
  keep_history: true
  github_token: $GITHUB_TOKEN
  on:
    all_branches: master
  local_dir: docs
```

https://gist.github.com/gaborcsardi/68960fb01bec74d89611bb9c2b0b7e5a



See https://travis-ci.org/github/inSileco/inSilecoMisc/builds/670772761/config

Might be less sec