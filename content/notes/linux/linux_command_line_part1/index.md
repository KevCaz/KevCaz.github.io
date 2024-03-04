---
title: "Reading 'The Linux command line' - Part I"
date: 2024-03-04
tags: [Linux, book, cli]
---

I have been using the command line for more than 10 years now, I started on MacOS[^termac] and I increased my usage of the Terminal when I switched to Linux. 
I am now comfortable with the Linux command line but still looking for ways to improve my skills. 
Recently, I stumbled into [no starch press](https://nostarch.com/) that offers a great selection of books and found out that several are available at the library. 
That's how I booked [The Linux command line](https://nostarch.com/tlcl2) by William Shotts. 

The book does a fantastic jobs explaining why and how to work with Linux command line. 
William Shotts gives to the reader just the right level of details to understand how the shell works and why it is so powerful. 
The first part "Learning the shell" introduces the most important commands. 
Here I am listing 1. a few topics that I am very glad I read more about and 2. the list of commands introduced in the book. 
I strongly recommend the reading of this book and if for any reason you cannot buy it or book it, note that the author maintains a website 
(https://linuxcommand.org/index.php) that includes most of the material covered in the book (with less details). 

Below is a list of five topics that reading about have already been beneficial.
Note that this list is personal, all the 10 first chapters cover important topics and the way material is presented is very didactic. 

- reading the [`ls -l` output](https://linuxcommand.org/lc3_lts0030.php);
- the logic and the power of [i/o redirection](https://linuxcommand.org/lc3_lts0070.php), e.g importance of standard input;
- [expansions](https://linuxcommand.org/lc3_lts0080.php);
- softlinks and hardlinks;
- [permission](https://linuxcommand.org/lc3_lts0090.php) (including the sticky bit).

The following table includes commands that are introduced in the first part (except `du` and `shuf` that I added my-self). 
Note that there are `bash` commands and if you use a different shell (e.g. `zsh`) some commands may be missing (there are likely equivalent commands available). 
Options presented in the table are the ones that are either presented in the book, or options that I think are the most important ones (meaning the one you are ore likely to use). 
The command 'Usage' indicates how frequently I use a given command: one star means daily, 2 means weekly and 3 means every now and then.
Last, `Category` is my attempt to categorize the commands, in the book commands are introduced in different chapters, which makes it clear in what context you are expected to use them.



[^termac]: Back then, I jotted down some notes about my usage of the terminal https://github.com/inSileco/AvecLeTerminal/tree/master.



|Command    |Description                                                     |Options                        |Category     |Usage                |
|:----------|:---------------------------------------------------------------|:------------------------------|:------------|:--------------------|
|`date`     |print or set the system date and time                           |`-u`                           |date         |:star: :star:        |
|`cal`      |displays a calendar                                             |`-j`, `-3`                     |date         |:star:               |
|`file`     |determine file type                                             |                               |inform       |:star: :star: :star: |
|`man`      |an interface to the system reference manuals                    |                               |inform       |:star: :star: :star: |
|`which`    |locate a command                                                |                               |inform       |:star: :star:        |
|`type`     |display information about command type                          |                               |inform       |:star:               |
|`help`     |display information about builtin commands                      |                               |inform       |:star:               |
|`apropos`  |search the manual page names and descriptions                   |                               |inform       |:star:               |
|`info`     |read Info documents                                             |                               |inform       |:star:               |
|`whatis`   |display one‐line manual page descriptions                       |                               |inform       |:star:               |
|`cp`       |copy files and directories                                      |`-a`, `-r`, `-i`, `-u`, `-v`   |manage files |:star: :star: :star: |
|`mv`       |move (rename) files                                             |`-i`, `-u`, `-v`               |manage files |:star: :star: :star: |
|`mkdir`    |create new directory                                            |`-h`, `-m`                     |manage files |:star: :star: :star: |
|`rm`       |remove files or directories                                     |`-i`, `-r`, `-f`, `-vq`        |manage files |:star: :star: :star: |
|`ln`       |make links between files                                        |`-s`, `-r`, `-v`               |manage files |:star:               |
|`less`     |a pager                                                         |                               |manipulate   |:star: :star: :star: |
|`cat`      |concatenate files and print on the standard output              |`-n`                           |manipulate   |:star: :star: :star: |
|`wc`       |print newline, word, and byte counts for each file              |`-c`, `-m`, `-l`, `-w`         |manipulate   |:star: :star:        |
|`head`     |output the first part of files                                  |`-n`                           |manipulate   |:star: :star:        |
|`tail`     |output the last part of files                                   |`-n`                           |manipulate   |:star: :star:        |
|`tee`      |read from standard input and write to standard output and files |                               |manipulate   |:star: :star:        |
|`sort`     |sort lines of text files                                        |`-r`                           |manipulate   |:star:               |
|`uniq`     |report or omit repeated lines                                   |`-c`, `-D`                     |manipulate   |:star:               |
|`shuf`     |generate random permutations                                    |`-r`                           |manipulate   |:star:               |
|`top`      |display Linux processes                                         |                               |monitor      |:star: :star: :star: |
|`kill`     |send a signal to a process                                      |`-l`, `-INT`, `-9`             |monitor      |:star: :star: :star: |
|`shutdown` |halt, power off or reboot the machine                           |`-r`, `-c`                     |monitor      |:star: :star: :star: |
|`du`       |estimate file space usage                                       |`-s`, `-h`                     |monitor      |:star: :star:        |
|`jobs`     |display status of jobs.                                         |                               |monitor      |:star: :star:        |
|`bg`       |Move job to the background                                      |                               |monitor      |:star: :star:        |
|`fg`       |Move job to the foreground                                      |                               |monitor      |:star: :star:        |
|`df`       |report file system space usage                                  |`-h`                           |monitor      |:star:               |
|`free`     |display amount of free and used memory in the system            |`-h`                           |monitor      |:star:               |
|`killall`  |kill processes by name                                          |`-g`, `-i`                     |monitor      |:star:               |
|`pwd`      |print name of current/working directory                         |                               |navigate     |:star: :star: :star: |
|`cd`       |change the shell working directory                              |                               |navigate     |:star: :star: :star: |
|`ls`       |list directory contents                                         |`-ls`, `-t`, `-h`, `--reverse` |navigate     |:star: :star: :star: |
|`su`       |run a command with substitute user and group ID                 |`-c`                           |permission   |:star: :star: :star: |
|`sudo`     |execute a command as another user                               |`-u`                           |permission   |:star: :star: :star: |
|`chmod`    |change file mode bits                                           |                               |permission   |:star: :star:        |
|`chown`    |change file owner and group                                     |                               |permission   |:star: :star:        |
|`id`       |print real and effective user and group IDs                     |`-u`, `-g`, `-G`               |permission   |:star:               |
|`umask`    |set file mode creation mask                                     |                               |permission   |:star:               |
|`chgrp`    |change group ownership                                          |                               |permission   |:star:               |
|`passwd`   |change user password                                            |                               |permission   |:star:               |
|`grep`     |print lines that match patterns                                 |`-e`, `-i`, `-f`               |search       |:star: :star: :star: |