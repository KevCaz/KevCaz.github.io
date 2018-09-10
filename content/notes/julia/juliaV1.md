---
title: "Build Julia 1.0.0 from sources on Debian Testing"
date: 2018-09-06
categories: [installation]
tags: [julia, installation, makefile]
---

You may have already heard about [Julia](https://julialang.org/). Well, I am not
yet a regular user but Julia's performances are impressive and the langage is
well-thought and the community is growing super fast, I therefore pay careful
attention to what's happening on their side. Recently, [version 1.0.0](https://juliacomputing.com/press/2018/08/10/Julia-1.0-Released.html)
was released, so I decided to replace my version [local version v0.4.7.9](https://packages.debian.org/fr/strecth/julia) I installed with
`apt-get` (note that currently [v0.7.0-2 is available for Cid](https://packages.debian.org/fr/sid/julia)).

There are two ways to install Julia for Debian without a package manager.
First is to go on the website and [Generic Linux Binaries for x86](https://julialang.org/downloads/platform.html#generic-binaries). Second
is to follow the guidelines on the [README file of the Github repository](https://github.com/JuliaLang/julia) to compile Julia
from sources. This is what I did, starting by cloning the repo:

```
git clone https://github.com/JuliaLang/julia.git
```

This took a couple of seconds, then I switch to version 1:

```
git checkout v1.0.0
```

And then make!

```
make
```

It took some time:

```
REPL  ───────────  1.126812 seconds
Statistics  ─────  0.311747 seconds
Stdlibs total  ── 65.668191 seconds
Sysimage built. Summary:
Total ───────  88.168324 seconds
Base: ───────  22.498423 seconds 25.5176%
Stdlibs: ────  65.668191 seconds 74.4805%
    JULIA usr/lib/julia/sys-o.a
Generating precompile statements... 762 generated in  37.767039 seconds
    LINK usr/lib/julia/sys.so
    CC usr/lib/libccalltest.so
>>> elapsed time 1h18m10s
```

**1h18m10s**, as mentioned on the README: "Building Julia requires 5GiB of
disk space and approximately 2GiB of virtual memory". After the build,
`./julia` worked just fine and to ease mu use of Julia, I added an alias in
my `.zprofile`:
```
alias julia='~/Github/Applications/julia/julia'
```

So now when I enter `julia` in my terminal, I get:


![](/notes/julia/juliaV1.png)


## Nice! :fireworks: :fire: :star2:
