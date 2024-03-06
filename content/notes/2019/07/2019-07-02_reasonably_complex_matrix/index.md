---
title: "Reasonably complex matrix build with Travis"
date: 2019-07-02
tags: [continuous integration, Travis, matrix build]
---

[Matrix build](https://docs.travis-ci.com/user/build-matrix/) is a very powerful feature of [Travis CI](https://travis-ci.com/): it allows you to
define a list of custom environments wherein your software will be built. For instead, I check [rcites on 4 different environments](https://travis-ci.org/ropensci/rcites) (note that Travis offers 3 different Ubuntu version, [several MacOSX images](https://docs.travis-ci.com/user/reference/osx/) and that the  support for [Windows is in early stage](https://docs.travis-ci.com/user/reference/windows/)).

A few days ago, the matrix build I used for another R :package: failed with the following error (see https://travis-ci.com/mangal-wg/rmangal/jobs/211574578 for the log):


```
$ if [[ $TRAVIS_OS_NAME == "linux" ]]; then sudo apt-get --yes --force-yes update -qq; fi
W: GPG error: https://packagecloud.io/github/git-lfs/ubuntu trusty InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 6B05F25D762E3157
W: The repository 'https://packagecloud.io/github/git-lfs/ubuntu trusty InRelease' is not signed.
```

which was caused by the lines below I used in `.travis.yml`:

```yaml
before_install:
  - if [[ $TRAVIS_OS_NAME == "linux" ]]; then sudo add-apt-repository ppa:ubuntugis/ppa --yes; fi
  - if [[ $TRAVIS_OS_NAME == "linux" ]]; then sudo apt-get --yes --force-yes update -qq; fi
  - if [[ $TRAVIS_OS_NAME == "linux" ]]; then sudo apt-get install --yes libudunits2-dev libproj-dev libgeos-dev libgdal-dev; fi
  - R -e 'install.packages("rgdal", repos=c("http://R-Forge.R-project.org", "http://cran.rstudio.com"))'
```

Well, I could have traced back where the `apt-get`-related issue stemmed from, but I decided otherwise: I reviewed `.travis.yml` to properly use the matrix build. The [documentation about it is good] but, IMHO, it lacks a couple of examples. That said, such examples are actually available in the zillion of <i class="fa fa-github" aria-hidden="true"></i> repositories that use Travis! Even even [Travis developers refer to these examples](
https://github.com/travis-ci/travis-ci/issues/4291)! So, after I had a look at this [`.travis.yml` example](https://github.com/pyca/cryptography/blob/master/.travis.yml), here is what I ended up doing:

```yaml
matrix:
  include:
    - os: linux
      dist: trusty
      r: release
      env: NOT_CRAN=true
      addons:
        apt:
          sources:
            - sourceline: 'ppa:opencpu/jq'
            - sourceline: 'ppa:ubuntugis/ubuntugis-unstable'
          packages:
            - libudunits2-dev
            - libproj-dev
            - libgeos-dev
            - libgdal-dev
    - os: osx
      r: release
      env: NOT_CRAN=true
    - os: linux
      dist: xenial
      r: devel
      env: NOT_CRAN=false
      addons:
        apt:
          packages:
            - libudunits2-dev
            - libproj-dev
            - libgeos-dev
            - libgdal-dev
```
