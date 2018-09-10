---
title: More than one langage
date: 2018-09-14
draft: true
---

I spent most on my coding a writing time on [Atom](https://atom.io/) and
I write in both English and French, so I needed to get [spell-check](https://github.com/atom/spell-check),   time

here it is [explained on the README](https://github.com/atom/spell-check#spell-check-package)

[http://hunspell.github.io/](hunspell) hosted on [Github](https://github.com/hunspell/hunspell)

```
❯ ls /usr/share/hunspell
en_US.aff en_US.dic
```

I install the following

```
sudo apt-get install hunspell-fr-modern/testing
```

and now I have

```
❯ ls /usr/share/hunspell
en_US.aff  fr.aff     fr_BE.dic  fr_CA.dic  fr_CH.dic  fr_FR.aff  fr_LU.aff  fr_MC.aff
en_US.dic  fr_BE.aff  fr_CA.aff  fr_CH.aff  fr.dic     fr_FR.dic  fr_LU.dic  fr_MC.dic
```

Note that this is also use for Firox and thunderbird, quite usefull!!
