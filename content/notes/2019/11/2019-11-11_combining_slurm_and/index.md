---
title: "Combining Slurm and GNU parallel"
date: 2019-11-11
tags: [Compute Canada, Advances Research Computing, High Performance Computing, GNU parallel, Slurm]
---

Last week, I attended a "Midi conférence" (basically a one hour training session
during lunch time) offered by Compute Canada dealing with
[Slurm](https://slurm.schedmd.com/quickstart.html), [GNU
Parallel](https://www.gnu.org/software/parallel/) and how to combine them. This
was a very useful and timely presentation for me ([:fr: slides available online
:link:](https://docs.google.com/presentation/d/1ysIaSWa157yiZ-ocX1jkAys1NkGgwolArSwCgAYCUPQ/edit?ts=5dc04169#slide=id.g65b5e056e3_0_5))
as I've just got started with Slurm (see my [previous notes on the
topic](/notes/computesci/graham)) and was eager to learn more.


Earlier today, I found an opportunity to put in practice what I've learned last
week. Indeed I needed to download hundreds of shapefiles (2 different kind of
shapefiles at 2 different for almost 120 years), extract values from them before
deleting them. To do so, I wrote the following bash script to distribute the
simulations on 5 nodes and use 4 CPUs per node:


```sh
#!/bin/bash
#SBATCH --time=6:00:00
#SBATCH --nodes=5
#SBATCH --array=1-5
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=4
#SBATCH --mem-per-cpu=4G
#SBATCH --account=def-ksmccann
#SBATCH --mail-user=kcazelle@uoguelph.ca
#SBATCH --mail-type=FAIL

# working directory is where the task is submitted
cd $SLURM_SUBMIT_DIR

parallel --delay 1 Rscript ./scr_extract.R $SLURM_ARRAY_TASK_ID {1} {2} ::: {1..2} ::: {1..2}
```

The `#SBATCH` instructions do the following:

- `#SBATCH --time=6:00:00`: allocate 6 hours for the job;
- `#SBATCH --nodes=5`: allocate 5 nodes;
- `#SBATCH --array=1-5`: generate 5 tasks with 1, 2, 3, 4 and 5 as identifiers (represented by `$SLURM_ARRAY_TASK_ID`);
- `#SBATCH --ntasks-per-node=1`: only one task per node;
- `#SBATCH --cpus-per-task=4`: allocate 4 CPUs per task;
- `#SBATCH --mem-per-cpu=4G`: allocate 4Gb of RAM per CPU.

and in the main command:

```sh
$ parallel --delay 1 Rscript ./scr_extract.R $SLURM_ARRAY_TASK_ID {1} {2} ::: {1..2} ::: {1..2}
```

the Rscript `scr_extract.R` takes 3 arguments:

- the first one are the task identifiers (`$SLURM_ARRAY_TASK_ID`) managed by
  Slurm and, given the setup I described above, this argument varies with the
  node!
- the second and third arguments are handled by GNU parallel so that, on each node, it generates the same four combinations (i.e. (1,1), (1,2), (2,1), (2,2)), each of which is run by one of the four CPUs allocated per node.

:warning: Note that if `SBATCH --ntasks-per-node=1` is used without specifying
the number of CPUs per task, only one CPU will be allocated, making `parallel`
useless! That is why I added `#SBATCH --cpus-per-task=4` to have 4 instead of 1.


So, this set up allowed me to

1. use five different nodes and to have a unique ID for those (`$SLURM_ARRAY_TASK_ID`);
2. do the same parallelization on each of them (with a different input).


It turned out the only good reason for doing that was to apply what I've learned
a few days ago :laughing::laughing::laughing:!

