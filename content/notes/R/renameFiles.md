---
title: "Renaming files with `mv`, `rename`  and `R`"
date: 2020-09-08
tags: [R, mv, rename]
---


For a project I have been working on for quite some time now, I ended up
handling thousands of files and as I initially named them poorly, I had to
rename a bunch of them... Basically, I needed to do two kind of file name
manipulations. 

1. **problem 1** is kind of trivial : replacing the same part of the
file names by another, e.g. renaming `res_old1_001.txt`, `res_old1_002.txt`, ...,
`res_old1_010.txt` to `res_new2_001.txt`, `res_new2_002.txt`, ...,
`res_new2_010.txt`.

2. **problem 2** is somewhat trickier as the parts to be replaced vary from a
file to another and so are the replacing parts. This happens when you have
numbers in your file names and want to increase or decrease those numbers by a
fixed amount, e.g. renaming `res_simu1_001.txt`, `res_simu1_002.txt`, ...,
`res_simu1_010.txt` to  `res_simu1_021.txt`, `res_simu1_022.txt`, ...,
`res_simu1_030.txt` (i.e., adding 20 to the last part of the file name). 


In what follows I show how I solved these issues with `mv`, `rename`  and <i
class="fab fa-r-project"></i>, but keep in mind that there are various ways to
do this in many (if not all) programming languages.



## Using bash commands to solve **problem 1**

On Unix systems, the [command `mv`](https://shapeshed.com/unix-mv/) allows you
to rename and relocate a file pretty easily[^tuto] : all you have to do is to
give the current path to the file to be renames and the new one, like so: `mv
path1/name1.txt path2/name2.txt`. In order to rename a bunch files, you can
write a small bash script. For instance, the following lines solve **problem 1**:


```sh
for i in {001..10}
do
mv '/path/to/folder1/res_old1_'$i'.txt' '/path/to/folder2/res_new2_'$i'.txt'
done
```


Another option is to use [`rename`](https://packages.debian.org/stretch/rename),
which is a command line tool based on a [perl](https://www.perl.org/) package.
What I like about it is that you can rename file in a very similar fashion that
you replace character strings with the stream editor
[sed](https://www.gnu.org/software/sed/manual/sed.html). 


Below I install `rename` and use it to solve **problem 1**:

```sh
$ apt-get install rename
$ rename 's/old1/new2/' /path/to/folder1/res_old1_*.txt
```

For more examples, see this post/tutorial on
[computerhope](https://www.computerhope.com/unix/rename.htm).



[^tuto]: There are several comprehensive tutorials available on line that
illustrate how to use the `mv` command, for instance [this one on Linuxize](
https://linuxize.com/post/how-to-rename-files-in-linux/).






## Using R to solve **problem 2**

Below, I use <i class="fab fa-r-project"></i> to solve **problem 2**. I would
like to stress that I am using <i class="fab fa-r-project"></i> simply because I
am more more confortable doing this manipulation with R. Obviously there are
ways of accomplishing this with many programming language and I believe that
this is totally doable with `rename`. That being said, this is also a good
opportunity to exemplify how to use <i class="fab fa-r-project"></i> can to
rename files. 

First, let's list the file in `/path/to/folder1/`


```R
R> fls <- list.files("/path/to/folder1/", recursive = TRUE, full.names = TRUE)
R> head(fls)
[1] "/path/to/folder1/res_simu1_001.txt"
[2] "/path/to/folder1/res_simu1_002.txt"
[3] "/path/to/folder1/res_simu1_003.txt"
[4] "/path/to/folder1/res_simu1_004.txt"
[5] "/path/to/folder1/res_simu1_005.txt"
[6] "/path/to/folder1/res_simu1_006.txt"
```

Note that I purposely changed the original long path to `/path/to/folder1/` for
the sake of clarity. So now what I am looking for is to rename
`res_simu1_01.txt` to `res_simu1_21.txt`, `res_simu1_02.txt' to
`res_simu1_22.txt` and so forth. To do so, I need to extract the number add 20
and then rename the file, and I wrote the following function that does the job!

```R
R> myrename <- function(x, offset) {
R>   # this is one way to extract the number identifying 
R>   # this would work even if there are numbers in the name of your files
R>   val <- sub("^.*_([0-9]{3})\\.txt$", "\\1", x)
R>   # add 20 and get a character string correclty formatted
R>   rep <- sprintf("%03d", as.numeric(val) + offset)
R>   # rename files
R>   file.rename(x, sub("[0-9]{3}", rep, x))
R> }
```

where `x` is a file name and `offset` allows one to chose the number to be added. So, in order to solve **problem 2**, I can use `apply()` as follows : 

```R
R> lapply(fls, myrename, 20)
```

And I can actually add any number, including negative ones. That said, with this
solution it may be important to ensure that numbers obtained after addition
remain within [0; 1000], otherwise you may not obtained what you were looking
for. Even more important, you should check whether new files names are existing
file name, cause this could be quite problematic. For instance, in the example
above, if I were to use `lapply(fls, myrename, 20)`, then `res_simu1_01.txt`
would be renamed `res_simu1_06.txt` and as `res_simu1_01.txt` is the first file
to be renamed, `res_simu1_06.txt` would be overwritten. One way to avoid this is
to change the order in which files are handled, e.g. 

```R
R> lapply(fls[6:10], myrename, 5)
R> lapply(fls[1:5], myrename, 5)
```

Here, `myrename()` was designed specifically to solve **problem 2** but it
would be relatively easy to make it more general, that is writting a few extra
lines to handle a wider range of patterns and to check for potential problems
while renaming (e.g. the one we just described). 