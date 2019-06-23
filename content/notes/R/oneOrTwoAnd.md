---
title: "How many & or |?"
date: 2018-11-21
tags: [R, bite operators, logical operators]
---


Recently, I reviewed a paper that introduces a package, so I [reviewed the code](https://github.com/txm676/sars/pull/24) and noticed that the authors
often used `&&` (and) and `||` (or) whereas only `&` and `|` were required. I guess is due to:

1. other programming langage;
2. the fact that for vectors of one element in R `&` and `&&` are equivalent (same for `|` and `||`).

Regarding point 1, we could take [C](https://en.wikipedia.org/wiki/C_(programming_language)
) as an example. In C, `&` and `|` are [bitewise operators](https://en.wikipedia.org/wiki/Bitwise_operations_in_C) while [`&&` are `||` logical ones](https://stackoverflow.com/questions/49617159/difference-between-and-in-c)
for instance `4 & 7` gives `1` but `4 && 7` gives `TRUE`. [In R, things are a
bit different](https://stackoverflow.com/questions/16027840/whats-the-differences-between-and-and-in-r
): `&&` and `||` only test the first element of two vectors:

```R
R> c(0, 0) && c(1, 0)
[1] FALSE
R> c(0, 1) && c(1, 0)
[1] FALSE
R> c(1, 0) && c(1, 0)
[1] TRUE
```

whereas `&` and `|` perform logical tests element-wise:

```R
R> c(0, 0) & c(1, 0)
[1] FALSE FALSE
R> c(0, 1) & c(1, 0)
[1] FALSE FALSE
R> c(1, 0) & c(1, 0)
[1]  TRUE FALSE
```

and a warning signal is returned when vector size do not match:

```R
R> c(1, 0) & c(1, 0, 1)
[1]  TRUE FALSE  TRUE
Warning message:
In c(1, 0) & c(1, 0, 1) :
  longer object length is not a multiple of shorter object length
```

Using `&&` and `||` for vectors of 1 element may not be a big deal after all,
but if you are actually trying to do element-wise logical tests and you use
`&&` and `||` it could easily generate errors that go under the radar, so you
should better be aware of this!
