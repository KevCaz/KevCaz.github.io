---
title: "Build Julia 1.0.0 from sources on Debian Testing"
date: 2018-09-06
categories: [installation]
tags: [installation, setup, julia]
---

Many of may already about [Julia](https://julialang.org/). Well I am not yet a regular user but performances are impressive and the langage is well-thought and I therefore pay careful attention to what's happening on Julia. Recently [version 1.0.0](https://juliacomputing.com/press/2018/08/10/Julia-1.0-Released.html) was released, and for me it was time to use Julia more.  I try it from tme to times to do. The thing is that on Debian Testing https://julialang.org/

> sudo apt-get julia

https://packages.debian.org/fr/sid/julia 0.7.0-2
https://packages.debian.org/fr/strecth/julia 0.4.7.9

will give you
and sid 0.7.2 but anticipated 1.0 is already here! And I wanted to work
on the newest verison. Fortunately the project is maintained on
Github and the website offers a [Generic Linux Binaries for x86](https://julialang.org/downloads/platform.html#generic-binaries) a the readme show you how to build it. I wanted to compile for my own machine. Fortunalty indication are provided on the README of the GH repo, I simply followed them.

```
git clone https://github.com/JuliaLang/julia.git
```

I took a couple of seconds. Then checkout

```
git checkout v1.0.0
```

And then make!

```
make
```


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

The build will automatically check for the existence of Make.user and use it if it exists. Building Julia requires 5GiB of disk space and approximately 2GiB of virtual memo

```
./julia
```

I added an alias to make my life easier, in my `.zprofile` (available here
  ) I added:

```
alias julia='~/Github/Applications/julia/julia'
```

I like the idea of having but not integrated and different library download.
It makes sense when version for debian will be on a ppa (like unbuntu)
soon have verison 1.0.0 available for testng


![](/notes/julia/juliaV1.png)
