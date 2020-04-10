---
title: "Deploy a pkgdown website on gh-pages manually"
date: 2020-04-10
tags: [continuous integration, Travis, GitHub pages, website, R, pkgdown]
---


This is another note about deploying a
[`pkgdown`](https://CRAN.R-project.org/package=pkgdown)[^n1] website with
[Travis](https://travis-ci.org/) on gh-pages. I had
[previously](notes/ci/deploypkgdown) used the package
[`travis`](https://CRAN.R-project.org/package=travis) but I was recently
interested in doing so manually. Fortunately, I found this very helpful
[walk-through](https://gist.github.com/gaborcsardi/68960fb01bec74d89611bb9c2b0b7e5a)
by [Gábor Csárdi](https://github.com/gaborcsardi)[^n2]. I used it and it worked
well for a while, but at some point I had an issue with the deployment part
(still not sure why), so I changed it. Instead of using the following
config[^n3]


```yaml
deploy:
  provider: script
  script: Rscript -e 'pkgdown::deploy_site_github()'
  skip_cleanup: true
  on:
    all_branches: true
```

I now use

```yaml
deploy:
  provider: pages
  skip_cleanup: true
  keep_history: true
  github_token: $GITHUB_TOKEN
  on:
    all_branches: master
  local_dir: docs
```

where the environment variable `$GITHUB_TOKEN` is a
[token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
created on GitHub that I have added in the Travis settings of my package. This
works well, **BUT** it does not allow to keep the [two versions of the `pkgdown`
website](https://pkgdown.r-lib.org/reference/build_site.html) (development +
release). This is because a new `./docs` folder is produced during every build
and when its content is pushed to the `gh-pages` branch, only one version of the
website is pushed. To overcome this, I have used <i class="fab fa-git"
aria-hidden="true"></i> (and this [<i class="fab fa-stack-overflow"
aria-hidden="true"></i>
thread](https://stackoverflow.com/questions/4479960/git-checkout-to-a-specific-folder)
was quite helpful).

```yaml
after_success:
  - mkdir docs
  - git fetch origin gh-pages:gh-pages
  - git --work-tree=docs checkout gh-pages -- .
```

Briefly:

1. `mkdir docs` creates the directory `docs`;
2. `git fetch origin gh-pages:gh-pages` gets the remote `gh-pages` branch;
3. `git --work-tree=docs checkout gh-pages -- .` put the content of `gh-pages` in `./docs`.


If you want to see this config in action, [it is currently used for `inSilecoMisc`](https://travis-ci.org/github/inSileco/inSilecoMisc/builds/670772761/config) and so both the [release website](https://insileco.github.io/inSilecoMisc/) and the [development website](https://insileco.github.io/inSilecoMisc/dev) are available!


## Template

To conclude this note, below is the entire `.travis.yaml` template I intend to use for my future <i class="fab fa-r-project" aria-hidden="true"></i> packages.

{{< gist KevCaz 622c92cc1f7b00e66f078418882ad407 >}}


[^n1]: a static website builder for R packages.

[^n2]: an important I don't mention here is actually to create the [gh-pages branch](https://pkgdown.r-lib.org/reference/deploy_site_github.html).

[^n3]: par ot the `.travis.yaml` of my package.

