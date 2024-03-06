---
title: "GitHub pages site with Jekyll locally "
date: 2019-07-27
tags: [GitHub, Github page, Jekyll, Ruby]
---

I use [GitHub pages](https://pages.github.com/) (aka gh-pages) very often now
and find this feature extremely powerful for various reasons. This web site for
instance, is first checked on [Travis CI](https://travis-ci.org/) and then
deployed to GitHub pages, which is way more convenient than using
[FileZilla](https://filezilla-project.org/).

Recently, I have been working on a [small site for the QCBS that needed a site to introduce their R workshops](https://qcbsrworkshops.github.io/). We (I was not the only one on board) decided to use the GitHub pages with [Jekyll](https://jekyllrb.com/) and one of the existing them, [minima](https://github.com/jekyll/minima), that is we opt for using gh-pages the easiest way. As for every website I'm working on, I've looked for a way to check the visual rendering of the site before deploying it online. As for all the GitHub features, this is very well-documented on the [GitHub website](https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll) and I simply followed the guidelines! In a nutshell, once [Ruby](https://www.ruby-lang.org/en/) installed, and once the repository initiated with the proper files, the first step is to install the bundler:


```sh
$ gem install bundler
```

the second one is to install all the dependencies:

```sh
bundle install
```

including [Jekyll](https://jekyllrb.com/):

```sh
$ jekyll --version
jekyll 3.8.5
```

and then the site can be deployed locally:

```sh
$ bundle exec jekyll serve
```

Sweet :sunglasses:! By the way, as I often use emojis :sweat_smile: I checked how to use them on our page, turns out there is a plugin for it, see
https://help.github.com/en/articles/emoji-on-github-pages.
