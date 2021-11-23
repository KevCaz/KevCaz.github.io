---
title: "Matplotlib could not be imported by pyimport `[SOLVED]`"
date: 2021-11-23
categories: [installation]
tags: [julia, python, PyPlot]
---

I have been experiencing an issue following a recent Python update. Basically, when I was trying to use [`PyPlot`](https://github.com/JuliaPy/PyPlot.jl), I got the following message error. 


```jl
julia> using PyPlot
ERROR: InitError: PyError (PyImport_ImportModule

The Python package matplotlib could not be imported by pyimport. Usually this means
that you did not install matplotlib in the Python version being used by PyCall.

PyCall is currently configured to use the Python version at:

/usr/bin/python3

and you should use whatever mechanism you usually use (apt-get, pip, conda,
etcetera) to install the Python package containing the matplotlib module.

One alternative is to re-configure PyCall to use a different Python
version on your system: set ENV["PYTHON"] to the path/name of the python
executable you want to use, run Pkg.build("PyCall"), and re-launch Julia.

Another alternative is to configure PyCall to use a Julia-specific Python
distribution via the Conda.jl package (which installs a private Anaconda
Python distribution), which has the advantage that packages can be installed
and kept up-to-date via Julia.  As explained in the PyCall documentation,
set ENV["PYTHON"]="", run Pkg.build("PyCall"), and re-launch Julia. Then,
To install the matplotlib module, you can use `pyimport_conda("matplotlib", PKG)`,
where PKG is the Anaconda package that contains the module matplotlib,
or alternatively you can use the Conda package directly (via
`using Conda` followed by `Conda.add` etcetera).

) <class 'ImportError'>
ImportError("/home/kevcaz/Applications/julia/usr/bin/../lib/libstdc++.so.6: version `GLIBCXX_3.4.29' not found (required by /usr/lib/python3/dist-packages/kiwisolver.cpython-39-x86_64-linux-gnu.so)")
  File "/home/kevcaz/.local/lib/python3.9/site-packages/matplotlib/__init__.py", line 208, in <module>
    _check_versions()
  File "/home/kevcaz/.local/lib/python3.9/site-packages/matplotlib/__init__.py", line 202, in _check_versions
    module = importlib.import_module(modname)
  File "/usr/lib/python3.9/importlib/__init__.py", line 127, in import_module
    return _bootstrap._gcd_import(name[level:], package, level)

Stacktrace:
 [1] pyimport(name::String)
   @ PyCall ~/.julia/packages/PyCall/3fwVL/src/PyCall.jl:550
 [2] pyimport_conda(modulename::String, condapkg::String, channel::String)
   @ PyCall ~/.julia/packages/PyCall/3fwVL/src/PyCall.jl:708
 [3] pyimport_conda
   @ ~/.julia/packages/PyCall/3fwVL/src/PyCall.jl:707 [inlined]
 [4] __init__()
   @ PyPlot ~/.julia/packages/PyPlot/XaELc/src/init.jl:185
 [5] _include_from_serialized(path::String, depmods::Vector{Any})
   @ Base ./loading.jl:674
 [6] _require_search_from_serialized(pkg::Base.PkgId, sourcepath::String)
   @ Base ./loading.jl:760
 [7] _require(pkg::Base.PkgId)
   @ Base ./loading.jl:998
 [8] require(uuidkey::Base.PkgId)
   @ Base ./loading.jl:914
 [9] require(into::Module, mod::Symbol)
   @ Base ./loading.jl:901
during initialization of module PyPlot
```

Pretty comprehensive, isn't it? So as you may have noticed, the problem is the interaction between Julia and Python. Note that `PyPlot` depends on [`PyCall`](https://github.com/JuliaPy/PyCall.jl) (a package designed to call Python functions from Julia) and PyPlot actually depends on Python package [`matplotlib`](https://github.com/matplotlib/matplotlib).

As I was not so sure whether I was [managing my Python packages the right way](https://opensource.com/article/19/4/managing-python-packages), I decided to read a few of articles on the topic. As it turned out, my strategy that consists in only using `pip` was a good one and I decide to start by updating my packages. But this did not solve the issue. My next move was to try out thre alternative described in the error message and so I first tried this one


> One alternative is to re-configure PyCall to use a different Python
version on your system: set ENV["PYTHON"] to the path/name of the python
executable you want to use, run Pkg.build("PyCall"), and re-launch Julia.


I checked the info about my local version `matplotlib`.


```sh
$ pip show matplotlib     
Name: matplotlib
Version: 3.5.0
Summary: Python plotting package
Home-page: https://matplotlib.org
Author: John D. Hunter, Michael Droettboom
Author-email: matplotlib-users@python.org
License: PSF
Location: /home/kevcaz/.local/lib/python3.9/site-packages
Requires: cycler, fonttools, kiwisolver, numpy, packaging, pillow, pyparsing, python-dateutil, setuptools-scm
Required-by: 
```

So I though using that setting `ENV["PYTHON"]` to `/usr/bin/python3.9` and then rebuild `PyCall` and then `PyPlot` would do the trick, but it did not (not sure why). So I decided to use the other alternative: 

> Another alternative is to configure PyCall to use a Julia-specific Python
distribution via the Conda.jl package (which installs a private Anaconda
Python distribution), which has the advantage that packages can be installed
and kept up-to-date via Julia.  As explained in the PyCall documentation,
set ENV["PYTHON"]="", run Pkg.build("PyCall"), and re-launch Julia.

which basically means that I now let Julia uses its Julia-specific Python
distribution, meaning that I will probably have duplicated package on my machine, which for me isn't a big deal. So I first did 

```julia
julia> ENV["PYTHON"]=""
julia> using Pkg
julia> Pkg.build("PyCall") 
```

then I re-launched Julia and... 

```julia
julia> using PyPlot
[ Info: Precompiling PyPlot [d330b81b-6aea-500a-939a-2ce795aea3ee]
[ Info: Installing matplotlib via the Conda matplotlib package...
[ Info: Running `conda install -y matplotlib` in root environment
Collecting package metadata (current_repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /home/kevcaz/.julia/conda/3

  added / updated specs:
    - matplotlib

[...]
```

... :tada: it worked! 