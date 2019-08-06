---
title: "Variables in mathematical expressions in a plot with R"
date: 2019-08-02
tags: [R, plot, expression, variable, base plot]
---

It is rather straightforward to [add mathematical annotation in a plot with R](https://stat.ethz.ch/R-manual/R-devel/library/grDevices/html/plotmath.html). However, I have noted that people struggle with the two following :

1. combining mathematical expression and text;
2. using variables' values within an expression.

The first one is actually easy, you just need to add and quotation marks to add text in `expression` and to use `*` to concatenate elements.

```R
plot(c(0,1), c(0,1), type = "n")
text(0.5, .5, labels = expression(delta == "cool"+2+italic("super")*bold("cool")+3+beta), cex = 3)
```

![](/notes/R/assets/expression.png)

For the second problem, one should use either `bquote` or `substitute` (check out the documentation of these function) [as explained on <i class="fa fa-stack-overflow" aria-hidden="true"></i>](https://stackoverflow.com/questions/14074260/using-an-expression-in-plot-text-printing-the-value-of-a-variable-rather-than?lq=1). Below is an example using text, text format and variables:


```R
delta <- 10
plot(c(0,1), c(0,1), type = "n")
text(0.5, .75, labels = bquote(beta^j == .(delta)+bold("h")), cex = 4)
text(0.5, .25, labels = substitute(alpha[i] == a + b, list(a = 10)), cex = 4)
```

![](/notes/R/assets/bquote.png)
