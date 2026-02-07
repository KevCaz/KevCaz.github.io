---
title: Linear programming, EwE and LIM and foodwebs &nbsp; -draft-
date: 2023-08-24
math: true
---

A paper published last month in PNAS [*Stable diverse food webs become more common when interactions are more biologically constrained*](https://www.pnas.org/doi/10.1073/pnas.2212061120) by Gellner, McCann and Hasting [^gellner_2023] has shown that adding realistic constrains on food webs increases the proportion of stable food webs, and the stable food webs hence obtained have properties identified in empirical food webs.

To obtain such results the authors started from a general Lotka-Volterra equation and then derived linear constrains.

The methods used is to add constrains and sample the space obtained. There are two major technical points: 

1. adding linear constrains 
2. sampling in the feasible space 


{{< figcenter "img/fig1.png" 80 "Figure 1 Gellner et al 2023" >}}


$$
\frac{dx_i}{dt} = x_i\left(r_i + \sum_j^S{\alpha_{ij}x_j}\right)
$$

First technical point.
Adding linear constraints a finding an optimal solution to a problem is the realm of [Linear programming](https://en.wikipedia.org/wiki/Linear_programming) (LP), basically built a system where and add inequalities. There have been various software to solve such problem, e.g. [lp_solve](https://lpsolve.sourceforge.net/5.5/). A recent interface to solve linear problems (and more) is [JuMP](https://jump.dev/). The [documentation](https://jump.dev/JuMP.jl/stable/) has lot of good material.


Sampling in the feasible space is possible through different algorithm. One known algorithm is the hit and run [^belisle_1993]<sup>, </sup>[^kaufman_1998]<sup>, </sup>[^andersen_2007]. The goal is of such algorithm is to produce a Markov chain that will allow to sample the feasible space. One class of algorithm is known as "Hit and run"[^kaufman_1998]. 


Find constrain is a linear model, which have been developed extensively in . Basically 


This turns the problem into the a problem with a set of constrain. In linear programming 


The LIM has been around for some time and

[`limSolve`](https://CRAN.R-project.org/package=limSolve) Soetaert and collegues that also have xsample



the tragedy of the commons is a problem of asymetry. the +1 for exploiting common and the shared -1, meaning keep on maximising its use even though collectively it is bad. At least, individuals fail at properly asessing how bad the decision is.
decharging into the common... 

Principles are fair and idea relatively simple, find constraints and then find the all 

Main idea behind all this is that change in flow explain macro change, mass distribution of species and so what we obseve. 

Addition of mussels or change in fishery quota change balance in Great lakes and so difference in what w have, Similarly change in nutrient balance caused chaneg in eutrophisation in lakes. Watershed being the unit. 

Where goes the energy is also where evolution was and still is involved.

> Quis custodiet ipsos custodes?

Back in the 70's

Based on [Moore-Penrose inverse](https://en.wikipedia.org/wiki/Moore–Penrose_inverse) a very important matrix. 

In R `MASS::ginv` that is used by LIM

Then models being underdetermined or overdetermined in both case find a suitable approach to do so. 

Constraints: 
feasibility / allometry / stoeachiometry


> Most often, this dependency is expressed by the so-called assimilation efficiency the ratio of assimilated food (the food that is not defecated) to ingested food (Conover, 1966), which is roughly on the order of 20%, 60%, and 80% for detritivores, herbivores, and carnivores, respectively (Hendriks, 1999).


> Ideally, the equations lead to only one solution that perfectly fits the data, called the even-determinacy state (Box 2). This state is achieved when the number of equations is equal to the number of unknown flows (and the equations are internally consistent). Alas, it is very unlikely that, by mere coincidence, the number of equations and unknowns will match; in general, there are too few equations, and there is no unique solution to the model. Thus, some modelers add data from the literature to the site specific observations to reach the state of even-determinacy. This practice is common in many ECOPATH applications, one of the most-used frameworks for linear inverse modeling (Christensen and Pauly, 1992). However, it is doubtful whether such artificial inflation of the site-specific data set with data from other locations can be justified.

[^soetaert01]


LIM allows for enlarging empirical data and constrain flux based on this.
[^Oevelen01]

Gathering scattered data data are either hard (collected) or soft (literature)
and help constaining. 
Dealing with overdeterning or underdeermining data mean to find way to get as close as possible so turn into an optimizaton problem. Typically,

AX-f = 0



And then proceed with the space, and select for instance the most parsimonium one, so smaller flows. To get a single solution. Keep in mind than EcoPath ask more constrain from 
we could add stability as a map of 


Typical Lotka-Volterra model 



where:

- $x_i$ abundance of species i
- $r_i$ intrinsic growth rate
- $\alpha_{ij}$ interaction coefficient. 
- $S$ diversity of the system


[ascendency](https://en.wikipedia.org/wiki/Ascendency)


Typical model[^steele_2009]

$$
\frac{dB_i}{dt} = e_i\left(\sum_j Q_{i,j} + G_i\right) - \sum_k Q_{k,i} - L_i
$$

where:

- $e_i$
- $Q_{i,j}$
- $Q_{i,j}$

$$
\frac{dB_i}{dt} = \sum_j Q_{i,j}
$$


Flow of Carbon, production efficienccy 
Production rates, production/biomass ratios and transfer efficiency


combined various data type be required to be careful with scaling:

- mass balance 
- biomass 
- foodweb flow 
- conversion efficiency
- elemental stoechimometry
- stable isotopes
- fatty acid 
 


Various attributes calculated post computation: 

- Total system throughput
- ratoin different compratment
    herbovoy 
    omnivory
- Finn's index 
- ascendency 
- average mutual information
- diversity of flow 
- transfer efficiency 

rooted to classical paper and may think to be related


Typical[^heijden]: 


Production = consumption – egestion – respiration – export

Typically lineat


SSAunder problem is that there are often set to the boundary

> In natural systems the currency is energy. [^hannon_1972]

> How dependent is the lion upon the sun? [^hannon_1972]

inflow e.g. sun + intrasystem energy flows = *production energy flow*

system of differential equations.

to determine the sturcture pf the ecosystem.

> Because of the nature of the theory, I must group the energy inflows (e.g. sun) into the system with the intrasystem energy flows (e.g. grass consumed by zebras). This combination of inflows and intrasystem flows I call *production energy flow*. Thus the production system encompasses the energy sources and a prescribed number of individuals, species or trophic levels which I shall refer to as *components of the system*. Energy flows which leave the system, i.e. which have no consumer in the production system, such as component metabolism, net component growth in energy content and net energy content of exported biomass, I define collectively as *respiration energy flow*.

> The term *input* is used to describe all the energy inflows to a given component. Thus inputs are exclusively production flows. *Output* describes all those energy flows which are stored in or flow from a component. A component’s production and respiration energy outflows are its outputs. 

> The terms *direct and indirect energy flows* refer only to the inputs to a component. The direct energy flow refers to the actual energy flow through a component. *Indirect energy flow* represents those system flows, both production and respiration, that were necessary in order that the direct energy flow could occur through a given component. Thus a portion of the production and respiration energies of every component in the system is necessary so that the direct energy can occur through a specific component. The theory in this paper amounts to an allocation technique : the limit of an infinite distributing and summing process. The direct plus the indirect energy is referred to as the *total energy flow*.

Ecological system:
 - currency = energy
 - inflow (sun, primary production, prey)
 - has components (individuals, species, trophogroups)
 - energy uses to produce biomass

energy flow = production + respiration

direct and energy flows = 

production = cste*e

How the energy percolates in the system.

"Special energy flow matrx"


what leave the system = *respiration enerygy flow*

How does the energy flow in ecological systems.


> The speculative view is that an improved economy would be based more on energy than on dollars.

Mass balance comparaison with economy and demonstrated the structure epf the ecosystem, where the energy goes through an ecosystem,\.


> The trophic-dynamic viewpoint, as adopted in this paper, emphasizes the relationship of trophic or "energy-availing" relationships within the community unit to the process of succession. [^lindeman_1942]

Similarly idea as Hutchinson. Idea is to show importance of the ecosystem from an energetic standpoint. Trophic aspect is key cause there is some order. Transfer of energy between different trophic level, where does the energy goes?

$\lambda_n$ true productvity at trophic level $n$ increase with trophic level and so does the efficiency (correlation):

$$100*\frac{\lambda_n}{\lambda_{n-1}}$$

photosynthesis efficiency ($\lambda_0$ from the sun )

$$100*\frac{\lambda_0}{\lambda_1}$$

Note that  $\lambda_n\prime$ is the respiration

$$\frac{d\lambda_n}{dt} = \lambda_n + \lambda_n\prime$$

another important relation:

$$\text{respiration} = \text{assimilation} - \text{growth}$$


$$\text{respiration} = \frac{\text{assimilation} - \text{growth}}{\text{growth}}$$

$$\text{assimilation} = \text{ingestion} - \text{defection}$$


$$\text{growth efficiency} = \frac{\text{growth}}{\text{assimilation}}$$

> All function, and indeed all life, within an ecosystem depends upon the utilization of an external source of energy, solar radiation. A portion of this incident energy is transformed by the process of photosynthesis into the structure of living organism

Fishery should not be single species, be a whole story at the community level, effect progagate through food web and only this reveal full story to propose coherent . One example is the cod fishery but there was actually consequence on the entire groundfish community (halibut, plaice)[^pederson_2017]. Examining the community potentially offers a wider range of leviers 



Rapport 

> The LIM mass balance solutions better fit the observational data. Aggregate trophic level (TL) transfer efficiencies (TTE) generally declined after establishment of invasive dreissenid mussels (Dreissena spp.), but not uniformly.


Production =  ingestion – predation mortality – defecation – respiration 		(1)



> Another problematic aspect of the typical EwE modelling practice is that the usual methods to achieve a mass-balance solution do not address the well-known equifinality (poor model identifiability), where several distinct choices of model inputs lead to the same model outputs (many sets of parameters fit the data about equally well; Essington, 2007).


From 
Hossain, Monir, Thomas J. Stewart, George B. Arhonditsis, Dick van Oevelen, Charles K. Minns, and Marten A. Koops. “Uncertainty Assessment of Trophic Flows in Hamilton Harbour: A Linear Inverse Modelling Analysis.” Aquatic Ecosystem Health & Management 20, no. 3 (July 3, 2017): 265–77. https://doi.org/10.1080/14634988.2017.1342517.


> Alas, it is very unlikely that, by mere coincidence, the number of equations and unknowns will match; in general, there are too few equations, and there is no unique solution to the model. Thus, some modelers add data from the literature to the site specific observations to reach the state of even-determinacy. This practice is common in many ECOPATH applications, one of the most-used frameworks for linear inverse modeling (Christensen and Pauly, 1992). However, it is doubtful whether such artificial inflation of the site-specific data set with data from other locations can be justified.

From: 

Soetaert, Karline, and Dick van Oevelen. “Modeling Food Web Interactions in Benthic Deep-Sea Ecosystems: A Practical Guide.” Oceanography 22, no. 1 (March 1, 2009): 128–43. https://doi.org/10.5670/oceanog.2009.13.




[^gellner_2023]: Gellner, McCann & Hasting (2023) {{< doi "10.1073/pnas.2212061120" >}}

[^belisle_1993]: Bélisle et al. (1993) {{< doi "10.1287/moor.18.2.255" >}}

[^kaufman_1998]: Kaufman & Smith (1998) {{< doi "10.1287/opre.46.1.84" >}} 

[^andersen_2007]: Andersen, Hans C.; Diaconis, Persi. Hit and run as a unifying device. Journal de la Société française de statistique & Revue de statistique appliquée, Volume 148 (2007) no. 4, pp. 5-28. http://www.numdam.org/item/JSFS_2007__148_4_5_0/


[^meersche_2009]: Meersche et al. (2009) {{< doi "10.18637/jss.v030.c01" >}}

[^soetaert01]: Soetaert & van Oevelen (2009) {{< doi "10.5670/oceanog.2009.13" >}}

[^Oevelen01]: van Oevelen et al. (2009) {{< doi "10.1007/s10021-009-9297-6" >}}

[^steele_2009]: Steel (2009) {{< doi "10.1016/j.jmarsys.2008.05.012" >}}

[^heijden]: van der Heijden et al. (2020) {{< doi "10.1016/j.ecolmodel.2020.109129" >}}

[^tecchio_2016]: Techhio et al. (2016) {{< doi "10.1016/j.ecolind.2015.10.036" >}}

[^hannon_1972]: Hannon (1972) {{< doi "10.1016/0022-5193(73)90060-X" >}}

[^pederson_2017]: Pedersen (2017) {{< doi "10.1098/rsos.170215" >}}

[^lindeman_1942]: Lindeman (1942) {{< doi "10.2307/1930126" >}}