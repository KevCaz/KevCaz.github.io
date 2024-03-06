---
title: "Unzip more than one file"
date: 2018-09-25
tags: [Unix, unzip]
---

Few days ago, I was trying to unzip a set of files and it did
not work, so I looked up on the internet and found this very detailed [post by Chris Jean](https://chrisjean.com/unzip-multiple-files-from-linux-command-line/) that explains why

```sh
unzip path/*.zip
```

gives you an error whereas

```sh
unzip 'path/*.zip'
```
works like a charm!

Thanks Chris!
