---
title: Co-occurrence, not interaction!
tags: [theory, information, inference, co-occurrence, presence-absence]
date: 2020-07-03
math: true
---


This note is a short comment on the paper [Guillaume Blanchet](https://www.researchgate.net/profile/F_Guillaume_Blanchet), [Dominique Gravel](http://ielab.recherche.usherbrooke.ca/) and I recently published in [Ecology Letters](https://onlinelibrary.wiley.com/journal/14610248).

{{< tweet KCazelles 1263081538004160514 >}}



# What did we do?

We basically went over 7 arguments to explain why the information in
co-occurrence cannot be taken as a proxy for ecological interactions. Before I
quickly review the list of arguments, there are two points worth mentioning
about those arguments. First, **we are discussing the inference of static
ecological networks from occurrence data with an optional set of abiotic
variables**. Second, we have not tried to be exhaustive nor have we tried to
find the minimal set of the most general arguments. Rather, we opted for strong
arguments that would speak to a wide range of ecologists, which means that:

  1. there are various specific arguments that can be do in various sub-fields of ecology (and evolution);
  2. some arguments developed are partially redundant.


That being said, here is the final list:

1. **Species occurrences depend on the environment**. If we do not account properly for the environment, we can easily analyse patterns of co-occurrence that are caused by environmental variables, not interaction.

2. **The detection of the interaction between two species
vanishes if either of these species interact with other species** which makes any inference of ecological networks with more than a few species from presence/absence data extremely complicated (even with partial correlations).

3. **Species associations could arise indirectly**. This argument is partially redundant with the previous argument but it has important and distinct ecological implication: it basically means that it is nearly impossible to distinguish direct form indirect interactions based on co-occurrence data.

4. **Sampling scale influences measures of co-occurrence** this is a classic in ecology, in the paper we show how the co-occurrence signal appears or disappear when increasing the scale for species that actually do not interact.

5. **Appropriate statistical inference requires a very large
sample size**: This is a technical but important point that. Assume the network as static and assuming that we account properly for the environment, then we need a lot of data for such inference.

6. **Asymmetry of associations between species can blur
co-occurrence signal** and the asymmetry is rarely mentioned in co-occurrence studies and very few metrics being used can measure this asymetry.

7. **Coexistence theory predicts that strong interactions
may lead to exclusion before leaving a significant signal** making the inference even harder.


This is a rather sad picture we have drawn for the trend in the literature we
targeted, i.e. inferring ecological networks for presence absence data and an
optional set of environmental variables.





# A quick point about the supplementary information

IMHO, the SI of the paper is rather long for making fairly understandable points. I feel confortable saying this as I wrote most (if not all) of it. So here I would like to go straight to the point.

Let $X_A$ and $X_B$ be the random variables of the occurrence of $A$ and $B$
respectively and let $E$ denote an abiotic factor, finally, $P(X_A, X_B | E)$
denotes the probability that A and B co-occur given $E$ (i.e. under a specific
environmental value).

From a mathematical stand point the problem is that, in general that $P(X_A, X_B | E) = P(X_A | E) P(X_B | E)$ **does not imply** that $P(X_A, X_B) = P(X_A) P(X_B)$. This at the core of argument 1 and 4 is the confusion between the two, e.g. species that actually are independent may seem not independent because of another variables that we did not account for. Note that assuming this variable is the presence of a third species leads to argument 2 and 3 ! Of course one major problem in ecology is that we don't have only one or two variables that simultaneously drive $X_A$ and $X_B$, we have **tons** of them.




# Reproducibility

As I said few weeks ago in [another post](/econotes/2020/biogeonet/), it has now become extremely important for me to release the code to let other check out what we've actually done, readily. That's why I took care of formatting the code as a small <i class="fab fa-r-project"></i> package :arrow_right: https://github.com/TheoreticalEcosystemEcology/coocNotInteract.