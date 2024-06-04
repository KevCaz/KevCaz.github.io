---
title: On the sensitivity of food webs to multiple stressors
date: 2021-07-21
imageOG: fig1.png
---


Our latest work[^db] led by [David Beauchesne](https://www.researchgate.net/profile/David-Beauchesne) is out since yesterday in [Ecology Letters](https://onlinelibrary.wiley.com/doi/abs/10.1111/ele.13841?campaign=wolearlyview) :partying_face:! This paper introduces a framework that allows the exploration of the impact of multiple stressors on food webs.


In the Anthropocene, human activities impact species is various ways. Multiple
stressors frameworks attempt to account for their diversity and their joint
effects (stressors may have antagonistic or synergistic effects). Most of such
frameworks (if not all) are species-based, meaning that they account for the
sensitivity of species to the stressors and the intensity of the stressor (e.g.,
Halpern 2019[^hp]) but not for the ecological relationships among species.
However, it is a truism to say that species are not independent and therefore
approaches that neglect ecological interactions may lead to inaccurate
predictions. That is why we've put a lot of efforts in combining food web
concepts in a multiple stressors approach.

Adding another layer of complexity in an already complex framework proved
challenging: it required creativity and work! IMHO, David used plenty of both to
develop the framework and convincingly showed how fruitful it could be. While
working on this, we realized that some new concepts were needed, and several
terms were thus coined. A major concept is what David called the **pathway of
effect**, which is "the collection of ecological processes through which
stressors directly and indirectly affect ecological communities"[^db]. Using
generalized Lotka-Volterra models (hereafter LV models) for all 3-species
motifs, we systematically evaluated the impact of all pathways of effects on
species abundances. We did so by slightly modifying the parameters of the LV
models[^nb], and comparing the abundances at equilibrium before and after the
perturbation. For a given pathway of effet, this difference was called the
**trophic sensitivity**, and we further defined the **trophic amplification**,
which basically is the difference between the observed trophic sensitivity and
the sum of trophic sensitivities for the all unitary pathways of effects (
pathways of effect for which only one parameter of the LV model is perturbed).
Note that the latter quantifies the non-additivity of the pathway of effect.


{{< figcenter fig1.png 80 "Figure 1 from Beauchesne et al. (2021), see the paper for the original caption. Panel (a) present a 6-species food web with trophic interactions and the effects of stressors. Panels (b-d) detail of the different effects for one 3-species motif. For this motif, there is only stressor 'trawling' that directly affects one species, the Atlantic cod, though it may  impact several ecological processes, i.e. several parameters in the LV model. The pathway of effect basically describes how stressors impact species, that is it gives us the link between the stressors and the parameters of the LV models impacted."  >}}


The interpretation of these two quantities is rather straightforward. For a given pathway, a species with a high trophic sensitivity is strongly affected by
stressors (if the value is negative, then abundances are negatively impacted and if the value is positive then species are positively impacted). Also, high trophic amplification values mean that there are strong non-additive effects (though the exact interpretation of the signed values depends on the sign of the trophic sensitivity). So we had these two quantities for the three species in every motif. Once those metrics defined, we show the relationship between the two for all pathway of effects and there is actually a lot of variation among motifs :arrow_down:.


{{< figcenter fig5.png 80 "Figure 5 from Beauchesne et al. (2021), see the paper for the original caption. The central panel presents the average values for the different species in different motifs. The other (smaller) panels show the same relationship for all pathways of effect for a given species in a given motif. Note that not only the motif matters, but the position within it does too." >}}


In order to obtain the **trophic sensitivity** and the **trophic amplification**
for species in a complex network, for each species, we performed a **motif
census** (see [motifcensus](https://github.com/KevCaz/motifcensus) for an <i
class="fab fa-r-project" aria-hidden="true"></i> implementation) and then sum
all the corresponding values of **trophic sensitivity** and  **trophic
amplification** :arrow_down:.


{{< figcenter fig3.png 60 "Figure 3 from Beauchesne et al. (2021), see the paper for the original caption. For the Atlantic cod, we first recorded all the motifs it is present in (panel A). For the 4 motifs recorded, we sum the **trophic sensitivity** and the **trophic amplification** to obtain the value for the trophic network (panel B)." >}}


We then apply this framework on real marine ecological networks that represent the St-Lawrence system in the mid-1980s. Notably, we show that applying our framework can reveal species (or group of species) particularly vulnerable to multiple stressors :arrow_down:.


{{< figcenter fig7.png 60 "Figure 7 from Beauchesne et al. (2021), see the paper for the original caption. Species with strong negative values, such as the Atlantic cod, have their abundances strongly and negatively impacted by stressors. For such species a positive or a negative value indicates the presence of non-additive effect. For species on the left side of the chart, a positive amplification values means that non-linear effects dampen the impact of multi-stressors on abundance." >}}


We actually say much more in the paper, so if you want to learn I suggest you read it through! This was a lot of work, we had a lot of feedback from the reviewers to make the paper as clear as possible. I hope we've succeeded in doing that, and I hope you'll be as excited as we are about the research avenues this study unveils! By the way, David did his best to make this study reproducible, see :arrow_right: https://zenodo.org/record/5014237#.YPhE8iUpD0o so you know where to start if you want to work on this :wink:.




[^db]: Beauchesne et al. (2021) {{< doi "10.1111/ele.13841" >}}

[^hp]: Halpern (2019) {{< doi "10.1038/s41598-019-47201-9" >}}

[^nb]: Note that the number of parameters varies with the motif, there are up to 9 parameters (for motifs that includes all interactions).
