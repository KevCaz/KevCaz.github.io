---
title: "Inline Math with KaTeX"
date: 2020-04-19
tags: [Katex, Hugo, goldmark, Markdown, Math]
math: true
---

For this blog, I am currently using Hugo v0.62.2, and since v0.60 Hugo by
default, [goldmark](https://github.com/yuin/goldmark) is used under the hood to
render Markdown to HTML. Moreover, to write math I am now using
[Katex](https://katex.org/) which is pretty fast compared to other math
typesetting libraries!

Today, as I was doing some math on my blog, I realize that inline math was not rendered. At first I thought that this [was a conflict between KaTeX and goldmark](https://github.com/gohugoio/hugo/issues/6544) but actually, I needed to tweak the `delimiters` KaTeX option. Fortunately, [KaTeX options](https://katex.org/docs/options.html) are well documented and so is the [auto-render extension](https://katex.org/docs/autorender.html) (plus, there is an answer on [<i class="fab fa-stack-overflow" aria-hidden="true"></i>](https://stackoverflow.com/questions/27375252/how-can-i-render-all-inline-formulas-in-with-katex) about this). Without further ado, Below is the [partial](https://gohugo.io/templates/partials/) that [I am now using](https://github.com/KevCaz/funkyflex/blob/master/layouts/partials/math.html) that is added to the head of every page that has `math:true` in the YAML front matter. In the code block below I've highlighted how I set up the `delimiters` option so as to use `$$` for math in display mode and `$` for inline math.



```html {hl_lines=["16-19"]}
<!-- Katex css -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq" crossorigin="anonymous">

<!-- The loading of KaTeX is deferred to speed up page rendering -->
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js" integrity="sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz" crossorigin="anonymous"></script>

<!-- To automatically render math in text elements, include the auto-render extension: -->
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.min.js" integrity="sha384-kWPLUVMOks5AQFrykwIup5lo0m3iMkkHrD0uJ4H5cjeGihAutqP0yW0J6dpFiVkI"
crossorigin="anonymous"
onload='renderMathInElement(document.body);'></script>


<script>
    document.addEventListener("DOMContentLoaded", function() {
        renderMathInElement(document.body, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
            ]
        });
    });
</script>
```

For instance `$\sum_i^nd_i$` gives $\sum_i^nd_i$ whereas `$$\sum_i^nd_i$$` yields the following equation

$$\sum_i^nd_i$$

By the way that `\tag` can be used to number the equation and so `$$\sum_i=1^n \tag{1}$$` gives

$$\sum_i^nd_i \tag{1}$$

but looks like that so far, `\tag` [do not handle automated referencing](https://github.com/KaTeX/KaTeX/pull/1309), this may change in the future, we'll see!

<br>

That's all folks :tada:! Hope this can be helpful!