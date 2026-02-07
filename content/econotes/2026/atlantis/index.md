---
title: Atlantis model
date: 2023-08-24
math: true
---


Working on [Atlantis](https://research.csiro.au/atlantis/) model 


Merged uropean Regional Seas Ecosystem Model II (ERSEM II) and the Port Phillip Bay Integrated Model (PPBIM) and additional work to create The Integrated Generic Bay Ecosystem Model (IBGEM[^fulton_2004])

At the same time >100 ECOPATH with ECOSIM models  were available


> Atlantis is a deterministic biogeochemical whole of ecosystem model that includes modules for
each of the major steps in the adaptive management cycle (Figure 2.1). This overall structure
was used to make sure it was well suited for use in Management Strategy Evaluations. [^fulton_2007]



Installation 

```sh
sudo apt-get install build-essential  autoconf subversion libxml2-dev libnetcdf-dev gawk
```

aclocal
$ autoconf
$ automake -a               # If you have problems with this section
$ autoreconf  -fvi          # you can use this command instead
$ sudo chmod +x configure   # Change the permissions to the configure script
$ ./configure
$ make
$ sudo make install




[^fulton_2004]: Fulton et al. {{< doi "10.1016/j.ecolmodel.2003.09.027" >}}

[^fulton_2007]: Fulton et al. https://research.csiro.au/atlantis/wp-content/uploads/sites/52/2015/10/AMS_Final_Report_v6.pdf