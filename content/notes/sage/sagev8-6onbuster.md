---
title: SageMath version 8.6 on Debian Buster
date: 2019-07-18
tags: [SageMath, installation, Debian]
---

This is a short note to follow up on a [previous one](/notes/sage/installsage) where I reported the steps to install the latest release of [Sage](http://www.sagemath.org/) using the GitHub repository. At that time Sage version 8.3 was not available on Debian Buster but now version 8.6 is available on Buster! Given the set of dependencies of Sage, I guessed it was quite a challenge to pack it up, so :clap: to the relentless Debian package maintainers because thanks to them all I need to install Sage is:

```bash
$ apt-get install sagemath
```

A bunch of packages are installed but the process is way faster than the > 3 hours of compilation using the GitHub repository. After this `sage` can be used in a terminal:

```python
❯ sage
┌────────────────────────────────────────────────────────────────────┐
│ SageMath version 8.6, Release Date: 2019-01-15                     │
│ Using Python 2.7.15. Type "help()" for help.                       │
└────────────────────────────────────────────────────────────────────┘
sage:
```

Note that using GitHub remains a valid approach to install the latest version (currently 8.8 for the stable release and a [beta for version 8.9 is also available](https://github.com/sagemath/sage/releases)).

By the way, there is a very insightful piece on [SageMath
blog](http://sagemath.blogspot.com/2019/05/should-i-resign-from-my-full-professor.html)
written by the leader of the project, William Stein, where he relates part of
the story of SageMath, details challenges he has been facing for years to fund
SageMath while being full time professor in Number Theory and explains why he
has recently decided to dedicate his time to [CoCalc](https://cocalc.com/).
