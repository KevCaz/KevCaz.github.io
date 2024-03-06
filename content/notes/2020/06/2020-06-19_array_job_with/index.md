---
title: "Array job with Slurm: a use case and a mistake I made!"
date: 2020-06-19
tags: [Compute Canada, Advances Research Computing, High Performance Computing, Slurm]
---

:warning: I won't introduce [Slurm](https://slurm.schedmd.com) here as I already have written several notes about it (see the [Slurm tag](https://kevcaz.github.io/tags/slurm/)).


Today, I needed to send 171 jobs to the server. All jobs were similar similar,
only the species ID was changing, exactly the kind of computation [array
jobs](https://docs.computecanada.ca/wiki/Running_jobs#Array_job) were designed
for. As there are 32 cpus per nodes, I figured I needed 6 nodes. And so I wrote
the following bash script:

```sh
#!/bin/bash
#SBATCH --account=def-someone
#SBATCH --time=2:00:00
#SBATCH --nodes=6nodes
#SBATCH --cpus-per-task=1
#SBATCH --mem-per-cpu=4G
#SBATCH --array=1-171
#SBATCH --mail-user=kcazelle@uoguelph.ca
#SBATCH --mail-type=FAIL

cd $SLURM_SUBMIT_DIR
Rscript ./launch.R $SLURM_ARRAY_TASK_ID
```

**But this was wrong** because with this request SLURM allocates 6 nodes for
every task whereas I needed 6 nodes total. My mistake was to not realize that
jobs in a array job share **all** the `#SBATCH` options (but the `--array` one),
including the number of nodes. Now, what I have bear in my mind is that an array
job is a bunch of serial job with the same `#SBATCH` options and SLURM will
handle cpus/nodes needed and dispatch jobs anywhere it can! This is way more
flexible than requesting nodes and this makes it quite powerful for the kind of
computation I do!

So all I needed was to remove the line `#SBATCH --nodes=6nodes`

```sh
#!/bin/bash
#SBATCH --account=def-someone
#SBATCH --time=2:00:00
#SBATCH --cpus-per-task=1
#SBATCH --mem-per-cpu=4G
#SBATCH --array=1-171
#SBATCH --mail-user=kcazelle@uoguelph.ca
#SBATCH --mail-type=FAIL

cd $SLURM_SUBMIT_DIR
Rscript ./launch.R $SLURM_ARRAY_TASK_ID
```

And below is what the queue looked like!

```sh
$ squeue -u kevcaz
          JOBID     USER      ACCOUNT           NAME  ST  TIME_LEFT NODES CPUS       GRES MIN_MEM NODELIST (REASON)
     33200657_1   kevcaz def-someone       myjob.sh   R    1:59:46     1    1     (null)      4G gra43 (Prolog)
     33200657_2   kevcaz def-someone       myjob.sh   R    1:59:46     1    1     (null)      4G gra43 (Prolog)
     33200657_3   kevcaz def-someone       myjob.sh   R    1:59:46     1    1     (null)      4G gra43 (Prolog)
[...]
   33200657_170   kevcaz def-someone       myjob.sh   R    1:59:46     1    1     (null)      4G gra1065 (Prolog)
   33200657_171   kevcaz def-someone       myjob.sh   R    1:59:46     1    1     (null)      4G gra1065 (Prolog)
```


A final note to mention that one can limit the number of tasks running simultaneously using `%`, e.g. in my case `#SBATCH --array=1-171%20` will limit the number of task running at once to 20, this can help managing the work load and also with `%1` jobs will be run in order!

```sh
#!/bin/bash
#SBATCH --account=def-someone
#SBATCH --time=2:00:00
#SBATCH --cpus-per-task=1
#SBATCH --mem-per-cpu=4G
#SBATCH --array=1-171%20
#SBATCH --mail-user=kcazelle@uoguelph.ca
#SBATCH --mail-type=FAIL
```

IMHO, the [documentation](https://slurm.schedmd.com/job_array.html) available
online is very clear about array job, I just needed to make this mistake to
understand it :100:% :laughing:!