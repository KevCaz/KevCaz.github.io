---
title: "A new tree file for my notes"
date: 2024-03-14
tags: [R, Hugo, file management]
---


# Context

This section of my website is where I jot down notes that will be useful to my future self and hopefully to others. 
For years my notes have been organized into a set of folders that serve as categories that I thought were relevant. 
After 5 years and >120 notes, I realized that the categories were somewhat contrived (e.g. cli, linux), and that it was hard to locate a post and the assets were now managed consistently.
Hence, I decided to organize my notes into folders named after the date of the post. 
More specifically, I opted for a 3 levels architecture: 

1. one folder per year;
2. for each year one sub-folder per month (when a note has been written);
3. one folder per post named after the date of the post plus the 3 first words of the title.

The third level includes `index.md`, the the content of the note and optionally an `assets` folder for all asset files. 
Basically, for a given post, here is the desired organization:


```sh
notes
└── year
    └── month 
        └── year-month-day_3_first_words
            └── assets
                └── asset1.ext
                └── asset2.ext
            └── index.md   
```

For a tangible example, let's take the post ['My first workflow with GitHub Actions']({{< ref "/notes/2019/11/2019-11-20_my_first_workflow" >}}). 
Previously, that the tree file was as follows:


```sh
notes
└── ci 
    └── githubactions
        ├── index.md
        ├── ghactions00.png
        └── ghactions01.png
```

Below is the desired tree file:


```sh
notes
└── 2019
    └── 11 
        └── 2019-11-20_my_first_workflow
            ├── index.md
            └── assets
                ├── ghactions00.png
                └── ghactions01.png
```

Doing this by hand for a couple of notes is OK. 
Doing that for 124 notes by hand is pretty boring and error prone. 
Thus, I decided to do that with R and here I explain how to proceed.



# Generating the new file tree

The first step is to find all note files.
Those file will all end up being renamed `index.md` and stored in a different location.

```R
# I create this function knowing I re-use the code later
get_file_list <- function(dir) {   
    # my notes are all written in markdown, the extension is .md
    list.files(dir, pattern = "^[A-Za-z].+\\.md$", recursive = TRUE, full.names = TRUE) 
}
lsf <- get_file_list("content/notes")
#   [1] "content/notes/apt/lackofbootspace.md"                 
#   [2] "content/notes/atom/avoidopeninglargefile.md"                  
# ...
# [128] "content/notes/webhosting/caneghpages/index.md"
```

:warning: That's more than the 124 notes listed... :thinking_face: Old drafts? 
Let's check, anyway I need to read metadata to create the new file tree. 
To do so I call the function `yaml_front_matter()` from the [`rmarkdown`](https://CRAN.R-project.org/package=rmarkdown) package.

```R
library(rmarkdown)
yfm <- lapply(lsf, yaml_front_matter) 
tbl <- yfm |>
    lapply(\(x) data.frame(
        title = x$title, 
        date = x$date, # I need this to create the new file tree
        draft = ifelse(is.null(x$draft), FALSE, x$draft) # if TRUE this is a draft
    )) |> 
    do.call(what = rbind)
tbl$path <- lsf 
```

That gives the answer to my question: currently 4 unfinished notes are located in the section `notes` of my website.

```R
R> tbl[tbl$draft, ]
                                                title       date draft                                  path
10                           Set up your own webradio 2021-05-02  TRUE content/notes/audio/setupawebradio.md
46  How to get all web fonts from one format [SOLVED] 2019-11-25  TRUE        content/notes/font/webfonts.md
53                                 DNS, IP and Router 2021-06-30  TRUE     content/notes/hardware/aboutIp.md
124                   Paradox of enrichment with Sage 2019-07-20  TRUE        content/notes/sage/poe_sage.md
```

I'll see what I do with those later.
For now, I  move them somewhere else.
Let's re-execute the code.


```R
lsf <- get_file_list("content/notes")
yfm <- lapply(lsf, \(x) c(yaml_front_matter(x), old_path = x)) 
yfm
# [[1]]
# [[1]]$title
# [1] "Lack of boot space"
# 
# [[1]]$date
# [1] "2023-03-23"
# 
# [[1]]$tags
# [1] "Ubuntu" "apt"    "boot" 
#
# [[1]]$old_path
# [1] "content/notes/apt/lackofbootspace.md"

...

# [[124]]
# [[124]]$title
# [1] "GitHub pages & custom domain name? Don't forget CNAME! `[SOLVED]`"
# 
# [[124]]$date
# [1] "2020-02-04"
# 
# [[124]]$tags
# [1] "GitHub pages" "CNAME"       
# 
# [[124]]$old_path
# [1] "content/notes/webhosting/caneghpages/index.md"
```

I have all metadata in a list, including dates and titles. 
Note that with this, I can even analyze the tags I use!
What is missing is a tiny function to keep the 3 first words of the title.

```R
keep_3_words <- function(x) {
    tmp <- strsplit(x, "[[:punct:] ]")[[1]]   # split words/ remove punctuation
    out <- tmp[grepl("^[[:alnum:]]+$", tmp)]  # keep only alphanumeric symbols
    out[seq(1, min(length(out), 3))] |>       # max 3 words
     tolower() |>
     paste(collapse = "_")
}
# this add the new folder name for the previous lins
yfm2 <- lapply(yfm, \(x) c(x, new_folder = paste(x$date, keep_3_words(x$title), sep = "_")))
```

Next, I create the new directories and move files to their new location. 
For simplicity, I use [`lubridate`](https://CRAN.R-project.org/package=lubridate) to extract years and months.
Also, I use a safety net by generating a second folder notes, `notes2`, that will replace `notes` when everything is done. 

```R 
library(lubridate)
new_dir <- "content/notes2"
dir.create(new_dir, showWarnings = FALSE)
res <- lapply(
    yfm2,
    \(x) {
        new_folder <- file.path(
            new_dir,
            year(x$date),
            sprintf("%02d", month(x$date)),
            x$new_folder
        ) # that's the new path
        dir.create(new_folder, recursive = TRUE, showWarnings = FALSE)
        new_path <- file.path(
            new_folder, 
            "index.md"
        )
        file.copy(x$old_path, new_path) # add index.md
        invisible(TRUE)
    }
) 
```


# Migrating asset files

This is the trickiest part.
To migrate the asset files, I need to locate them and determine the posts they were used in. 
As I did not use assets in a consistent fashion, I need to go through all note contents and look for the assets name.
I need to record this information to replace the links and then migrate the files.
First, let's locate the file(s), note that for some of the file manipulation I use [`fs`](https://CRAN.R-project.org/package=fs).


```R
lsa <- list.files("content/notes", recursive = TRUE, full.names = TRUE)
lss <- lsa[!grepl(pattern = "\\.md$", lsa)]
library(fs)
lss |> fs::path_ext() |> table()
# bib  png    R webm webp yaml
#   3   44    1    8    1    1 
```

58 asset files, noted!
Let's read all files in `notes2` and then match possible links using the filenames above. 

```R
lsb <- lss |> fs::path_file()
ls_res <- list()
for (j in seq(lsb)) {
    cat(j, "/", length(lsb), "  \r")
    # pattern to match (the entire path)
    pat <- paste0("\\.?[[:alnum:]]*/[/[:alnum:]]*", lsb[j]) # potential matches; does not match filename only, minimum ./filename; does not work for with ../
    fls <- get_file_list("content/notes2")
    res <- fls |>
    lapply(\(x) {
        tmp <- stringr::str_extract(readLines(x), pat)
        tmp[!is.na(tmp)]
    }) # extract matches
    idx <- lapply(res, \(x) length(x) > 0) |> unlist() |> which()
    ls_res[[j]] <- data.frame(
        file =  fls[idx],
        asset_path = lss[j],
        old_link = res |> unlist(),
        new_link = file.path("./assets", lsb[j])
    )
}
tb_assets <- ls_res |> 
    do.call(what = rbind) |> 
    dplyr::distinct() # I only need one instance given the search and replace strategy that I use below
tb_assets
#                                                                file                                                      asset_path                                old_link                      new_link
# 1  content/notes2/2018/09/2018-09-29_prompt_before_opening/index.md                    content/notes/atom/assets/limitfilesize.webm   /notes/atom/assets/limitfilesize.webm   ./assets/limitfilesize.webm
# 2          content/notes2/2018/09/2018-09-11_more_than_one/index.md                           content/notes/atom/assets/locales.png          /notes/atom/assets/locales.png          ./assets/locales.png
# 3             content/notes2/2018/09/2018-09-19_i_love_the/index.md                     content/notes/atom/assets/multicursors.webm    /notes/atom/assets/multicursors.webm    ./assets/multicursors.webm
...
# 62          content/notes2/2021/01/2021-01-29_time_to_talk/index.md       content/notes/webhosting/aboutthiswebsite/look_012021.png                       ./look_012021.png      ./assets/look_012021.png
# 63          content/notes2/2021/01/2021-01-29_time_to_talk/index.md   content/notes/webhosting/aboutthiswebsite/shared_on_slack.png                   ./shared_on_slack.png  ./assets/shared_on_slack.png
# 64   content/notes2/2020/02/2020-02-04_github_pages_custom/index.md                  content/notes/webhosting/caneghpages/cname.png                             ./cname.png            ./assets/cname.png
```

Below is the code that I use to perform the search and replace

```R
for (i in seq_len(nrow(tb_assets))) {
    cat(i, "/", nrow(tb_assets), "  \r")
    # create folder and add asset file 
    new_folder <- file.path(tb_assets$file[i] |> fs::path_dir(), "assets")
    if (!dir.exists(new_folder)) dir.create(new_folder)
    file.copy(tb_assets$asset_path[i], new_folder)
    # replace pattern with gsub
    readLines(tb_assets$file[i]) |> 
        gsub(pattern = tb_assets$old_link[i], replacement = tb_assets$new_link[i]) |> 
        writeLines(con = tb_assets$file[i])
}
```

That worked pretty well. 
The only final tweak was to modify cross references among notes.
Once completed, `notes` was deleted and `notes2` became `notes`.
Even though I deleted and created files, `git` was clever enough to figure out which files where renamed.

This took some time but I am happy with the new organization. 
Plus I now have code to analyze the content of my notes.
All the work was completed in commit [`dae779a`](https://github.com/KevCaz/KevCaz.github.io/commit/dae779adf7a444d8e7d89177d6a8d0295add27aa).
