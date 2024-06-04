---
title: "Multiple-protocol with aria2"
date: 2019-05-10
tags: [cli, transfer protocol, download, web]
---

People at [TecMint](https://www.tecmint.com/) write great posts and gather tons of tips about Linux. Recently, they twitted about [aria2](https://aria2.github.io/):


{{< tweet user="tecmint" id="1122753025477464065" >}}

I gave it a try, and it's pretty sweet :smile:! With a simple command line, you can download any file using any of the most common transfer protocols!. Even though it is unlikely that I'll substitute [wget](https://www.gnu.org/software/wget/) and [curl](https://curl.haxx.se/) for aria2, it is certainly a CLI tool I'll use on a regular basis.

A quick demo? Ok, last week I use it to to download [better-bibtex](https://github.com/retorquere/zotero-better-bibtex/releases/):

```shell
aria2c https://github.com/retorquere/zotero-better-bibtex/releases/download/v5.1.76/zotero-better-bibtex-5.1.76.xpi
```

Here are the details reported on progress:


```shell
05/10 15:44:29 [NOTICE] Downloading 1 item(s)

05/10 15:44:29 [WARN] aria2c had to connect to the other side using an unknown TLS protocol. The integrity and confidentiality of the connection might be compromised.
Peer: github.com (192.30.253.112:443)

05/10 15:44:29 [NOTICE] CUID#7 - Redirecting to https://github-production-release-asset-2e65be.s3.amazonaws.com/12968763/5b0b1580-6ac7-11e9-8a5d-f6db74a2ad9e?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20190510%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20190510T194429Z&X-Amz-Expires=300&X-Amz-Signature=9997535a66249a1e52f9fcbf060ede87eb7983a1bc877061b55942058d7d24e4&X-Amz-SignedHeaders=host&actor_id=0&response-content-disposition=inline%3B%20filename%3Dzotero-better-bibtex-5.1.76.xpi&response-content-type=application%2Fx-xpinstall
[#33d126 19MiB/20MiB(94%) CN:1 DL:7.3MiB]                                                               
05/10 15:44:32 [NOTICE] Download complete: /home/kevcaz/Github/Rpackages/GDFDanalyses/zotero-better-bibtex-5.1.76.xpi

Download Results:
gid   |stat|avg speed  |path/URI
======+====+===========+=======================================================
33d126|OK  |   7.3MiB/s|/home/kevcaz/Github/Rpackages/GDFDanalyses/zotero-better-bibtex-5.1.76.xpi

Status Legend:
(OK):download completed.
```

That's all folks! 
