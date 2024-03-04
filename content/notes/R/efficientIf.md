---
title: "Make your conditional statements efficient!"
date: 2018-10-30
tags: [R, if, efficiency]
---

Recently, I was looking at an R function and found a if statement that looks something like this:

```R
if (length(which(names(df) == "entry")) > 0) {
  # [...]
}
```

I guess this is common way of doing it as it matches well with a way of looking
at the problem: "if I want to test the presence of a column "entry" in a data frame
(`df`), I can check if there is more at least one name that match "entry".

Another way, a shorter one, is to use the operator `%in%`:

```R
if ("entry" %in% names(df)) {
  # [...]
}
```

I personally would have written:

```R
if (sum(names(df) == "entry")) {
  # [...]
}
```

It is less intuitive: basically `sum(names(df) == "entry")` will
return the number of columns names "entry" and as something that is not 0 is
considered as `TRUE`, there is no need for `> 0`.
I would have done so simply because I knew that `sum()` is quite efficient but
I had never do a comparison... until today :smile_cat:! To compare the three
options I wrote a small R script:


```R
df <- data.frame("entry" = 1, "entry2" = 1, "entry3" = 1)
nrep <- 5000000

# option 1
system.time(
for (i in seq_len(nrep)) {
  if (length(which(names(df) == "entry")) > 0) {
    1+1+1
  }
}
)

# option 2
system.time(
for (i in seq_len(nrep)) {
  if ("entry" %in% names(df))  {
    1+1+1
  }
}
)

# option 3
system.time(
for (i in seq_len(nrep)) {
  if (sum(names(df) == "entry"))  {
    1+1+1
  }
}
)
```

Note that `system.time()` is quite convenient to benchmark small pieces of code.
Now, the results:

```R
R> # option 1
   user  system elapsed
  6.332   0.002   6.335

R> # option 2
   user  system elapsed
  5.486   0.000   5.486

R> # option 3
   user  system elapsed
  4.149   0.000   4.149
```

And the winner is... option 3 :trophy:! Interesting enough, dropping calls to functions consistently improves the efficiency but also, a smaller number of call does not mean a more efficient if statement... Not surprisingly, the efficiency of your conditional
statement relies on the efficiency on the functions you call in your statement :imp:!
