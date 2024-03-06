---
title: "Merging .bib files with bibtool"
date: 2019-04-22
tags: [bibtex, bibtool, latex, bibliography]
---

As researchers, we sometimes write manuscripts collectively and remotely in
[LaTeX](https://www.latex-project.org/) (or in a lightweight markup languages
that is converted into LaTeX at some point). In such case, it is quite
useful to let co-authors edit their own `bib` file in order to store the references included in the part of the manuscript they are editing. One way to deal with several `bib` files is to merge them into one `bib` file before compiling the final document to `pdf`. In this note, I exemplify how to do so.

Let's assume that there are two `bib` files within the manuscript folder:

1. `kevcaz.bib file`, my own list of references;
2. `author.bib`, my colleague's references list.

I added these two files below:

<details>
<summary>
  <a>click to display kevcaz.bib</a>
</summary>

Click [here](../assets/kevcaz.bib) to download it.

```latex
% kevcaz.bib
@Article{	 alroy_new_2015,
  title		= {A new twist on a very old binary similarity coefficient},
  volume	= {96},
  issn		= {0012-9658},
  doi		= {10.1890/14-0471.1},
  number	= {2},
  urldate	= {2019-04-13},
  journal	= {Ecology},
  author	= {Alroy, John},
  year		= {2015},
  pages		= {575--586}
}

@Article{	 savage_elevational_2015,
  title		= {Elevational shifts, biotic homogenization and time lags in
		  vegetation change during 40 years of climate warming},
  volume	= {38},
  issn		= {09067590},
  doi		= {10.1111/ecog.01131},
  language	= {en},
  number	= {6},
  urldate	= {2019-04-14},
  journal	= {Ecography},
  author	= {Savage, Josée and Vellend, Mark},
  month		= jun,
  year		= {2015},
  pages		= {546--555}
}
```
</details>

<details>

<summary>
  <a>click to display coauthor.bib</a>
</summary>

Click [here](../assets/coauthor.bib) to download it.

```latex
% coauthor.bib
@article{morales-castilla_inferring_2015,
	title = {Inferring biotic interactions from proxies},
	volume = {30},
	issn = {01695347},
	doi = {10.1016/j.tree.2015.03.014},
	language = {en},
	number = {6},
	urldate = {2018-05-23},
	journal = {Trends in Ecology \& Evolution},
	author = {Morales-Castilla, Ignacio and Matias, Miguel G. and Gravel, Dominique and Araújo, Miguel B.},
	month = jun,
	year = {2015},
	keywords = {Interaction biotique},
	pages = {347--356}
}

@article{russell_scale_2006,
	title = {Scale, {Environment}, and {Trophic} {Status}: {The} {Context} {Dependency} of {Community} {Saturation} in {Rocky} {Intertidal} {Communities}},
	volume = {167},
	issn = {0003-0147, 1537-5323},
	shorttitle = {Scale, {Environment}, and {Trophic} {Status}},
	url = {http://www.journals.uchicago.edu/doi/10.1086/504603},
	doi = {10.1086/504603}
}

@Article{	 alroy_new_2015,
  title		= {A new twist on a very old binary similarity coefficient},
  volume	= {96},
  issn		= {0012-9658},
  doi		= {10.1890/14-0471.1},
  number	= {2},
  urldate	= {2019-04-13},
  journal	= {Ecology},
  author	= {Alroy, John},
  year		= {2015},
  pages		= {575--586}
}
```

</details>

Then, what I want is to merge them into one single file `biblio_sorted.bib` (the
one to be used as reference data base for the manuscript) and I also want to
remove all duplicates before the merge. How to do so? Well, that is the king of
situation where [bibtool](https://ctan.org/pkg/bibtool?lang=en) comes in handy.
This command line tool allows several manipulations of `.bib` files and here I
use it to merge two `bib` file, sort the entries in alphabetical order and
remove all duplicates with single line of command:

```shell
$ bibtool -s -d kevcaz.bib coauthor.bib -o biblio_sorted.bib
*** BibTool WARNING: Possible double entries discovered:
***     alroy_new_2015 =?= alroy_new_2015
***     alroy_new_2015
```

Where :
 - option `-s` sorts entries in alphabetical order;
 - option `-d` comments out duplicates
 - option `-o` indicate the name of the output files.

Below is the final file with two comments of my own:

<details>
<summary>
  <a>click to display biblio_sorted.bib</a>
</summary>

Click [here](../assets/biblio_sorted.bib) to download it.

```latex
% biblio_sorted
@Article{	  alroy_new_2015,
  title		= {A new twist on a very old binary similarity coefficient},
  volume	= {96},
  issn		= {0012-9658},
  doi		= {10.1890/14-0471.1},
  number	= {2},
  urldate	= {2019-04-13},
  journal	= {Ecology},
  author	= {Alroy, John},
  year		= {2015},
  pages		= {575--586}
}

% NB: '###' comments the reference out
###Article{	  alroy_new_2015,
  title		= {A new twist on a very old binary similarity coefficient},
  volume	= {96},
  issn		= {0012-9658},
  doi		= {10.1890/14-0471.1},
  number	= {2},
  urldate	= {2019-04-13},
  journal	= {Ecology},
  author	= {Alroy, John},
  year		= {2015},
  pages		= {575--586}
}

@Article{	  morales-castilla_inferring_2015,
  title		= {Inferring biotic interactions from proxies},
  volume	= {30},
  issn		= {01695347},
  doi		= {10.1016/j.tree.2015.03.014},
  language	= {en},
  number	= {6},
  urldate	= {2018-05-23},
  journal	= {Trends in Ecology \& Evolution},
  author	= {Morales-Castilla, Ignacio and Matias, Miguel G. and
		  Gravel, Dominique and Araújo, Miguel B.},
  month		= jun,
  year		= {2015},
  keywords	= {Interaction biotique},
  pages		= {347--356}
}

@Article{	  russell_scale_2006,
  title		= {Scale, {Environment}, and {Trophic} {Status}: {The}
		  {Context} {Dependency} of {Community} {Saturation} in
		  {Rocky} {Intertidal} {Communities}},
  volume	= {167},
  issn		= {0003-0147, 1537-5323},
  shorttitle	= {Scale, {Environment}, and {Trophic} {Status}},
  url		= {http://www.journals.uchicago.edu/doi/10.1086/504603},
  doi		= {10.1086/504603}
}

@Article{	  savage_elevational_2015,
  title		= {Elevational shifts, biotic homogenization and time lags in
		  vegetation change during 40 years of climate warming},
  volume	= {38},
  issn		= {09067590},
  doi		= {10.1111/ecog.01131},
  language	= {en},
  number	= {6},
  urldate	= {2019-04-14},
  journal	= {Ecography},
  author	= {Savage, Josée and Vellend, Mark},
  month		= jun,
  year		= {2015},
  pages		= {546--555}
}
```

</details>


Pretty neat, isn't it? Plus, if you are familiar with
[Makefiles](https://www.gnu.org/software/make/manual/html_node/Introduction.html),
it is easy to add this to your compilation process so that each time your `bib`
file is edited, the manuscript database will be edited will be updated :smiley:!
I find this way quite convenient as it allows co-author to edit the list of
reference without worrying about potential conflicts in this list.

Three final remarks to conclude this post:

- have a look at `man bibtool`, there are several options to explore, for instance `-S` to sort entries in reverse order;

- the approach described above will work seamlessly if all the authors edit the
  keys of the entries in the same way (as above), otherwise another step is
  required to standardize these keys;

- there are alternative ways to deal with several `bib` files directly in the
  LaTex file. For instance, the macro `\addbibresource` of the `biblatex`
  package, see this answer on [<i class="fa fa-stack-overflow"
  aria-hidden="true"></i>](https://tex.stackexchange.com/questions/98660/two-bibliographies-one-for-main-text-and-one-for-appendix).
