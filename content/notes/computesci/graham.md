---
title: "From Mammoth to Graham"
date: 2019-09-19
tags: [Compute Canada, Advances Research Computing, ]
---

[Compute Canada](https://www.computecanada.ca/home/) is awesome! Seriously, it is! As explained on its website: 

> Compute Canada, in partnership with regional organizations ACENET, Calcul Québec, Compute Ontario and WestGrid, leads the acceleration of research and innovation by deploying state-of-the-art advanced research computing (ARC) systems, storage and software solutions. Together we provide essential ARC services and infrastructure for Canadian researchers and their collaborators in all academic and industrial sectors. Our world-class team of more than 200 experts employed by 37 partner universities and research institutions across the country provide direct support to research teams. Compute Canada is a proud ambassador for Canadian excellence in advanced research computing nationally and internationally.[^comcan]


A couple of years ago, while I was doing my PhD, I had to run hundreds of models and some of the simulations took days! I am still wondering what I would have done without Compute Canada's resource. It was a very positive experience for several reasons: 

1. Compute Canada's hardware and software are top-notch;
2. the documentation is exhaustive and very clear, check out the [wiki](https://docs.computecanada.ca/wiki/Compute_Canada_Documentation);
3. Compute Canada's staff offers a great support;
4. I've learned a lot; 

At that time, I was in Quebec ([Calcul Québec](https://www.calculquebec.ca/) was
the regional partner) and had access to Mammoth parallel II (see the [wiki for
more details about
Mp2](https://wiki.calculquebec.ca/w/Tableau_r%C3%A9sum%C3%A9_des_propri%C3%A9t%C3%A9s_des_serveurs_de_Calcul_Qu%C3%A9bec/fr))
that was running under CentOS and had
[TORQUE](http://www.adaptivecomputing.com/products/torque/) as resource manager.
For the record, below is the bash script I wrote to deloy all my models:


```
#!/bin/bash
#PBS -l nodes=94:ppn=1
#PBS -l walltime=12:00:00
#PBS -q qfbb

# import R
module load bioinformatics/R/3.2.5

# Use my working directy
cd $PBS_O_WORKDIR

# record node identity
cat $PBS_NODEFILE > "${PBS_JOBID}.nodes"

parallel -j24 --sshloginfile $PBS_NODEFILE --workdir $PWD Rscript ./myjob.R {1} {2} ::: {1..448} ::: {1..5}
```

The `#PBS` directives indicate the resources I needed so (see [this page of wiki for more details](https://wiki.calculquebec.ca/w/Ex%C3%A9cuter_une_t%C3%A2che/fr#tab=tab7) and then I used [GNU Parallel](https://www.gnu.org/software/parallel/) to run my script with the right arguments on the different nodes and the different CPUs. 

Now that I am at the University of Guelph, I have access to **Graham**, that is described on the wiki as follows](https://docs.computecanada.ca/wiki/Graham):

> GRAHAM is a heterogeneous cluster, suitable for a variety of workloads, and located at the University of Waterloo. It is named after Wes Graham, the first director of the Computing Centre at Waterloo.

>The parallel filesystem and external persistent storage (NDC-Waterloo) are similar to Cedar's. The interconnect is different and there is a slightly different mix of compute nodes.

>The Graham system is sold and supported by Huawei Canada, Inc. It is entirely liquid cooled, using rear-door heat exchangers.[^graham]

CentOS is also the Linux distribution installed on Graham:

```
$ lsb_release -a
LSB Version:	n/a
Distributor ID:	CentOS
Description:	CentOS Linux release 7.5.1804 (Core) 
Release:	7.5.1804
Codename:	Core
```

The resource manager on Graham is
[Slurm](https://slurm.schedmd.com/quickstart.html) not TORQUE, so I had to use a
different script to run my jobs. Before presenting the bash scirpt I've used
this time, I'd like to show how easy it was to install the software I use
frequently. Basically I first used `module spider` to identify the module
name and the versions available, for example:

```
$ module spider julia

-----------------------------------------------------------------------
  julia:
-----------------------------------------------------------------------
    Description:
      A high-level, high-performance dynamic language for technical
      computing.

     Versions:
        julia/1.0.2
        julia/1.1.0
        julia/1.1.1
        julia/1.2.0
```

Once all the modules I needed were indentified, I loaded them all: 
 
```
$ module load gcc/7.3.0 geos/3.7.2 gdal/3.0.1 proj/6.0.0 julia/1.1.1 \
    nixpkgs/16.09 python/3.7.4 r/3.6.0 udunits/2.2.26
```
 
and then save them so that next time I log in I don't have to reload.

```
$ module save 
```

Two other command are pretty useful: 
1. `module list` list loaded modules 
2. `module unload` that unload a loaded module. 

That being done, and after installing specific R packages I was ready to send my
job (that time was a R job). Nelow is the script what I ended up writing after reading the wiki page ["Running jobs"](https://docs.computecanada.ca/wiki/Running_jobs#Accounts_and_projects):


```
#!/bin/bash
#SBATCH --time=48:00:00
#SBATCH --nodes=1
#SBATCH --account=def-ksmccann
#SBATCH --array=1-12

# Use my working directy
cd $SLURM_SUBMIT_DIR

# Run my job 
Rscript ./launcher.R $SLURM_ARRAY_TASK_ID
```

It worked like a charm! The `#SBATCH` directives describe the resource required
and `$SLURM_ARRAY_TASK_ID` discributes 1, 2, ..., 12 to the  different job so
that I have a unique value per CPU, value that is the input of R script
`launcher.R` that determine which simulation will be run. A day of computation
and it was done! 

To conclude this note, I'd like to mention a very helpful table that presents
the main commands for the different resource managers used on the servers of
Compute Canada : https://slurm.schedmd.com/rosetta.pdf. It was very useful for
me as I had some knowledge about TORQUE but not Slurm. Also, I'd like to point
the reader to the following wiki page https://docs.computecanada.ca/wiki/R that
explains how to run parallel jobs for R users.
 
 
[^comcan]: https://www.computecanada.ca/about/
[^graham]: https://docs.computecanada.ca/wiki/Graham