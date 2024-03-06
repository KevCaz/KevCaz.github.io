---
title: "Give schemacrawler a go!"
date: 2021-09-17
tags: [database, schemacrawler]
---

Few months ago, I was looking for a way to check the evolution of the structure of one SQLite database I am working on, so I thought having a simple way to get a schema of my database would be a simple solution. A colleague of mine suggested to give [SchemaCrawler](https://www.schemacrawler.com/) a try, and so I gave it a go. 

I quickly realized that the easiest way to use it on my Debian machine was to use the [Docker image](https://www.schemacrawler.com/docker-image.html), and so I did

```sh
$ docker pull schemacrawler/schemacrawler  
```

I kept following the guidelines to use it:


```sh
$ docker run \
-v $(pwd):/home/schcrwlr/share \
--name schemacrawler \
--rm -i -t \
--entrypoint=/bin/bash \
schemacrawler/schemacrawler
```

Briefly, the options used do the following (see `man docker run` and/or https://docs.docker.com/engine/reference/run):

1. with `-v $(pwd):/home/schcrwlr/share` Docker creates a bind mount where the current directory (`$(pwd)`) is mounted in the Docker in the Docker container in `home/schcrwlr/share`; note that the colon is used for the separation;

2. `--name schemacrawler` names the container;

3. `--rm` automatically cleans up the container;

4. `-i` triggers the interactive mode;

5. `-t` allocates a pseudo-TTY (teletypewriter), that allows to run an interactive shell;

6. `--entrypoint=/bin/bash` specifies that we run bash when the container starts.



Then inside te container I used the following lines

```sh
$ schemacrawler \
--server=sqlite --database=share/db/test.db \
--info-level=minimum \
--command=schema --output-format=png --output-file=share/graph_min.png
```

I think the option names are pretty clear here. The only thing I would like to stress is that to directly obtain the graphic from the container we need to save the figure to `share` where the current directory has been mounted as explain above. This command line yielded the following image for my SQLite
database:


{{< figcenter "./graph_min.png" >}}


As I think the level of details was not high enough, I used the maximum level of details by doing


```sh
$ schemacrawler \
--server=sqlite --database=share/test.db \
--info-level=maximum \
--command=schema --output-format=png --output-file=share/graph_max.png
```

which return the following `.png` image


{{< figcenter "./graph_max.png" >}}


which is the kind of schema I actually needed! Pretty neat, isn't it?
