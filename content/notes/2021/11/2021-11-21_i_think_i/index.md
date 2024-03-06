---
title: "I think I have finally found the right tool to manage my todo lists"
date: 2021-11-21
tags: [todo lists, taskwarrior, management, cli]
---


I do some efforts to be somewhat organized, but I tend to rely way too much on my memory and give too much importance to my mood when it comes to decide what work I need to do first. Over the last 2 or 3 years I have become more and more aware of this and I have realized that this affects my productivity. My goal is not to be as productive as I can but still, if I can achieve more work in less time at my work, it means that I can spend more time on doing something else than working... which is basically the reason why I have been looking for tools to help me get more organized. 

I started with sheets of paper (as many people I guess) but it was pretty unsuccessful. So then I try to use note-taking apps, notably [Simplenote](https://simplenote.com/) which is easy to use and as some good feature to share notes with other and/or on different devices. I've clearly failed keeping track of what I am supposed to do with such tool as I basically kept creating new notes and forgot about previous ones... I have also tried out a few [project management tools](https://clickup.com/blog/10-best-project-management-tools/), I have notably been using [ClickUp](https://clickup.com/) for more than a year. These applications generally have tons of great features that can be very useful... but not really for me. For most of my projects I use GitHub (which covers my needs), so using a tool like ClickUp is partially redundant and using such an application to manage a bunch of todo lists is an overkill. 

As I realized that I haven't found the right tool for my needs, two weeks ago, I started to look for a new tool to try out and I added "cli" (stands for "command line interface") to my google search and I stumbled into [taskwarrior](https://taskwarrior.org/). As mentioned on the website:

> Taskwarrior is Free and Open Source Software that manages your TODO list from the command line. It is flexible, fast, and unobtrusive. It does its job then gets out of your way. 

I am a big user of cli tools and I use my Terminal on a daily basis, so I thought that something as simple as a handful of commands to manage my todo lists would cover my needs... and I was right :smile:! I have been using [taskwarrior](https://taskwarrior.org/) for only two weeks now, and I am super happy with it: a few command lines to remember to handle my todo lists. that's exactly what I needed! 

On Debian, the installation is straightforward via `apt`:

```sh
$ apt-get install taskwarrior
```

Note that when you will use it, a folder `~/.task` will be created 

```sh
tree ~/.task
/home/kevcaz/.task
├── backlog.data
├── completed.data
├── hooks
├── pending.data
└── undo.data
```

as well as the configuration file `.taskrc` (see [this answer on <i class="fab fa-stack-overflow" aria-hidden="true"></i>](https://stackoverflow.com/questions/11030552/what-does-rc-mean-in-dot-files). Taskwarrior is well documented (see <https://taskwarrior.org/docs/>) and has a lot of great functionalities. So far I have only been using a small subset of them :arrow_down:, and I feel it's all I need.


```sh
$ task add       # create a new task 
$ task modify    # modify a task 
$ task done      # mark a task as done 
$ task delete    # delete a task 
$ task list      # check the task list
$ task calendar  # check deadlines on a calendar
```

Below is an example where I create a new task with the tag `test` and set next Monday as its deadline.

```sh
$ task add +test write about taskwarrior due:monday  
Created task 12.
```

It gets tricky to make it even simpler, but totally doable with [aliases](https://jonsuh.com/blog/bash-command-line-shortcuts/) (see below). Once created, I can specifically check the tasks that have been tagged `test`.

```sh
$ task list +test  
ID Age   Tags Due        Description                 Urg 
12 16s   test 2021-11-22 write about taskwarrior     9.47

1 task
```

Note that if I drop `+test` I'd see the entire task list. Once the task is completed I mark it as done!

```sh
$ task 12 done
Completed task 12 'write about taskwarrior'.
Completed 1 task.
You have more urgent tasks.
```

I love the last message because it makes me realized that I have prioritized badly (or that I need to review the due dates of my tasks). So, `add`, `list`, `done`, that's basically it! After having used Taskwarrior for a few days, I spotted the commands I use frequently and I created aliases for them, e.g. `alias tap='task add +perso'` to create my tasks tagges `perso` (this is in my [`.zshrc` file](https://github.com/KevCaz/dotfiles/blob/master/dotfiles/.zshrc)).



So, currentlythe main tools I do to manage my projects are

1. **GitHub**, which holds most of the details for the different projects I am working on (e.g. project-specific todo list via issues);
2. **Taskwarrior** to manage my priorities and remember the task to do that do no fit on GitHub;
3. **Slack** to communicate with my colleagues.

And I am very happy with these three! Next? I may give a try to [taskserver](https://taskwarrior.org/docs/taskserver/why.html) to share my todo lists on different devices and I may give a go to timewarrior (a "Free and Open Source Software that tracks time from the command line" -- https://timewarrior.net/).


That's all folks!