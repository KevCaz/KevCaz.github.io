---
title: Never too late to publish your code!
tags: [biogeography, network ecology, theory of island biogeography, research compendium, code]
math: true
publishDate: 2020-05-17
imageOG: "tableBits.png"
---

Since 2017, for every article I work on, I now do my best to release the code I
used to obtain the results presented therein (see my research compendia in the
[software section](/software/)). In my humble opinion, this is the least I can
do cause the numerical part of a study (often a large part of my work) is
relatively easy to reproduce, though it requires some time to master the tools
to do so. As I now perceived reproducibility of my work as a duty, I felt guilty regarding a paper I published back in 2015.

In ["On the integration of biotic interaction and environmental constraints at
the biogeographical
scale"](https://onlinelibrary.wiley.com/doi/full/10.1111/ecog.01714), my
co-authors and I extended the classical [Theory of Island Biogeography
(TIB)](https://en.wikipedia.org/wiki/The_Theory_of_Island_Biogeography) and the
*Trophic TIB*[^note1] published in 2011. We show that the TIB and the TTIB are
generalizable using a Markov chain[^note2] and I remember spending a lot of time
on the numerical implementation, which is the reason why I had regrets not
releasing the code.

As I still had some of the original code in a good shape, in 2017, I created a
GitHub repository, [biogeonet](https://github.com/KevCaz/biogeonet) to share
this code. But I did not have the energy to complete the code so one could
easily reproduce the analysis in the paper. Two years after the first commit, I
finally found the energy thanks to one of  [Olivier
Gimenez](https://oliviergimenez.wordpress.com/)'s tweets.

{{< tweet user="oaggimenez" id="1250597732366143489" >}}

He basically reminded me the importance of releasing numerical implementations,
even if they are >4 years old! I am aware that it is likely that nobody has ever
tried to reproduce my study but it does not mean that I shouldn't help a
potential somebody to do so, and I am also aware that this person may be future
me. Moreover, working on a computational study often means to find new
computational tricks that can be helpful to others. For instance, for this
study, I had used [Rcpp](http://www.rcpp.org/) for the first time, others in my
discipline may have considered using it and so my code could be one more example
of how to use it! Also, while working on this code, I discovered the power of
working with [bits](https://en.wikipedia.org/wiki/Bit) and it was a very
important trick for the entire implementation.

TIB and bits operators, ... why? Because as I dealt with all possible
combinations of presence/absence of $n$ species in a community, I figured it
could be done using bits. Let say I have a 3 species community, working with
presence/absence, there are $2^3 = 8$ combinations, let's refer to them as $0,
1, ... 7$. Now, let's write them as 3 digits binary numbers, i.e $0 = 000$, $1 =
001$, ... $7 = 111$ and let's consider that first bit represents first species
(species 1), the second bit, species 2 and the third bit species 3. In this
case, the bit binary representation of the number of a given state holds all the
presence/absence information I needed. Plus, summing the bits that equal 1 gave
the species richness of a given community, as shown in the table below.


|State | Species 3 | Species 2 | Species 1 | Total richness |
|:---- |:----------|:----------|:----------|:---------------|
|0     | 0         | 0         | 0         | 0              |
|1     | 0         | 0         | 1         | 1              |
|2     | 0         | 1         | 0         | 1              |
|3     | 0         | 1         | 1         | 2              |
|4     | 1         | 0         | 0         | 1              |
|5     | 1         | 0         | 1         | 2              |
|6     | 1         | 1         | 0         | 2              |
|7     | 1         | 1         | 1         | 3              |


Dealing with bits is no less that one of the foundations of computer science,
and so, in various programming languages, there are specific operators to
manipulate them called [bitewise
operators](https://www.geeksforgeeks.org/bitwise-operators-in-c-cpp/) and I have
used them extensively for this study. For instance, I created a simple function
to sum bits (see
[buildMarkov.cpp](https://github.com/KevCaz/biogeonet/blob/master/src/buildMarkov.cpp)):

```cpp
int countBit1(int x) {
		int n = 0;
		while (x != 0) {
				n += (x & 1); // is the last bit 1? 1 if true, 0 otherwise
				x = (x >> 1); // 1 but shift to the right, e.g. 101 (i.e. 5) => 010 (2)
		}
		return n;
}
```

With the [code available on GitHub](https://kevcaz.github.io/biogeonet/), you
can see all the bit tricks I have used! Also, as I had worked on a bunch of
equations, I was looking for a way to publish them online and it turned out it
is very easy to do so with [pkgdown](https://kevcaz.github.io/biogeonet/): I
created a vignette and now you can see the entire [supplementary
information](https://kevcaz.github.io/biogeonet/articles/Cazelles_2016_SI.html)
nicely formatted.

I'm happy that I took some time to do this even though it was not always easy to
take some time to work on something that should have been done years ago... That
said, going through this old code gave me ideas about possible future projects!
Overall, I'd say it was pretty useful! So, well, I guess it is never too
late to share your codes



[^note1]: Gravel et. al. (2011) {{< doi "10.1111/j.1461-0248.2011.01667.x" >}}
[^note2]: for more details, see the [Supplementary
Information](https://kevcaz.github.io/biogeonet/articles/Cazelles_2016_SI.html).