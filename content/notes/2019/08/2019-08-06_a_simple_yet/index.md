---
title: "A simple yet powerful unit converter with R"
date: 2019-08-06
tags: [R, units, libdunits2, unit converter]
---

I always forget how to convert
[Fahrenheit](https://en.wikipedia.org/wiki/Fahrenheit) to Celsius and
conversely, which I find very frustrating -- for the record the current
definition is:

$$T(°F) = T(°C)\frac{9}{5}+32$$

Yesterday, after looking for the umpteenth times the above equation I decided to
create a small function that would handle the conversion. I first thought that I
could create a 2-lines function just for this specific unit conversion when I
realize that there is a R :package: dedicated to units manipulation:
[units](https://github.com/r-quantities/units) that depends on the C library
[libdunits2](https://github.com/Unidata/UDUNITS-2) and is required to install
:package: [sf](https://github.com/r-spatial/sf). After a couple of minutes
reading the [documentation
:book:](https://r-quantities.github.io/units/articles/measurement_units_in_R.html),
I figured out how to create a simple but robust unit converter with one line of
code, and so I did:

```r
R> conv <- function(x, from = "fahrenheit", to = "celsius") {
      units::as_units(0, to) + units::as_units(as.numeric(x), from)
    }
```

I appended this function to my `.Rprofile` and now, it is available when I work with R. Here are a couple of examples:

```r
# Fahrenheit => Celsius (default)
R> conv(350)
176.6667 [°C]
# Day => second
R> conv(1.5, "d", "s")
129600 [s]
# calorie => Joule
R> conv(1, "cal", "J")
4.1868 [J]
```

I also created a shell function calling the R function above, so that I quickly convert units in a Terminal!  


```r
# shell function
convR() {
  FROM=${2:-fahrenheit}
  TO=${3:-celsius}
  Rscript -e "conv('$1', '$FROM', '$TO')"
}
```

For instance:

```r
$ convR 420
215.5556 [°C]
$ convR 3600 km/h m/s
1000 [m/s]
```

I will likely use [littler](https://github.com/eddelbuettel/littler) to call the R function in a shell and if I do so, I will report how to on this site!
