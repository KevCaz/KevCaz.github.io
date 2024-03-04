---
title: "Beware of `apply()` outputs!"
date: 2020-07-01
tags: [R, apply]
edits: 
  - Clarify text (2024-03-04)
---


I have been frequently using [`apply()`](https://www.datacamp.com/community/tutorials/r-tutorial-apply-family) for years now, quite happily. But yesterday, I was surprised by how `apply()` works and in this note I'll try to explaining why.

Let's consider the following data frame.

```R
R> df0 <- data.frame(v1 = letters[1:3], v2 = 1:3)
```

And let's assume I need to convert all columns, irrespective of their class, to
columns of character strings (this example is somewhat contrived, but
illustrates well the issue). As passing `df0` to `as.character()` is clearly not
the solution:

```R
R> as.character(df0)
[1] "1:2" "1:2"
```

I would opt for `apply()`:


```R
R> tmp0 <- apply(df0, 2, as.character)
R> tmp0
v1  v2
[1,] "a" "1"
[2,] "b" "2"
[3,] "c" "3"
```

So far, so good. I can obtain the desired data frame by calling `as.data.frame()`:


```R
R> res0 <- as.data.frame(tmp0, stringsAsFactors = FALSE)
v1 v2
1  a  1
2  b  2
3  c  3
R> res0[1, 1]
[1] "a"
```

All good. Note that `stringAsFactors = FALSE` is still needed if you are using R<4.0.0 (otherwise you get factors, not strings). Now let's consider the case with a data frame of one row:


```R
R> df1 <- data.frame(v1 = letters[1], v2 = 1)
R> tmp1 <- apply(df1, 2, as.character)
R> tmp1
v1  v2
"a" "1"
```

no biggie?? Hummm :neutral_face:, let's see


```R
R> class(tmp0)
[1] "matrix"
R> class(tmp1)
[1] "character"
```

So, two different objects even though inputs are very similar... In fairness, this is documented (see `?apply`).

> If each call to ‘FUN’ returns a vector of length ‘n’, then ‘apply’ returns an
> array of dimension ‘c(n, dim(X)[MARGIN])’ if ‘n > 1’. If ‘n’ equals ‘1’,
> ‘apply’ returns a vector if ‘MARGIN’ has length 1 and an array of dimension
> ‘dim(X)[MARGIN]’ otherwise.  If ‘n’ is ‘0’, the result has length 0 but not
> necessarily the ‘correct’ dimension.

Ok, **but** remember that one should handle functions that return outputs of different class for input of the same class with extra care. Below is an example where this is problematic

```R
R> res1 <- as.data.frame(tmp1, stringsAsFactors = FALSE)
R> res1
tmp1
v1    a
v2    1
```

So basically, `res1` does not have the same structure as `res0` (I would expect 2 columns and 1 row) whereas initial inputs were similar... Actually, as I was not aware of this, I introduced a [bug](https://github.com/ropensci/rcites/issues/53) in [rcites](https://cran.r-project.org/web/packages/rcites/index.html) (kindly reported by [Jeewantha Bandara](https://github.com/wajra)), so this specific behavior could be pretty nasty.

There are several ways to avoid this, one is to check the number of rows of the input data frame and deal with the one row case separately. The way I dealt with the bug mentioned above was to use `lapply()` instead, i.e.


```R
as.data.frame(lapply(df0, as.character), stringsAsFactors = FALSE)
v1 v2
1  a  1
2  b  2
3  c  3
as.data.frame(lapply(df1, as.character), stringsAsFactors = FALSE)
v1 v2
1  a  1
```

like so, columns are treated as list elements and `as.data.frame.list()` works just fine on the list returned by the `lapply()` call.

<i class="fab fa-r-project"></i> ... it's ok, I will keep working with you, I would do my best reading the doc carefully... but damn... sometimes you're killing me.
