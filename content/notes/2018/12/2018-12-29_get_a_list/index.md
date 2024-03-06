---
title: "Get a list of your publications with ORCID"
date: 2018-12-29
tags: [publications, orcid, pandoc-citeproc]
---



[ORCID](https://orcid.org/) provides you with an unique research identifier that can be
used as a login on journals' website, a identifier for your papers, R packages (see below),
and [more](https://orcid.org/blog/2013/12/05/i-claimed-my-orcid-id-now-what)).


{{< imgcenter "./assets/rcites.png" 75 >}}

Your identifier is actually associated with a webpage (see mine: https://orcid.org/0000-0001-6619-9874) where you can edit your profile, get a QR code, etc.

{{< imgcenter "./assets/orcidQR.png" 30 >}}

It is very easy to search and "add works" to your account.

{{< imgcenter "./assets/orcid0.png" 75 >}}

Moreover, if the journal you have published with allows you to add your ORCID, your profile will be automatically updated. One feature I like is that it allows you to retrieve all your publications as
a `.bib` file.

{{< imgcenter "./assets/orcid.png" 75 >}}


As I often use a `.yaml` file once the `.bib` file downloaded I call [pandoc-citeproc](https://github.com/jgm/pandoc-citeproc) to the rescue!

```sh
$ pandoc-citeproc -y ref.bib > ref.yaml
```
