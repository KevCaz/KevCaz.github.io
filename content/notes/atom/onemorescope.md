---
title: One more scope in spell-check
date: 2018-09-26
tags: [Debian, Atom, spell-check]
---

I often use [R markdown](https://rmarkdown.rstudio.com/) within [Atom](https://atom.io/).
By default, spell-check does not check `.Rmd` file and so I needed to add the
corresponding scope to the list of grammars checked. It was a two steps process:

  1. find the scope with the command: `Log cursor scope` (use the [command-palette](https://flight-manual.atom.io/getting-started/sections/atom-basics/#command-palette));

  2. copy-paste the scope and add it to the list of scopes that are already checked.  


{{< screencast src = "/notes/atom/assets/spellcheck.webm" >}}
