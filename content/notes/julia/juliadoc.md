---
title: "Use Julia! [part 1]"
date: 2019-08-14
tags: [Julia, documentation, get started]
draft: true
---

[The Julia Programming Language](https://julialang.org/) first appeared in 2012 (see the [Wikipedia page for more details](ttps://en.wikipedia.org/wiki/Julia_(programming_language))) and version 1.0 was released August 2018. As mentioned on the wbsite:

>  Julia was designed from the beginning for high performance. Julia programs compile to efficient native code for multiple platforms via [LLVM](https://llvm.org/docs/GettingStarted.html).


There are several people I work with that have started to use Julia on a regular basis and I am now involved in project that include Julia code. So, after 4 years thinking about learning properly it, I finally decided to go through the [Julia manual](https://docs.julialang.org/en/v1/). Well... hum... it is great :fireworks:. After having spent hours going throuh the documentation and practicing a little bit, I would say that Julia took the best of many works and is rather impressive. And the documentation :book: is very well done, it gives you a good understanding of how Julia was made and what are the reasons behind, a good balance between concept, technical details (e.g. pointas about performance) and example (event thought if they admit that sometime the examples are somewhat contrived, well the are always helpful for the sake of understanding), and they give good reading suggestoin, i.e. about [character set](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)

Below I jotted a few notes, to highlight a couple of points I found really underesting. So many things that I found interesting that would ne rather useless to copy paste the full documentation.. Plus list of resource https://julialang.org/learning/ this covers the **Manual** part.


- Different modes

  - `julia script.jl arg1 arg2...` see [the faq](https://docs.julialang.org/en/v1/manual/faq/#man-scripting-1)
  - `julia` [repl](https://en.wikipedia.org/wiki/Read–eval–print_loop)
  - `;`: shell mode  
  - `]`: package mode
  - `?`: help mode

- [Stylistic Conventions](https://docs.julialang.org/en/v1/manual/variables/#Stylistic-Conventions-1): I like the idea that provide convention and
dedicated sectiom https://docs.julialang.org/en/v1/manual/style-guide/

- Support any character and more mathematical way is just so good:


```julia
julia> δ = 10
10
julia> x = 3
3
julia> 2x+δ
13
```

- love `ans` that is last call also love

```julia
[1, 2, 4][end]
```


- Overflow behavior made clear

> In Julia, exceeding the maximum representable value of a given type results in a wraparound behavior:

- missed the [vectorized dot operator](https://docs.julialang.org/en/v1/manual/mathematical-operations/#man-dot-operators-1) I used to use in Matematica


- cool gave a [chaining comparaison](https://docs.julialang.org/en/v1/manual/mathematical-operations/#Chaining-comparisons-1) (also R)

- using rational

```julia
julia> 2// 3 == 6//9
true
julia> typeof(2// 3)
Rational{Int64}
```


- love string cahra string char

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


triple "

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

- [regular expression](https://docs.julialang.org/en/v1/manual/strings/#Regular-Expressions-1)

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


- love how functions work



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

- map

julia> map(round, [1.2,3.5,1.7])



```
julia> ([1 2], txt = "hello", val = 23)
ERROR: syntax: invalid named tuple element "[1 2]"

julia> (yop = [1 2], txt = "hello", val = 23)
(yop = [1 2], txt = "hello", val = 23)
```




> In Julia, vectorized functions are not required for performance, and indeed it is often beneficial to write your own loops (see Performance Tips), but they can still be convenient. Therefore, any Julia function f can be applied elementwise to any array (or other collection) with the syntax f.(A)



https://docs.julialang.org/en/v1/manual/functions/#The-return-Keyword-1

> The value returned by a function is the value of the last expression evaluated, which, by default, is the last expression in the body of the function definition. In the example function, f, from the previous section this is the value of the expression x + y. As in C and most other imperative or functional languages, the return keyword causes a function to return immediately, providing an expression whose value is returned






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

Operators Are Functions ` +(1,2,3)`


### Tuples

Data structure

https://docs.julialang.org/en/v1/manual/functions/#Tuples-1

```julia
tup = (a=1, b=1+1, k = "v")
tup[3]
tup.k
```

- the section [Control Flow](https://docs.julialang.org/en/v1/manual/control-flow/) is very well laid out and really got the  [Short circuit evaluation](https://docs.julialang.org/en/v1/manual/control-flow/#Short-Circuit-Evaluation-1)
 ; task still new to me, we shall see.


```julia
julia> function fact(n::Int)
           n >= 0 || error("n must be non-negative")
           n == 0 && return 1
           n * fact(n-1)
       end
```


- Scope is somewahtd similar with what used in R (where refered to frame)

- I really found the type system very well thought,

> One particularly distinctive feature of Julia's type system is that concrete types may not subtype each other: all concrete types are final and may only have abstract types as their supertypes. While this might at first seem unduly restrictive, it has many beneficial consequences with surprisingly few
 drawbacks. It turns out that being able to inherit behavior is much more important than being able to inherit structure, and inheriting both causes significant difficulties in traditional object-oriented languages.


is subtype?: `<:`

```julia
julia> NTuple <: Tuple <: Any
true
julia> IO <: Any
true
Matrix <: AbstractMatrix <:  AbstractArray
true
Matrix <: Array <: AbstractArray <: Any
true
Vector <: Array <: AbstractArray <: Any
true
julia> String <: AbstractString <: Any
true
julia> Complex <: Number
true
julia> Float64 <: AbstractFloat <: Real <: Number <: Any
true
julia> BigInt <: Signed <: Integer <: Real <: Number <: Any
true
julia> Bool <: Integer <: Real <: Number <: Any
true
julia> Int64 <: Int <: Signed <: Integer <: Real <: Number <: Any
true
julia> UInt64 <: UInt <: Unsigned <: Integer <: Real <: Number <: Any
true
julia> supertype(Bool)
true
Integer
```

aso composite paramteric type, great.
https://docs.julialang.org/en/v1/manual/types/#Parametric-Composite-Types-1



https://docs.julialang.org/en/v1/manual/methods/

> Julia allows the dispatch process to choose which of a function's methods to call based on the number of arguments given, and on the types of all of the function's arguments. This is different than traditional object-oriented languages, where dispatch occurs based only on the first argument, which often has a special argument syntax, and is sometimes implied rather than explicitly written as an argument.



I found the errors always very clear. Must say that sometimes in R error are somewhat obscure... and the system for atching error well designed,.

```julia
julia> methods(println)
# 3 methods for generic function "println":
[1] println(io::IO) in Base at coreio.jl:5
[2] println(io::IO, xs...) in Base at strings/io.jl:69
[3] println(xs...) in Base at coreio.jl:4
```


```julia
julia> g(x::Float64, y) = 2x + y
g (generic function with 1 method)

julia> g(x, y::Float64) = x + 2y
g (generic function with 2 methods)

julia> g(2.0, 3.0)
ERROR:
MethodError: g(::Float64, ::Float64) is ambiguous. Candidates:
  g(x, y::Float64) in Main at REPL[11]:1
  g(x::Float64, y) in Main at REPL[10]:1
Possible fix, define
  g(::Float64, ::Float64)
Stacktrace:
 [1] top-level scope at none:0
```

```julia
julia> typeof([1, 2, 2])
Array{Int64,1}
```


julia> f(a,b) = a+2b
f (generic function with 1 method)

julia> methods(f)
# 1 method for generic function "f":
[1] f(a, b) in Main at REPL[1]:1


julia> f(a=1,b=2) = a+2b
f (generic function with 3 methods)


julia> f(a=1,b=2) = a+2b
f (generic function with 3 methods)

julia> methods(f)
# 3 methods for generic function "f":
[1] f() in Main at REPL[1]:1
[2] f(a) in Main at REPL[1]:1
[3] f(a, b) in Main at REPL[1]:1



> If any inner constructor method is defined, no default constructor method is provided: it is presumed that you have supplied yourself with all the inner constructors you need.




struct Foo
           bar
           baz
       end
Foo(x) = Foo(x,x)
Foo() = Foo(0)
Foo()


Conversion pormoition https://docs.julialang.org/en/v1/manual/conversion-and-promotion/

>  These catch-all rules first promote all operands to a common type using user-definable promotion rules, and then invoke a specialized implementation of the operator in question for the resulting values, now of the same type




> Some languages consider parsing strings as numbers or formatting numbers as strings to be conversions (many dynamic languages will even perform conversion for you automatically), however Julia does not: even though some strings can be parsed as numbers, most strings are not valid representations of numbers, and only a very limited subset of them are.

```julia
julia> parse(Float64, "9.018")
9.018
```

built-in pipe "|>"
