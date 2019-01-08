---
title: "Get docker on Debian Testing"
date: 2019-01-07
tags: [Debian, docker, R]
---

One of my resolution for 2019 is to use [docker](https://www.docker.com/)
to delve deeper into reproducible science.
As explained in the [Wikipedia's article about docker](https://en.wikipedia.org/wiki/Docker_(software)):

> Docker is a computer program that performs operating-system-level virtualization, also known as "containerization".


Basically instead of installing software following the steps that likely
depends on your Operating System (OS), you install docker (OS specific) and then
you run command lines (not OS specific) to install the set of containers
you need and then you can run the analysis pipeline. So in other words, docker
provides you with a reproducible software installation! Carl Boettiger gives
a very nice example of a [fully reproducible data analysis pipeline for one of its paper  including docker](https://github.com/cboettig/noise-phenomena).

The steps to install docker on debian are thoroughly described [here](https://docs.docker.com/install/linux/docker-ce/debian/)
Few months ago, I though `sudo apt-get install docker` was enough, but it
installs actually install an old version of docker:

```
$ apt policy docker
docker:
 Installed: (none)
 Candidate: 1.5-2
 Version table:
    1.5-2 500
       500 http://debian.mirror.rafal.ca/debian testing/main amd64 Packages
    1.5-1+b1 500
       500 http://ftp.debian.org/debian stable/main amd64 Packages
```

So, I followed the different steps to install the most recent stable version of
docker:

```
$ docker -v
Docker version 18.09.0, build 4d60db4
```

and then I updated my [gist to set up my debian machine accordingly](https://gist.github.com/KevCaz/29536740b9150383a9d543ec1be96103#file-installdebian-sh-L97).

As I use R very frequenlty my next step is to read [*An Introduction to Rocker: Docker Containers for R*](https://journal.r-project.org/archive/2017/RJ-2017-065/index.html)
Carl Boettiger and Dirk Eddelbuettel and also the nice post Colin Fay he mentions
in one of his recent tweets.

{{< tweet 1082006268653568001 >}}
