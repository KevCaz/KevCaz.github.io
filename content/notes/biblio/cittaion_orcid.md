---
title: "Retrieve a list of publications available from an ORCID account with R"
date: 2019-11-10
tags: [publications, orcid, R, rcrossref, rorcid]
---

[ORCID](https://orcid.org/) is a great initiative that provides a unique
identifier for researchers (akin to a
[DOI](https://en.wikipedia.org/wiki/Digital_object_identifier) but for people).
In my opinion, the two main/direct benefits from having an ORCID account are:

1. a web page with details about researcher background and publication (see mine at https://orcid.org/0000-0001-6619-9874 and check out this [previous note on the topic]([dd](/notes/biblio/orcidexportref/)));

2. an ORCID account can be used to log in the web interfaces of various scientific journals so that research have a centralized login and personnal details for various journals (see the log in page of [Global Ecology and Biogeography](https://onlinelibrary.wiley.com/journal/14668238) as an example
:arrow_down:).


![](../assets/login.png)

<br>

There are teo cool R :package: that allow one to retrieve and format a set of
publications from using an ORCID: [rorcid](https://docs.ropensci.org/rorcid)
retrieve information publicly available on a given ORCID, which includes the
DOIs of the publications listed and
[rcrossref](https://docs.ropensci.org/rcrossref/) that retrieve publication
details from a DOI. The rorcid's vignette describes [how to combine these two
steps in three lines of R
code](https://docs.ropensci.org/rorcid/articles/rorcid.html#get-formatted-citations-for-an-orcid-id):


```R
# find the papers added on my ORCID profile  
my_dois <- rorcid::identifiers(rorcid::works("0000-0001-6619-9874"))
# fetch the references details
pubs <- rcrossref::cr_cn(dois = my_dois, format = "bibtex")
# write them in a bib text
invisible(lapply(pubs, write, "pubs.bib", append=TRUE))
```

I actually wrapped that code in a function that is now in my [.Rprofile](http://www.onthelambda.com/2014/09/17/fun-with-rprofile-and-customizing-r-startup/) so as to obtain a bibtex with all my publication with a single command line :smirk:. Note that if you are looking another format for your list of publication (e.g. JSON), the conversion can readily be done with [pandoc-citeproc](https://github.com/jgm/pandoc-citeproc).

