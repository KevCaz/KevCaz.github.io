---
title: Species coexistence
tag: [becology, theory]
date: 2019-10-08
draft: true
---

We've started to work n the theory based on the a recent review by Chesson:
"Updates on mechanisms of maintenance of species diversity"[^rev]
. Dr. Peter Chesson (see https://eeb.arizona.edu/people/dr-peter-chesson) is a leader in coexistence theory with master piece:

- In Chesson, P, and Kuang, J.J. 2008. The interaction between predation and competition. Nature
456, 235-238. => show XXX
- Li, L., Chesson, P. 2016. The effects of dynamical rates on species coexistence in a variable
environment: the paradox of the plankton revisited. The American Naturalist 188, E46-E58 => show XX


> The scientific study of species coexistence is not about coexistence
of all biological species living in the same locality, but in most cases
about coexistence of species with similar ecology, in other words,
species belonging to the same guild.



<!-- $$
 \begin{array}{r}
  \dot{X} = aX - bXY - cXZ \\
  \dot{Y} = bXY - fY \\
  \dot{Z} = cXZ - gZ
 \end{array}
$$ -->


$$ \dot{X} = aX - bXY - cXZ $$
$$ \dot{Y} = bXY - fY $$
$$ \dot{Z} = cXZ - gZ $$

This is a “no‐coexistence reference scenarios.”

we focus on "per capita resource consumpionrates"


- **invasion rate**
- **average fitness differences**
- **stabilizing difference**
- **natural scale growth**



<!-- x,y = var('x,y')
K,E,m = var('K,E,m')
eq1 = x*(1-x/K) - x*y/(1+x)
eq2 = E*y*x/(1+x) - m*y
solve([eq1 == 0], x)
solve([eq1 == 0, eq2 == 0], x, y)
jacobian([eq1, eq2], (x, y)) -->



[^rev]: Chesson, P. (2018). Updates on mechanisms of maintenance of species diversity. Journal of Ecology, 106(5), 1773–1794. https://doi.org/10.1111/1365-2745.13035


