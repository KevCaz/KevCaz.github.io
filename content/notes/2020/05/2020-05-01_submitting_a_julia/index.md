---
title: "Submitting a Julia script with Slurm"
date: 2020-05-01
tags: [Compute Canada, Advances Research Computing, High Performance Computing, Slurm, Julia]
---


In a [previous note](/notes/computesci/graham/), I've narrated my transition
from Mammoth to Graham and I've exemplified how to submit an [<i class="fab
fa-r-project"></i>](https://www.r-project.org/) job with
[Slurm](https://slurm.schedmd.com). As I'm currently using
[Julia](https://julialang.org/) for several projects, I'd like to report how I
submitted my Julia script to the scheduler.


First of all, I needed to set up Julia for my account. As
[Graham](https://docs.computecanada.ca/wiki/Graham) runs under CentOS and as I
had already loaded Julia v1.3.1[^note1], I just had to update the version of
Julia with [`module`](https://linux.die.net/man/1/module).

```sh
$ module load julia/1.4.0
$ module save
```

Then I [installed all the required
packages](https://docs.julialang.org/en/v1/stdlib/Pkg/index.html) for my project
(note that by default there are stored in `~/.julia/packages/`). Then I wrote a small bash script to specify my needs to the scheduler and to start my script. Once I had checked the [node
characteristics](https://docs.computecanada.ca/wiki/Graham) on Graham and then I
wrote the following bash script

```sh
#!/bin/bash
#SBATCH --account=myaccount
#SBATCH --time=6:00:00
#SBATCH --ntasks=1
#SBATCH --nodes=1
#SBATCH --mem-per-cpu=1024M
#SBATCH --cpus-per-task=32

julia -p 32 myscript.jl
```

and save it as `myjob.sh`. Briefly, the `#SBATCH` directives specify that I require 32 CPUs on 1 node, with 1Go per CPU, for a single task that will run for a maximum time of 6 hours. The last line runs my Julia script `myscript.jl` (note that `julia -p 32` indicates that Julia can use up to 32 CPUs). Also, if needed, you can easily pass arguments to the script like  `julia -p 32 myscript.jl arg1`, that will be collected and stored in `ARGS` you can use in your script[^note2].

While my job was running, I have been looking for ways to monitor it. Compute
Canada's wiki lists [several helpful
commands](https://docs.computecanada.ca/wiki/Running_jobs#Monitoring_jobs)[^note5] to do
so, I tried others, such as [`sstat`](https://slurm.schedmd.com/sstat.html) but
looks like something when a job is running is does not report information
pertaining to the job properly[^note4]. So while the job is running I use either
[`squeue`](https://slurm.schedmd.com/squeue.html) or
[`scontrol`](https://slurm.schedmd.com/scontrol.html), like so

```sh
$ squeue -u <username>
$ scontrol show job -dd <job_ID>
```

Once my job was completed, I used `seff <job_ID>`[^note3] to scrutinize how the resources were actually utilized; it turned out I did not need that many CPUs, nor that much memory!

That's all folks!



[^note1]: module saved are listed in `.lmod.d/default`.
[^note2]: see https://docs.julialang.org/en/v1/manual/getting-started/.
[^note3]: [`sacct -j <job_ID>`](https://slurm.schedmd.com/sacct.html) is also a good option.
[^note4]: and unfortunately I cannot ssh to the node so use
something like [htop](https://hisham.hm/htop/).
[^note5]: see also [docs.rc.fas.harvard.edu](https://docs.rc.fas.harvard.edu/kb/convenient-slurm-commands/) for a set of convenient Slurm commands.