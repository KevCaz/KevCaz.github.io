
sudo

```sh
alias schcrwlr='
  docker run -v $(pwd):/home/schcrwlr/share --name schemacrawler \
  --rm -i -t --entrypoint=/bin/bash schemacrawler/schemacrawler'
```

```
$ docker pull schemacrawler/schemacrawler  
```

```
$ docker run \
-v $(pwd):/home/schcrwlr/share \
--name schemacrawler \
--rm -i -t \
--entrypoint=/bin/bash \
schemacrawler/schemacrawler
```


```
$ ls 
sc.db                              schemacrawler.colormap.properties  schemacrawler.config.properties    share
```


```sh
$ schemacrawler \
--server=sqlite --database=share/test.db \
--info-level=maximum \
--command=schema --output-format=png --output-file=share/graph_max.png
```

```sh
$ schemacrawler \
--server=sqlite --database=share/db/insil_compta.db \
--info-level=minimum \
--command=schema --output-format=png --output-file=share/graph_min.png
```

fun() 

https://github.com/schemacrawler/SchemaCrawler

https://www.schemacrawler.com/docker-image.html


## Creating a bash function


to make an enture alis for that s need to extend the docker image.
Not sure there is a simple way, may need to extent the image first.
Will follow up on this.
and run it at the begingi another nore. 

https://www.ctl.io/developers/blog/post/dockerfile-entrypoint-vs-cmd/



dbschema

