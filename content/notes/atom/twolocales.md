---
title: More than one langage
date: 2018-09-12
draft: false
---

I spend most on my coding and writing time on [Atom](https://atom.io/) and as
I write in both English and French I use two dictionaries with [spell-check](https://github.com/atom/spell-check).
Well it actually took me a while to understand how to use locales, it is
actually [well-explained on the README](https://github.com/atom/spell-check#debian-ubuntu-and-mint)
so out of curiosity I checked out what [hunspell](http://hunspell.github.io/) is
(note that the porrection is hosted on [Github](https://github.com/hunspell/hunspell))
and then I check the dictionaries currently installed:

```sh
❯ ls /usr/share/hunspell
en_US.aff en_US.dic
```

In order to use French dictionaries, I install the following

```sh
❯ sudo apt-get install hunspell-fr-modern/testing
```

When now I check again, I had:

```sh
❯ ls /usr/share/hunspell
en_US.aff  fr.aff     fr_BE.dic  fr_CA.dic  fr_CH.dic  fr_FR.aff  fr_LU.aff  fr_MC.aff
en_US.dic  fr_BE.aff  fr_CA.aff  fr_CH.aff  fr.dic     fr_FR.dic  fr_LU.dic  fr_MC.dic
```

So I added to the atom [spell-check](https://github.com/atom/spell-check

![](/notes/atom/locales.png)

Everything is Ok now! Note that this is also use for Firefox and Thunderbird, quite useful!
