---
title: Paradox of enrichment with Sage
date: 2019-07-20
tags: [Paradox of enrichment, SageMath, R]
draft: true
---

In 1971 in Science [@rosenzweig_paradox_1971] paradox of enrichment. Basically, base on 6 ecological models they showed that when enrich the system (e.g. increase level of limiting factor). technically cross the Hopf bifurcation.

Here I show how to re run with [SageMath](http://www.sagemath.org/).

On MacOS: `brew install sage`
on Debian related `apt-get install sageMath` (on Buster now 8.6 available)
On Widows use the installer.
More details [see the doc](https://doc.sagemath.org/html/en/installation/index.html#installation-guide)


```python
x,y = var('x,y')
# I,K,E,m,d = var('I,K,E,m,d')   
x,y = var('x,y')
K,E,m = var('K,E,m')
eq1 = x*(1-x/K) - x*y/(1+x)
eq2 = E*y*x/(1+x) - m*y
solve([eq1 == 0], x)
solve([eq1 == 0, eq2 == 0], x, y)
jacobian([eq1, eq2], (x, y))
latex(solve([eq1 == 0], x))
latex(solve([eq1 == 0, eq2 == 0], x, y))
```

$$
\left[x = \frac{1}{2} \, K - \frac{1}{2} \, \sqrt{K^{2} - 4 \, K y + 2 \, K + 1} - \frac{1}{2}, x = \frac{1}{2} \, K + \frac{1}{2} \, \sqrt{K^{2} - 4 \, K y + 2 \, K + 1} - \frac{1}{2}, x = 0\right]
$$


```python
eq1 = x*(1-x/K) - x*y/(1+x) - d*x
eq2 = E*y*x/(1+x) - m*y
latex(solve([eq1 == 0], x))
```

$$
\left[x = -\frac{1}{2} \, K d + \frac{1}{2} \, K - \frac{1}{2} \, \sqrt{K^{2} d^{2} + K^{2} - 2 \, {\left(K^{2} + K\right)} d - 4 \, K y + 2 \, K + 1} - \frac{1}{2}, x = -\frac{1}{2} \, K d + \frac{1}{2} \, K + \frac{1}{2} \, \sqrt{K^{2} d^{2} + K^{2} - 2 \, {\left(K^{2} + K\right)} d - 4 \, K y + 2 \, K + 1} - \frac{1}{2}, x = 0\right]
$$


when

`latex(solve([eq1, eq2], x, y)) `


$$
\left[\left[x = 0, y = 0\right], \left[x = \left(-1\right), y = 0\right], \left[x = K, y = 0\right], \left[x = \frac{m}{E - m}, y = \frac{{\left(E^{2} - E m\right)} K - E m}{{\left(E^{2} - 2 \, E m + m^{2}\right)} K}\right]\right]
$$



```R
eq1 = I + x*(1-x/K) - x*y/(1+x)
eq2 = E*y*x/(1+x) - m*y
# latex(solve([eq1 ==], x))
latex(solve([eq1 == 0, eq2 == 0], x, y))
jacobian([eq1, eq2], (x, y))
```


$$
\left[\left[x = \left(-1\right), y = 0\right], \left[x = \frac{1}{2} \, K - \frac{1}{2} \, \sqrt{4 \, I K + K^{2}}, y = 0\right], \left[x = \frac{1}{2} \, K + \frac{1}{2} \, \sqrt{4 \, I K + K^{2}}, y = 0\right], \left[x = \frac{m}{E - m}, y = -\frac{E m^{2} - {\left(E^{2} m - E m^{2} + {\left(E^{3} - 2 \, E^{2} m + E m^{2}\right)} I\right)} K}{{\left(E^{2} m - 2 \, E m^{2} + m^{3}\right)} K}\right]\right]
$$
