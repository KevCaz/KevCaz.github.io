---
title: "The fontawesome5 Latex package"
date: 2019-10-01
tags: [latex, Font Awesome]
---


[Font Awesome](https://fontawesome.com/) is a very popular icon set used on
websites to improve the visual grepping. For instance, whenever I point to a
GitHub repository on my website I use `<i class="fa fa-github"
aria-hidden="true"></i>` to add the following icon <i class="fa fa-github"
aria-hidden="true"></i> that indicates, to people familiar with GitHub, the kind
of content the link points to.

Visual grepping is somewhat powerful and months ago I started to use this icon set in my CV (see <i class="fa fa-github" aria-hidden="true"></i> [KevCaz/CV_latex](https://github.com/KevCaz/CV_latex)) via the `fontawesome` Latex package that was maintained by Xavier Danaux (see <i class="fa fa-github" aria-hidden="true"></i> [xdanaux/fontawesome-latex](https://github.com/xdanaux/fontawesome-latex)). I'm writing this note to mention that today I switched to the `fontawesome5` :package: available on the CTAN at the follwing URL: https://www.ctan.org/pkg/fontawesome5. It works similarly as `fontawesome` but includes more icons!

In brief, once loaded:

```tex
\usepackage{fontawesome5}
```

icons are added using `\faNameOfIcons`, for instance to include  <i class="fa fa-github" aria-hidden="true"></i>  I use `\faGithub`, pretty simple! If you want to know how to use other icons there are all listed in the [package documentation](http://ctan.math.ca/tex-archive/fonts/fontawesome5/doc/fontawesome5.pdf), pretty neat :smile:!
