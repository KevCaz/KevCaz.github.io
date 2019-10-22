---
title: "Deploy a pkgdown on gh-pages"
date: 2019-10-22
tags: [continuous integration, Travis, GitHub pages, website, R, pkgdown]
---


There are several ways of [deploying a website on your GitHub pages](https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) :

1. using the `gh-pages` (the default on Travis);
2. using the folder `docs` on your master branch;
3. using the master branch.

For the [pkgdown]() websites I create for my R package I used to deploy on the `docs/` folder. But I figured that this has two main drawbacks:

1. I needed to rebuild the package locally after (pretty much) any change in the package;
2. it adds a hidge amount of changes in the commit history.

That's why I've decided to let [Travis](https://travis-ci.org/) build the
website and let him deploy the website on a dedicated branch (as many developers smartly do). I faced two issued when trying to deeploy on the `gh-branch`. First I needed a deploy key:


```r
Error: No deploy key found, please setup with `travis::use_travis_deploy()`
```

the way to fix this is given in the message. Second the branch

```
Error: callr subprocess failed: '/tmp/RtmpDinJqC/file409c3dd473be' is non-empty and not built by pkgdown

Execution halted

Script failed with status 1
```

see [this job](https://travis-ci.org/KevCaz/seedlingsRecruitment/builds/598866219#L1432) to chack out the console log. Fortunately the solution to do it [is explained on the pkgdown website](https://pkgdown.r-lib.org/reference/deploy_site_github.html)




then




usethis::use_pkgdown_travis().


before_cache: Rscript -e 'remotes::install_cran("pkgdown")'
deploy:
  provider: script
  script: Rscript -e 'pkgdown::deploy_site_github()'
  skip_cleanup: true


by default on gh-pages branch that must be created and empty

git checkout --orphan gh-pages
git rm -rf .
git commit --allow-empty -m 'Initial gh-pages commit'
git push origin gh-pages
git checkout master

pretty sweat set up separaate historyu fo the deploy.