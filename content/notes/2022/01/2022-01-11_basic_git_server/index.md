---
title: "Basic Git server on my Raspberry Pi"
date: 2022-01-11
tags: [Git, server, ssh, Raspberry Pi]
---

As mentioned in my [previous post](/notes/rapsberrypi/nextcloud_server/), I have recently started using my Raspberry Pi as a server and I decided to try to host a basic Git server. 


As explained in the chapter ["Git on the Server"](https://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols) of Pro Git[^ref], among other protocols, Git supports SSH and it is quite straightforward to setup a basic Git server via this protocol. As I can access my Raspberry Pi via ssh, I decided to give it a try! I first connected to it as user `pi` (`ssh pi@raspberry.local`), a user that is listed as a super user, and I created a new user: `git` (this is one way suggested in Pro Git). 

```sh
# add user 
$ sudo useradd git
# set its password 
$ sudo passwd git 
```

Then I created the directory `git` in `/srv` (see the [FHS](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard) for this choice) 

```sh
$ sudo mkdir /srv/git
```

and made the user `git` its owner. 

```sh
$ sudo chown git /srv/git/
```

Then I logged out and logged back in as user `git` (`ssh git@raspberry.local`) to create a bare repository `demogit.git` (note that the final `.git` is a mere convention).

```sh
$ mkdir /srv/git/demogit.git
$ cd /srv/git/demogit.git
$ git init --bare --shared
Initialized empty shared Git repository in /srv/git/demogit.git
```

Well, that was basically it, `demogit.git` was now ready to be the remote repo for one of a local repo! So I logged out and went back on my computer where I created a local repo and a first commit. 

```sh
# create the git repo 
$ mkdir ~/demogit
$ cd demogit
$ git init
# create a first commit
$ echo "# demogit" > README.md
$ git add README.md
$ git commit -m "add README"
```

Then I added my remote repo.

```sh
# add remote 
$ git remote add origin git@raspberrypi.local:/srv/git/demogit.git
# set upstream branch 
$ git push -u origin main
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 880 bytes | 880.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To raspberrypi.local:/srv/git/demogit.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

:tada: Now I have a local repo on my main computer and a remote repo on my Raspberry Pi. So yes, setting a basic (and really remote[^trick]) Git server could be as simple as setting a bare Git repository in on a computer to which you have ssh access to, which is pretty neat! 




[^ref]: Pro Git (2014), S. Chacon & B. Straub. https://git-scm.com/book.

[^trick]: You can actually use your own computer, with `file:///path/to/bare-repo.git` as remote repository.