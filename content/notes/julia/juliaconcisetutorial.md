---
title: Some Julia language elements to keep in mind 
date: 2023-08-16
categories: [tutorial]
tags: [julia, tutorial, documentation]
---

As I am jumping on a project where I will code mainly in Julia, I thought it was worth spending some time to remind myself about core Julia's features. I have already spent some reading reading [Julia's documentation](https://docs.julialang.org/en/v1/) which is great and definitively worth reading, but I was looking for something shorter and found '[Julia language: a concise tutorial](https://syl1.gitbook.io/julia-language-a-concise-tutorial/)' ([Github repository available here](https://github.com/sylvaticus/juliatutorial)), which by the way is listed in the [Julia tutorials page](https://julialang.org/learning/tutorials/). IMHO, this is a good resource to get started with Julia (only a few hours to go through) as well as a good refresher course. Below I took some notes that should mainly act as a personal reminder, but might be useful for other. 


## Using Greek letters

In Julia variables can be Greek letters. I used to switch to the Greek keyboard to type these, but there is also the option to use the LaTex syntax + tabulation, e.g. type `\alpha` then `Tab` to get `α` in the prompt.


## Double loops

There is an alternative and simpler syntax for double loops:

```julia
for i = 1:2, j = 2:4
    println(i*j)
end
```

instead of 

```julia
for i = 1:2
  for j = 2:4
    println(i*j)
  end
end
```


## Do blocks

Do blocks are an alternative syntax for anonymous functions:

```julia
myarray = [1 2 3 4 2 3 4]
findall(myarray) do x
    x == 2
end
# is equivalent to 
findall(x -> x == 2, myarray)
```


## Vector manipulation 

Here is a list of useful functions to manipulate vectors:

- `append!()`, `push!()`, `pop!()`, `popfirst!()`
- `sort()` and `sort!()`
- `maximum()`, `minimum()`
- `shuffle()` and `shuffle!()` in package `Random`
- `append!()`
- `empty!()`
- `deleteat!()`
- `in()`
- `length()`, `size()`, `ndims()`
- `findall()`


## Arrays, tuples and dictionaries

For [arrays](https://docs.julialang.org/en/v1/base/arrays/) (matrices, vectors), use `[]` and element of the same type (type migh be `Any`), for tuples, use `()`.

Example of arrays

```julia 
Vec1 = ["a", "b", "c"]
Mat1 = [[1, 2, 3] [4, 5, 6]]
Arr1 = [[1 2], [3, 4], [4 6]]
Arr2 = Array{Float64, 2}(undef, 2, 3)
mask = [[true, true, false] [false, true, false]]
Mat1[mask] 
```

Tuples:

```julia 
Tup1 = (1, 2)
Tup2 = (1, "b", Mat1)
Tup3 = (1, "b", Mat1, cos)
Tup3[3]
Tup3[[1, 3]]
```

A named tuple: 

```julia 
Ntup = (pos=1, txt="b", val=Mat1, fun=cos)
Ntup.pos
Ntup[[:pos, :txt]]
pairs(Ntup)
collect(Ntup)
keys(Ntup)
values(Ntup)
```

A dictionary:

```julia
Dic1 = Dict("pos"=>1, "txt"=>"b", "val"=>Mat1, "fun"=>cos)
Dic1["fun"]
Dic2 = Dict(:pos=>1, :txt=>"b", :val=>Mat1, :fun=>cos)
Dic2[:pos]
Dic3 = Dict(1=>1, 2=>"b", 3=>Mat1, 4=>cos)
Dic3[1]
collect(Dic1)
keys(Dic1)
values(Dic1)
```

> Overall, NamedTuple are generally more efficient and should be thought more as anonymous `struct` \(see the "Custom structure" section\) than Dictionaries.


Convert a tuple in a vector: 

```julia
V1 = [Arr1...]
V2 = collect(Arr1)
```

Convert an array in tuple: 

```julia
T1 = (Arr1...,)
```





### Broadcasting

When applying a function to a vector, one may encounter the following error:

```julia
julia> cos([1, 2, 3])
ERROR: MethodError: no method matching cos(::Vector{Int64})
[...]
```

Instead of adding a morph to the function, one may simply use the `map` function:

```julia
julia> map(cos, [1, 2, 3])
3-element Vector{Float64}:
  0.5403023058681398
 -0.4161468365471424
 -0.9899924966004454
```

Or, even simpler, the broadcast mechanism (`.`)

```julia
julia> cos.([1, 2, 3])
3-element Vector{Float64}:
  0.5403023058681398
 -0.4161468365471424
 -0.9899924966004454
```

As mentioned in the tutorial:

> While in the past broadcast was available on a limited number of core functions only, the `f.()` syntax is now automatically available for any function, including the ones you define.


## About types 

{{< figcenter "https://upload.wikimedia.org/wikipedia/commons/4/40/Type-hierarchy-for-julia-numbers.png" 90 "Type hierarchy for Julia numbers from [wikimedia](https://commons.wikimedia.org/wiki/File%253AType-hierarchy-for-julia-numbers.png)." >}}

Here is a list of functions to manipulate types

1. `supertype(MyType)`Returns the parent types of a type
2. `subtypes(MyType)` Lists all children of a type
3. `fieldnames(MyType)` Queries all the fields of a structure
4. `isa(obj,MyType)` Checks if `obj` is of type `MyType`
5. `typeof(obj)` Returns the type of `obj`

For instance:

```julia
julia> subtypes(AbstractFloat)
4-element Vector{Any}:
 BigFloat
 Float16
 Float32
 Float64

julia> supertype(String)
AbstractString
```

Note that 

* `a::B` means "a must be of type B"
* `A<:B` means "A must be a subtype of B".

and that  

> Although obviously less flexible, immutable structures are much faster.



## Polymorphism and Parametric Methods

First, in the declaration of a Julia function, position arguments come first then followed by keyword arguments, the two are separated by a semicolon. Default values may be applied to both kind of arguments, position arguments cannot be preceded by their name, keyword arguments must be called by their name.

```julia
function myfun(a,b=1;c=2)
  (a+b)*c
end
myfun(a=2) # BAD
myfun(2, 2, 2) # BAD
# only keyword arguments
myfun2(;a,b=1,c=2) = (a+b)*2*c
```

In the example above different methods per function are used to account for the default value, so for instance if `myfun(1)` is used the method where `b` is set to 1 and `c` is set to 2 will be used, but with `myfun(1, 3)`, the second method where only `c` as a default value will be used:

```julia
julia> myfun(a,b=1;c=2) = (a+b)*c
myfun (generic function with 2 methods)
julia> myfun(1)
4
julia> myfun(1, 3)
8
```

And Julia is capable to keep stacking methods, for instance if parameters becomes string, a new method can be added: 

```julia
julia> myfun(a::String,b::String="1";c::String="2") = a*b*c
myfun (generic function with 4 methods)
julia> myfun(1, 3, c = 4)
16
julia> myfun("b", "a", c = "c")
"bac"
```

Of course, this requires to be cautious as one should then think about whether the correct method will be used in the right context. Furthermore, [Parametric Methods](https://docs.julialang.org/en/v1/manual/methods/#Parametric-Methods) introduce type parameters that are an efficient way to design method based on argument type, so if I re-write the two methods above using this, I would write something like this: 

```julia
myfun(a::T,b::T;c::T) where {T<:Number} = (a+b)*c
myfun(a::T,b::T;c::T) where {T<:String} = a*b*c
julia> myfun(1, 3, c = 4)
16
julia> myfun("b", "a", c = "c")
"bac"
```
Note that this allows to constrains the parameter types, in the example above all the three argument must be of the same type:


```julia
julia> myfun(1, 3, c = 4.0)
ERROR: TypeError: in keyword argument c, expected Int64, got a value of type Float64
Stacktrace:
 [1] top-level scope
   @ REPL[5]:1
```

Last, below is an example with two different types: 

```julia
julia> myfun3(a::T,b::T;c::N) where {T<:Number, N<:String} = string(a+b)*c
myfun3 (generic function with 1 method)
julia> myfun3(2, 2, c = "cool")
"4cool"
```


## Metaprogramming

I should spend more time reading about [metaprogramming in Julia](https://docs.julialang.org/en/v1/manual/metaprogramming/). As for now, I will keep in mind that `:pos` declares "pos" as a symbol (equivalent to `Symbol(pos)`) and is the representation of a variable name (a value value may or may not be assigned to it) and that symbol are super useful, e.g  for subsetting purpose, (see above).



<details>
<summary>Configuration</summary>

```.sh
$ inxi -S
System:
  Host: deblen Kernel: 6.4.0-1-amd64 arch: x86_64 bits: 64
  Desktop: GNOME v: 43.6 Distro: Debian GNU/Linux trixie/sid
$ Julia -v
julia version 1.9.1
```

</details>