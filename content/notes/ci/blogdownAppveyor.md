---
title: "Let AppVeyor watch inSileco!"
date: 2018-10-02
tags: [continuous integration, AppVeyor, blogdown, Hugo, R]
---

I very much enjoy sharing thoughts and code on our blog [inSileco](https://insileco.github.io/). Recently, one of the authors
mentioned that [he was not able to clone the repository](https://github.com/inSileco/inSileco.github.io/issues/62)
on his Windows machine. I came to realize that we better not assume that everybody is working on MacOS or Linux and check that inSileco works well on Windows. One of the most convenient way to do so is to use [AppVeyor](https://www.appveyor.com/) and I
therefore decided to spend some time making the [build passed on AppVeyor](https://ci.appveyor.com/project/KevCaz/insileco-github-io)!  

There were two main difficulties to overcome:

1. install all dependencies properly;
2. make sure we do not use functions in a 'only-Unix' way.


Regarding **1**, I had to edit the `appveyor.yml` file (see its [latest version on Github](https://github.com/inSileco/inSileco.github.io/blob/dev/appveyor.yml))
so as to:

* install a recent version of [Pandoc](https://pandoc.org/): I found this [issue on GitHub](https://github.com/krlmlr/r-appveyor/issues/82) and so use
[chocolatey](https://chocolatey.org/) to install it;

* [use RTOOLS](https://github.com/krlmlr/r-appveyor) even though our repository do not include a `src` directory to successfully compile all remote packages.


Regarding **2**, I simplified certain paths because some functions seem to be
quite sensitive ([`unzip()` for instance](https://stackoverflow.com/questions/15226150/r-exdir-does-not-exist-error)).

Below are the two parts of the `appveyor.yml` file I ended up adding to make it work
(again you can see the [file on GitHub](https://github.com/inSileco/inSileco.github.io/blob/dev/appveyor.yml))


```yaml
environment:
  USE_RTOOLS: true

after_build:
  - choco install pandoc hugo
  - Rscript -e 'blogdown::build_site()'
```

Two final remarks:

* `choco install` can be abbreviated `cinst`;
* I chose to install [Hugo](https://gohugo.io/) via chocolatey there is a function
of blogdown to do so: `blogdown::install_hugo()`.
