---
title: Prompt before opening larges file in Atom
date: 2018-09-29
tags: [Atom, settings, large files]
---

Many of the projects I am working on include files that are over 5Mo. When
I am working with [Atom](https://atom.io/) I often click on them (wrongly)
and this used to make Atom work hard for nothing :disappointed:.

{{< screencast src="./assets/openlargefile.webm" >}}

In the screencast above, for instance, I had to wait for 1 minute to be able
to work again, although the file was 5&nbsp;MB only (atom 1.30.0 for the record).
I did not have such issue with `.csv` files as I was using [tablr](https://atom.io/packages/tablr)
that prompts a message before opening the file. From there I knew that
what I needed was to make Atom prompt a message before opening large files.
This was actually [already implemented](https://github.com/atom/atom/issues/10086)
:smile: all I had to do was change the default value (40&nbsp;MB), I set it
to 1&nbsp;MB.

{{< screencast src="./assets/limitfilesize.webm" >}}
