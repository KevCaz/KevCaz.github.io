---
title: "Use Julia [part 1]!"
date: 2019-07-21
tags: [Julia]
draft: true
---

Julia is modern and version 1.1 working on 1.1.
see previous note

well done easy to read and nice currated list of references.

they should have a nice template for the pdf but well

the mention how it works gives exemple and nice readings do pretty funny

https://docs.julialang.org/en/v1/

> Julia features optional typing, multiple dispatch, and good performance, achieved using type inference and just-in-time (JIT) compilation, implemented using LLVM.

> Efficient support for Unicode, including but not limited to UTF-8

> Call C functions directly (no wrappers or special APIs needed)


freas when most are concepts are clearer ans

 `julia`

  `julia script.jl arg1 arg2...`

scripting https://docs.julialang.org/en/v1/manual/faq/#man-scripting-1

2+2

List of resource https://julialang.org/learning/


; mode shell  
] node package

Variable names must begin with a letter (A-Z or a-z), underscore, or a subset of Unicode code points greater than 00A0; in particular, Unicode character categories Lu/Ll/Lt/Lm/Lo/Nl (letters), Sc/So (currency and other symbols), and a few other letter-like characters (e.g. a subset of the Sm math symbols) are allowed.




[Stylistic Conventions](https://docs.julialang.org/en/v1/manual/variables/#Stylistic-Conventions-1)

While Julia imposes few restrictions on valid names, it has become useful to adopt the following conventions:

    Names of variables are in lower case.
    Word separation can be indicated by underscores, but use of underscores is discouraged unless the name would be hard to read otherwise.
    Names of Types and Modules begin with a capital letter and word separation is shown with upper camel case instead of underscores.
    Names of functions and macros are in lower case, without underscores.
    Functions that write to their arguments have names that end in !. These are sometimes called "mutating" or "in-place" functions because they are intended to produce changes in their arguments after the function is called, not just return a value.


```juia
julia> typeof(1)
Int64
```

ans

 for T in [Int8,Int16,Int32,Int64,Int128,UInt8,UInt16,UInt32,UInt64,UInt128]
           println("$(lpad(T,7)): [$(typemin(T)),$(typemax(T))]")
       end


https://docs.julialang.org/en/v1/manual/integers-and-floating-point-numbers/#Overflow-behavior-1

Overflow behavior

> In Julia, exceeding the maximum representable value of a given type results in a wraparound behavior:


```julia
julia> typeof((1, 1))
Tuple{Int64,Int64}

julia> typeof((1, 1.))
Tuple{Int64,Float64}
```

Machine epsilon

```julia
julia> eps(Float16)
Float16(0.000977)

julia> eps(Float32)
1.1920929f-7

julia> eps(Float64)
2.220446049250313e-16
```



```julia
julia> typemax(Int64)
9223372036854775807

julia> typemax(Int64) + 1
-9223372036854775808

julia> BigInt(typemax(Int64)) + 1
9223372036854775808

```


```julia
julia> x = 3
3

julia> 2x
6

julia> 2x+3
9

julia> (2x+3)*(2x+6)
```


updating versions of all the binary arithmetic and bitwise operators are:


https://docs.julialang.org/en/v1/manual/mathematical-operations/#man-dot-operators-1



https://docs.julialang.org/en/v1/manual/mathematical-operations/#Chaining-comparisons-1
 comparisons can be arbitrarily chained:


https://docs.julialang.org/en/v1/manual/mathematical-operations/#Division-functions-1



https://docs.julialang.org/en/v1/manual/complex-and-rational-numbers/#Rational-Numbers-1


```julia
julia> 2// 3 == 6//9
true
julia> typeof(2// 3)
Rational{Int64}
```


string char

```julia
julia> 'X'
'X': ASCII/Unicode U+0058 (category Lu: Letter, uppercase)
julia> '\u2200'
'∀': Unicode U+2200 (category Sm: Symbol, math)
julia> str = "Hello, world.\n"
"Hello, world.\n"
julia> str[4]
'l': ASCII/Unicode U+006c (category Ll: Letter, lowercase)
julia> str[end]
'\n': ASCII/Unicode U+000a (category Cc: Other, control)
julia> s = "\u2200 x \u2203 y"
"∀ x ∃ y"
julia> length(s)
7
julia> lastindex(s)
11
julia> firstindex(s)
1
julia> s[1]
'∀': Unicode U+2200 (category Sm: Symbol, math)
julia> s[2]
ERROR: StringIndexError("∀ x ∃ y", 2)
Stacktrace:
 [1] string_index_err(::String, ::Int64) at ./strings/string.jl:12
 [2] getindex_continued(::String, ::Int64, ::UInt32) at ./strings/string.jl:218
 [3] getindex(::String, ::Int64) at ./strings/string.jl:211
 [4] top-level scope at none:0

julia> s[4]
' ': ASCII/Unicode U+0020 (category Zs: Separator, space)

```


```
julia> """

       hello"""
"\nhello"
julia> """
       super
         cool

         cool
           cool again
       """
"super \n  cool \n  \n  cool \n    cool again\n"
julia> "1 + 2 = 3" == "1 + 2 = $(1 + 2)"
true
```

https://docs.julialang.org/en/v1/manual/strings/#Common-Operations-1

```
julia> repeat(".:Z:.", 10)
".:Z:..:Z:..:Z:..:Z:..:Z:..:Z:..:Z:..:Z:..:Z:..:Z:."

julia> join(["apples", "bananas", "pineapples"], ", ", " and ")
"apples, bananas and pineapples"
```

> Julia has Perl-compatible regular expressions
https://docs.julialang.org/en/v1/manual/strings/#Regular-Expressions-1


```
julia> match(r"^\s*(?:#|$)", "not a comment") == nothing
true
```


 m = match(r"[0-9]","aaaa1aaaa2aaaa3",1)


```
 julia> m=match(r"(?<hour>\d+):(?<minute>\d+)","12:45")
 RegexMatch("12:45", hour="12", minute="45")

 julia> m[:minute]
 "45"

 julia> m[2]
 "45"
```


```
julia> "super"*" "*"cool"
"super cool"
```

cool readings

https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/




```
julia> function g(x,y)
                 println("print #1 ==> ", x + y)
                 return x * y
                 println("print #2 ==> ",x + y)
              end
g (generic function with 1 method)

julia> g(2,3)
print #1 ==> 5
6
julia> function g(x, y)::Int8
           return x * y
       end
g (generic function with 1 method)
julia> function g(x, y)::Int8
            return x * y
       end;
```


```
julia> [12 23 13 nothing]
1×4 Array{Union{Nothing, Int64},2}:
 12  23  13  nothing

julia> hcat(12, 23, 13, nothing)
1×4 Array{Union{Nothing, Int64},2}:
 12  23  13  nothing
```


julia> map(round, [1.2,3.5,1.7])



```
julia> ([1 2], txt = "hello", val = 23)
ERROR: syntax: invalid named tuple element "[1 2]"

julia> (yop = [1 2], txt = "hello", val = 23)
(yop = [1 2], txt = "hello", val = 23)
```



```
julia> minmax(x, y) = (y < x) ? (y, x) : (x, y)

julia> range((min, max)) = max - min

julia> range(minmax(10, 2))
8
```

[Varargs Functions](https://docs.julialang.org/en/v1/manual/functions/#Varargs-Functions-1) splat


```julia
julia> bar(a,b,x...) = (a,b,x)
bar (generic function with 1 method)

julia> xx = bar(1, 2, 3, 4, 5, 6, 7, 8, 9)
(1, 2, (3, 4, 5, 6, 7, 8, 9))

julia> xx[1]
1

julia> xx[3][1]
3

julia> xx[3][5]
7

julia> xx = bar((1, 2, 3, 4, 5, 6, 7, 8, 9)...)
(1, 2, (3, 4, 5, 6, 7, 8, 9))

julia> xx = bar((1, 2, 3, 4, 5, 6, 7, 8, 9))
ERROR: MethodError: no method matching bar(::NTuple{9,Int64})
Closest candidates are:
  bar(::Any, ::Any, ::Any...) at REPL[248]:1
Stacktrace:
 [1] top-level scope at none:0
```

```julia
function g(x, y = 1)
    x + y
end
```

https://docs.julialang.org/en/v1/manual/functions/#Keyword-Arguments-1
> Keyword arguments can make these complex interfaces easier to use and extend by allowing arguments to be identified by name instead of only by position.



> In Julia, vectorized functions are not required for performance, and indeed it is often beneficial to write your own loops (see Performance Tips), but they can still be convenient. Therefore, any Julia function f can be applied elementwise to any array (or other collection) with the syntax f.(A)











```julia
julia> sin(A)
ERROR: MethodError: no method matching sin(::Array{Float64,1})
Closest candidates are:
  sin(::BigFloat) at mpfr.jl:736
  sin(::Missing) at math.jl:1070
  sin(::Complex{Float16}) at math.jl:1019
  ...
Stacktrace:
 [1] top-level scope at none:0

julia> sin.(A)
3-element Array{Float64,1}:
 0.8414709848078965
 0.9092974268256817
 0.1411200080598672
```

```
julia> f(x) = cos(sin(x))
f (generic function with 1 method)

julia> f(A::AbstractArray) = map(f, A)
f (generic function with 2 methods)

julia> f([1,2,pi])
3-element Array{Float64,1}:
 0.6663667453928805
 0.6143002821164822
 1.0    

cos.(sin.([1,2,pi]))
```
