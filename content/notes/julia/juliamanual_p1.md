---
title: "Use Julia! [part 1]"
date: 2019-11-21
tags: [Julia, programming language, documentation, get started]
draft: true
---


## A bit of context

[The Julia Programming Language](https://julialang.org/) first appeared in 2012 (see the [Wikipedia page for more details](ttps://en.wikipedia.org/wiki/Julia_(programming_language))), version 1.0 was released in August 2018 and 1.2.0 was released in August 2019. As mentioned on the website:

> Julia was designed from the beginning for high performance. Julia programs compile to efficient native code for multiple platforms via [LLVM](https://llvm.org/docs/GettingStarted.html).



Several people I work with have started to use Julia, especially to solve
differential equations (the :package:
[DifferentialEquations.jl](http://docs.juliadiffeq.org/latest/) is damn good!)
and as I am getting involved in projects with Julia code I thought the time had
come to learn more about it (which I have been thinking about for 4 years now)!
I decided to go through the [Julia manual](https://docs.julialang.org/en/v1/), which is not the easiest reading to get started but it is very clear and provide the level of details I was looking for: a good understanding of how Julia was made and what are the reasons behind,
a good balance between concept, technical details (e.g. pointas about
performance) and example (event thought if they admit that sometime the examples
are somewhat contrived, well the are always helpful for the sake of
understanding), and they give good reading suggestions, i.e. about [character
set](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/). Note that they are dnow many valuable resource that offer a more applied perspective (https://julialang.org/learning/), videos, webs pages, books, [Cheat Sheet](https://juliadocs.github.io/Julia-Cheat-Sheet/). B


In this series of notes I gather my personal "highlights", i.e. stuff I found
pretty cool! Obviously my goal is not to repeat give more, making these notes
quite personnal.  (repeating was is said) I would write more (how to do this or
that with Julia). In this first notes I go from
["Strings"](https://docs.julialang.org/en/v1/manual/strings/) to I may skip ome
parts  in which case I may go back to this whenever I need to mention it! Also
not necessarly in order.


## Writing code and executing is Julia --- my setup

As I mainly use [Atom](https://atom.io/) so I use [Juno](https://junolab.org/)
Juno but execute using the Repl in a external etenren  in my terminal sending the comnand thanks to..

- Different modes

  - `julia script.jl arg1 arg2...` see [the faq](https://docs.julialang.org/en/v1/manual/faq/#man-scripting-1)
  - `julia` [repl](https://en.wikipedia.org/wiki/Read–eval–print_loop)
  - `;`: shell mode  
  - `]`: package mode
  - `?`: help mode

Below I jotted a few notes, to highlight a couple of points I found really un


Alos


- [Stylistic Conventions](https://docs.julialang.org/en/v1/manual/variables/#Stylistic-Conventions-1): I like the idea that provide convention and
dedicated sectiom https://docs.julialang.org/en/v1/manual/style-guide/

- Support any character and more mathematical way is just so good:



## Variables


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



## String


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

> "no automatic promotion" category:

>  These catch-all rules first promote all operands to a common type using user-definable promotion rules, and then invoke a specialized implementation of the operator in question for the resulting values, now of the same type




> Some languages consider parsing strings as numbers or formatting numbers as strings to be conversions (many dynamic languages will even perform conversion for you automatically), however Julia does not: even though some strings can be parsed as numbers, most strings are not valid representations of numbers, and only a very limited subset of them are.

```julia
julia> parse(Float64, "9.018")
9.018
```

built-in pipe "|>"




# Modules

using => cannot extent several names at a time
import => one names at a time can extent


?cos


https://docs.julialang.org/en/v1/manual/metaprogramming/

> The key point here is that Julia code is internally represented as a data structure that is accessible from the language itself.



macro sayhello(name)
    show(name)
    return :( println("Hello ", $name, "!") )
end

@sayhello "KevCaz"


generated functions. These have the capability to generate specialized code depending on the types of their arguments with more flexibility and/or less code than what can be achieved with multiple dispatch

@generated function foo(x)
            Core.println(x)
           return :(x * x)
end

x = foo(2);
x = foo(4);
y = foo("bar");



 One way to explore macro arguments is to call the show function within the macro body


https://docs.julialang.org/en/v1/manual/arrays/

The array library is implemented almost completely in Julia itself, and derives its performance from the compiler, just like any other code written in Julia.


```
julia> colwise(myscale,df)
┌ Warning: `colwise(f, d::AbstractDataFrame)` is deprecated, use `[f(col) for col = eachcol(d)]` instead.
│   caller = top-level scope at REPL[44]:1
└ @ Core REPL[44]:1
```