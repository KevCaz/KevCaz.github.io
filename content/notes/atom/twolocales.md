---
title: More than one langage with spell-check
date: 2018-09-12
draft: false
---

I spend most on my coding and writing time on [Atom](https://atom.io/) and as
I write in both English and French I use two dictionaries with [spell-check](https://github.com/atom/spell-check).
Well, it actually took me a while to understand how to use two different locales
on my Debian machine simply because I was lazy enough to not read the [README
on the Github repository of spell-check](https://github.com/atom/spell-check#debian-ubuntu-and-mint).
Out of curiosity, I checked out what [hunspell](http://hunspell.github.io/) is
(note that the project is hosted on [Github](https://github.com/hunspell/hunspell))
and then I checked the dictionaries currently installed on my device:

```sh
❯ ls /usr/share/hunspell
en_US.aff en_US.dic
```

So, in order to use French dictionaries, I installed the following package:

```sh
❯ sudo apt-get install hunspell-fr-modern/testing
```

Then I re-check the dictionaries installed:

```sh
❯ ls /usr/share/hunspell
en_US.aff  fr.aff     fr_BE.dic  fr_CA.dic  fr_CH.dic  fr_FR.aff  fr_LU.aff  fr_MC.aff
en_US.dic  fr_BE.aff  fr_CA.aff  fr_CH.aff  fr.dic     fr_FR.dic  fr_LU.dic  fr_MC.dic
```

I was then able to use then in [spell-check](https://github.com/atom/spell-check)

![](/notes/atom/locales.png)

Everything works just fine now! Note that [hunspell](http://hunspell.github.io/)
is also use for Firefox and Thunderbird :smirk:!
