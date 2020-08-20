---
title: "Parallelizing scripts that take more than one varying paremter"
date: 2020-08-20
tags: [Advances Research Computing, High Performance Computing, Slurm, bash, Julia]
---

Another note about how I work with [Slurm](https://slurm.schedmd.com)! Today, I
comment on three strategies to run simulations for which the values taken by two
arguments (or more) vary from one simulation to another.


## The problem

Let's assume that we run simulations by calling a
[Julia](https://julialang.org/) script `myscript.jl` that takes `p1` as
argument, in order to run the simulation on one
[CPU](https://en.wikipedia.org/wiki/Central_processing_unit) for a single
simulation, I would run the following bas command

```sh
julia -p 1 myscript.jl p1
```

where I would replace `p1` by the right value. To run more than one simulation,
say 3 for the sake of example, with Slurm I would write a short bash script and use a [job array](https://slurm.schedmd.com/job_array.html) (see
more details in [this note](../arrayjob))  be it for simple sequence, e.g.`1:3`,

```sh
#!/bin/bash
#SBATCH --account=def-someone
#SBATCH --time=2:00:00
#SBATCH --cpus-per-task=1
#SBATCH --mem-per-cpu=4G
#SBATCH --array=1-3
#SBATCH --mail-user=kcazelle@uoguelph.ca
#SBATCH --mail-type=FAIL

julia -p 1 myscript.jl $SLURM_ARRAY_TASK_ID
```

or for any set of IDs, e.g. `1, 5, 6`:

```sh
#!/bin/bash
#SBATCH --account=def-someone
#SBATCH --time=2:00:00
#SBATCH --cpus-per-task=1
#SBATCH --mem-per-cpu=4G
#SBATCH --array=1,5-6
#SBATCH --mail-user=kcazelle@uoguelph.ca
#SBATCH --mail-type=FAIL

julia -p 1 myscript.jl $SLURM_ARRAY_TASK_ID
```

Now let's assume `myscript.jl` takes not one but **two parameters**, namely `p1` and `p2`, the bash command becomes

```sh
julia -p 1 myscript.jl p1 p2
```

I further assume that `p1` takes the `1, 5, 6` and `p2` takes `1:5` and that I
am interested in running simulations for all combinations (15 simulations in
total). There are various strategies to deal with this scenario and below I
discuss three of such strategies.


## Using GNU parallel 

One way is to work with [GNU
parallel](https://www.gnu.org/software/parallel/)[^note1] which could also be
combined with Slurm job array designed (see [this previous
note](../slurmandgnuparallel)). Basically, one needs to allocate the right
number of CPU and to use `parallel` properly. For the example described above, I
could use Slurm array job for `p1` and `parallel` for `p2` (and conversely).

[^note1]: obviously, this should be installed first.

```sh
#!/bin/bash
#SBATCH --time=2:00:00
#SBATCH --array=1,5:6
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=5
#SBATCH --mem-per-cpu=4G
#SBATCH --account=def-ksmccann
#SBATCH --mail-user=kcazelle@uoguelph.ca
#SBATCH --mail-type=FAIL

parallel --delay 2 julia -p 1 myscript.jl $SLURM_ARRAY_TASK_ID {1} ::: {1..5}
```

Note `#SBATCH --cpus-per-task=5` allocates 5 CPUs per job (1, 5 and
6, so 15 CPUs total). Also, `--delay 2` is used to avoid [thundering herd
problem](https://en.wikipedia.org/wiki/Thundering_herd_problem) (see the
[documentation](https://www.gnu.org/software/parallel/parallel_tutorial.html)). Note that I can use parallel for any extra parameters, for instance, assuming there is a third parameter that takes `10, 22, 51, 100`, I would write


```sh
#!/bin/bash
#SBATCH --time=2:00:00
#SBATCH --array=1,5:6
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=20
#SBATCH --mem-per-cpu=4G
#SBATCH --account=def-ksmccann
#SBATCH --mail-user=kcazelle@uoguelph.ca
#SBATCH --mail-type=FAIL

parallel --delay 2 julia -p 1 myscript.jl $SLURM_ARRAY_TASK_ID {1} {2} ::: {1..5} ::: 10 22 51 100
```

Actually, one can stick to `parallel` and ignore Slurm job array but it is
slightly more complicated when one needs to deal with more than one node,
although it is totally doable and well-explained on [Compute Canada's
Wiki](https://docs.computecanada.ca/wiki/GNU_Parallel).


## Additional bash lines

A strategy I recently used to write  additional bash lines to make two bash
variables out of `$SLURM_ARRAY_TASK_ID`. For the example we are discussing, I
would write the following bash script

```sh
#!/bin/bash
#SBATCH --time=2:00:00
#SBATCH --array=1-15
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=1
#SBATCH --mem-per-cpu=4G
#SBATCH --account=def-ksmccann
#SBATCH --mail-user=kcazelle@uoguelph.ca
#SBATCH --mail-type=FAIL

vals=(1 5 6)
p1=${vals[@]:((($SLURM_ARRAY_TASK_ID - 1) / 5)):1}
p2=$((($SLURM_ARRAY_TASK_ID - 1) % 5 + 1))

julia -p 1 myscript.jl $p1 $p2
```

Note that above I introduce one [bash
array](https://www.linuxjournal.com/content/bash-arrays) and
`${vals[@]:((($SLURM_ARRAY_TASK_ID - 1) / 5)):1}` is used to extract `1` element
starting at `(($SLURM_ARRAY_TASK_ID - 1) / 5))` (note that index starts at 0 for
bash arrays). This may be very helpful for people that are already confortable
with bash scripts.


## Stick to one parameter and deal with it directly in your script!

Last but not least, I can stick to one parameter and make it two, directly in my
script. This is more a way around than a solution of the problem we described
earlier, but this may very well be the easiest solution in many cases as it simply requires to add extra lines in the programming langage the script was coded in. Here I would add the following lines in `myscript.jl`


```julia
p0 = parse(Int, ARGS[1]) - 1
p1 = [1 5 6][div(p0, 5) + 1]
p2 = p0 % 5 + 1
```

and then simply declare 15 jobs:

```sh
#!/bin/bash
#SBATCH --time=2:00:00
#SBATCH --array=1-15
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=1
#SBATCH --mem-per-cpu=4G
#SBATCH --account=def-ksmccann
#SBATCH --mail-user=kcazelle@uoguelph.ca
#SBATCH --mail-type=FAIL

julia -p 1 myscript.jl $SLURM_ARRAY_TASK_ID
```

relatively easy and very efficient! Note that when dealing with more than 5
parameters, the first two solutions might prove more tedious whereas you may
feel more confortable dealing with it in a programming language you know better.
For instance, it is likely that you would be able to create a function that
would generate the proper set of parameter based on a single parameter.
Alternatively, you could create an external file (may be with your favorite
programming langage) and then use `$SLURM_ARRAY_TASK_ID` to indicate the line of
the file to be read for a given simulation.