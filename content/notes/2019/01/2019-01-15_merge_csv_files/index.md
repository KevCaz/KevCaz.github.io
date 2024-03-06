---
title: "Merge .csv files into a single .xlsx file with ssconvert"
date: 2019-01-15
tags: [GNU, Gnumeric, ssconvert]
---

In a previous note, I explained [how to convert `.xlsx` into `.csv` with ssconvert](/notes/gnu/xlsx2csv/). Today, I wanted to do the reverse operation, so I looked up on the Internet and found [this answer on ubuntu forums](https://ubuntuforums.org/showthread.php?t=2263957): assuming you need to merge `file1.csv` and `file2.csv` into `all.xlsx` (in two separate sheets) then all you have to do is:

```
ssconvert --merge-to=all.xlsx file1.csv file2.csv
```

The short option for `--merge-to=` is `-M` (see `man ssconvert`), so what I did was:

```
$ ssconvert -M landuse.xlsx dataReady/metadata.csv dataReady/occurrence.csv dataReady/fish_species.csv
Adding sheets from file:///home/kevcaz/Github/Studies/streamFish/dataReady/metadata.csv
Adding sheets from file:///home/kevcaz/Github/Studies/streamFish/dataReady/occurrence.csv
Adding sheets from file:///home/kevcaz/Github/Studies/streamFish/dataReady/fish_species.csv
```

Note that I would not use a `.xlsx` file myself, I would rather use three separate `.csv` files. That said, I understand that having a single `.xlsx` file is regarded as a better option by others and I'm glad that I can count on `ssconvert` to take care of the conversion `.xlsx` :left_right_arrow: `.csv`.
