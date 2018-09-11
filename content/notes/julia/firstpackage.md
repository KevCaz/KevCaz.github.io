---
title: install packages with Julia
date: 2018-09-20
---

There are sevral ways to install packages in Julia. One is to use the
REPL mode by typing "]"

```julia
add name package
```

or directl

```julia
import Pkg
Pkg.add("DifferentialEquations")
```

using two packages

```julia
using DifferentialEquations, Plots
```

Differecnen using vs

update package

```
update DifferentialEquations
```

```
(v1.0) pkg> update DifferentialEquations
  Updating registry at `~/.julia/registries/General`
  Updating git-repo `https://github.com/JuliaRegistries/General.git`
 Resolving package versions...
 Installed StochasticDiffEq ──── v5.8.0
 Installed BandedMatrices ────── v0.6.0
 Installed Plots ─────────────── v0.20.2
 Installed Distributions ─────── v0.16.4
 Installed Optim ─────────────── v0.17.1
 Installed RecursiveArrayTools ─ v0.18.1
 Installed LazyArrays ────────── v0.2.1
 Installed DiffEqBase ────────── v4.25.0
 Installed DataStructures ────── v0.12.0
 Installed OrdinaryDiffEq ────── v4.12.0
 Installed GR ────────────────── v0.34.1
  Updating `~/.julia/environments/v1.0/Project.toml`
  [91a5bcdd] ↑ Plots v0.20.1 ⇒ v0.20.2
  Updating `~/.julia/environments/v1.0/Manifest.toml`
  [aae01518] ↑ BandedMatrices v0.5.2 ⇒ v0.6.0
  [864edb3b] ↑ DataStructures v0.11.1 ⇒ v0.12.0
  [2b5f629d] ↑ DiffEqBase v4.24.3 ⇒ v4.25.0
  [31c24e10] ↑ Distributions v0.16.3 ⇒ v0.16.4
  [28b8d3ca] ↑ GR v0.33.1 ⇒ v0.34.1
  [5078a376] + LazyArrays v0.2.1
  [429524aa] ↑ Optim v0.17.0 ⇒ v0.17.1
  [1dea7af3] ↑ OrdinaryDiffEq v4.11.1 ⇒ v4.12.0
  [91a5bcdd] ↑ Plots v0.20.1 ⇒ v0.20.2
  [731186ca] ↑ RecursiveArrayTools v0.18.0 ⇒ v0.18.1
  [789caeaf] ↑ StochasticDiffEq v5.7.1 ⇒ v5.8.0
  Building GR ────────→ `~/.julia/packages/GR/joQgG/deps/build.log`
```
