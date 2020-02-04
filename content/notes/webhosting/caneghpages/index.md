--- 
title: "GitHub pages & custom domain name? Don't forget CNAME! `[SOLVED]`"
date: 2020-02-04 
tags: [GitHub pages, CNAME]
--- 


## The problem ❔

I am maintaning the website of the [McCann Lab](https://mccannlab.ca/) that is
currently hosted on the [GitHub Pages](https://pages.github.com/). Since I set
up the [custom
domain](https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site),
I was experiencing a weird issue: after every single deployment even on GitHub
Pages (originally done by Travis, now by using [a dedicated GitHub Actions
workflow](https://github.com/McCannLab/McCannLab.github.io/actions)) the
custom domain was removed and I had to rewrite it  everytime (see :arrow_down:)
which was pretty annoying.

{{< imgcenter "cname.png" 70 1 >}}


## The solution :medal_sports:

Truth be told, it was not dofficult to find the solution! It was already
reported several times (including this issue on GitHub
[gh-pages/issues/213](https://github.com/tschaub/gh-pages/issues/213)).
Basically, one needs to include a **CNAME** file with the custom domain name
and for [Hugo](https://gohugo.io/) (the static site generator I use for this
website), this file should be added in the `static` folder. This is actually
well-explained in the
[documentation](https://gohugo.io/hosting-and-deployment/hosting-on-github/#use-a-custom-domain
), so once again, read the doc!
