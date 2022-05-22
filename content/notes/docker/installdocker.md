---
title: "Get docker on Debian Testing"
date: 2019-01-07
tags: [Debian, docker, R]
---

One of my resolutions for 2019 is to use [docker](https://www.docker.com/)
to delve deeper into reproducible science.
As explained in the [Wikipedia's article about docker](https://en.wikipedia.org/wiki/Docker_(software)):

> Docker is a computer program that performs operating-system-level virtualization, also known as "containerization".


Basically, instead of installing software in a way that very much likely depends on the Operating System (OS) you are using, you install docker (OS specific) and then you run command lines (not OS specific) to install the set of containers (software) you need. Hence, docker provides you with a reproducible software installation! Carl Boettiger gives a very nice example of a [fully reproducible data analysis pipeline that uses docker](https://github.com/cboettig/noise-phenomena).

The steps to install docker on debian are thoroughly described [here](https://docs.docker.com/install/linux/docker-ce/debian/)
Few months ago, I thought `sudo apt-get install docker` was enough, but I realized that it installs an old version of docker:

```sh
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

After I completed all the steps to install the most recent stable version of
docker, version `18.09` was installed.

```sh
$ docker -v
Docker version 18.09.0, build 4d60db4
```

Then I updated my [gist to set up my debian machine accordingly](https://gist.github.com/KevCaz/29536740b9150383a9d543ec1be96103#file-installdebian-sh-L97).

As I use R very frequently, my next step is to read [*An Introduction to Rocker: Docker Containers for R*](https://journal.r-project.org/archive/2017/RJ-2017-065/index.html)
Carl Boettiger and Dirk Eddelbuettel and also the nice tutorial by Colin Fay he mentions in one of his recent tweets.

{{< tweet user="_ColinFay" id="1082006268653568001" >}}
