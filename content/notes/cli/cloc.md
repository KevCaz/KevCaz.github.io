---
title: "Count your lines of code with `cloc`"
date: 2020-02-09
tags: [cli, code, R, count, line of code]
---

I recently found out about [cloc](https://github.com/AlDanial/cloc) that is 
a very useful command line tool written in [Perl](https://www.perl.org/) 
that "*counts blank lines, comment lines, and physical lines of source code in 
many programming languages*"[^note1]. Let's see how it works 👁. 

The first step is to install `cloc`, there are several ways to do so, as a 
Debian user (Debian Buster) all I had to do was to use `apt-get`:


```sh
$ apt-get install cloc
```

Once installed, `cloc` can be call in a Terminal like so: `cloc path/to/file_or_folder`. 
Let's exemplify this. First, let's consider the following <i class='fab fa-r-project'></i> file:

```R
# one comment
sum(2, 2)

# another line of code 
prod(3, 3) 
```

All I need to do to count the different type of lines is:

```sh
$ cloc example.R 
```

which returns the following output

```sh
       1 text file.
       1 unique file.                              
       0 files ignored.

github.com/AlDanial/cloc v 1.81  T=0.00 s (258.3 files/s, 1291.3 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
R                                1              1              2              2
-------------------------------------------------------------------------------

```

Sweet 😄, right?! But even more interesting is that you can use `cloc` to obtain 
a summary of the lines of an entire folder! I do so for the 
content of the <i class='fab fa-r-project'></i> package [rcites](https://cran.r-project.org/web/packages/rcites/index.html) 
I maintain:


```sh
$ cloc .
      60 text files.
      57 unique files.                              
      18 files ignored.

github.com/AlDanial/cloc v 1.81  T=0.04 s (1172.0 files/s, 160802.6 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
HTML                             7            213             22           2664
R                               19            179            443            963
Markdown                         8            141              0            262
JSON                             1              0              0            239
Rmd                              5            200            337            146
YAML                             3             18              4             69
-------------------------------------------------------------------------------
SUM:                            43            751            806           4343
-------------------------------------------------------------------------------
```

Yeah ✨!! 

Also, <i class='fab fa-r-project'></i> users would be happy to know that there 
is a package available on GitHub, written by [Bob Rudis](https://github.com/hrbrmstr/cloc),
that wraps around the Perl script used in cloc and that returns the results as a data
frame. So for instance, I can do the same count for my rcites package with R:

```R
R> # install.packages("remotes") # if needed
R> remotes::install_github("hrbrmstr/cloc") 
R> library(cloc)
R> res <- cloc_by_file(".")  # content of rcites                                                                                                  
   source                              filename language loc blank_lines comment_lines
1       .                ./doc/get_started.html     HTML 639          31             1
2       .                   ./doc/elephant.html     HTML 515          31             1
3       .    ./docs/articles/a_get_started.html     HTML 477          26             3
4       .              ./doc/bulk_analysis.html     HTML 369          31             1
5       .       ./docs/articles/b_elephant.html     HTML 348          26             3
6       .                             ./R/zzz.R        R 296          55            57
7       .                       ./codemeta.json     JSON 239           0             0
8       .  ./docs/articles/c_bulk_analysis.html     HTML 204          26             3
9       .                       ./docs/404.html     HTML 112          42            10
10      .                       ./R/print.spp.R        R  85          27            43
11      .  ./tests/testthat/test-legislations.R        R  84          12            15
12      .                ./R/spp_taxonconcept.R        R  73           4            74
13      .                           ./README.md Markdown  68          47             0
14      .                             ./NEWS.md Markdown  53          26             0
15      .  ./tests/testthat/test-taxonconcept.R        R  48          12             0
16      . ./tests/testthat/test-distributions.R        R  46           7             0
17      .                            ./paper.md Markdown  46          17             0
18      .             ./.github/CONTRIBUTING.md Markdown  44          29             0
19      .           ./R/spp_cites_legislation.R        R  42           1            50
20      .              ./R/spp_eu_legislation.R        R  36           1            49
21      .    ./tests/testthat/test-pkghelpers.R        R  35           9             4
22      .                    ./doc/elephant.Rmd      Rmd  34          32            42
23      .            ./vignettes/b_elephant.Rmd      Rmd  34          32            42
24      .               ./R/spp_distributions.R        R  33           2            46
25      .                      ./doc/elephant.R        R  32           9             9
26      .    ./tests/testthat/test-references.R        R  32           5             0
27      .                        ./appveyor.yml     YAML  30          12             3
28      .                         ./.travis.yml     YAML  30           5             1
29      .                  ./R/spp_references.R        R  30           2            41
30      .                 ./doc/get_started.Rmd      Rmd  27          59           104
31      .         ./vignettes/a_get_started.Rmd      Rmd  27          56           102
32      .                 ./doc/bulk_analysis.R        R  24          10            12
33      .       ./vignettes/c_bulk_analysis.Rmd      Rmd  24          21            47
34      .                   ./doc/get_started.R        R  24          15            18
35      .                          ./CONDUCT.md Markdown  19           6             0
36      .    ./tests/testthat/test-wrongtoken.R        R  16           4             1
37      .                       ./R/set_token.R        R  12           2            23
38      .    ./.github/pull_request_template.md Markdown  12           4             0
39      .      ./tests/testthat/helper-citesr.R        R  12           2             1
40      .                    ./cran-comments.md Markdown  11           9             0
41      .           ./.github/issue_template.md Markdown   9           3             0
42      .                        ./_pkgdown.yml     YAML   9           1             0
43      .                    ./tests/test-all.R        R   3           0             0
```

🎆 Hope this could be useful! 

[^note1]: see the <https://github.com/AlDanial/cloc>
