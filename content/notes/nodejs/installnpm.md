---
title: "Installing Node.js and npm on Debian Buster"
date: 2019-11-06
tags: [npm, Node.js, package manager, JavaScript]
---

[Node.js](https://nodejs.org/en/) was developed to run
[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) everywhere
(as opposed to solely in a web browser) which led to the development of a lot of
software written in JavaScript (arguably the most popular programming language,
see the survey by [StackOverflow](https://insights.stackoverflow.com/survey/)
and the
[RedMonk](https://redmonk.com/sogrady/2019/07/18/language-rankings-6-19/)'s
one). I personally use several pieces of it, for instance
[gtop](https://github.com/aksakalli/gtop) and
[decktape](https://github.com/astefanutti/decktape) and I install them with the
dedicated package manager, namely [npm](https://www.npmjs.com/).

A few days ago, I had a hard time installing
[decktape](https://github.com/astefanutti/decktape) --- that I use to convert my
HTML presentations to pdf files --- on my Debian Buster computer, and so I
decided to do a fresh install of Node.js and npm. Fortunately, the topic is well
covered online, especially in [a very clear article posted on
Linuxize](https://linuxize.com/post/how-to-install-node-js-on-debian-10/) which
was very helpful. In a nutshell, there are two simple ways for this
installation:

1. using the Debian package manager;
2. using [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm).

The first option is rather straightforward:

```sh
$ sudo apt-get install nodejs npm
```

Note that on Debian Buster, you will have the following version installed:

```
$ npm -v
5.8.0
$ node -v
v10.15.2
```

The second option requires to run a small command line

```sh
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
```

which installs Node.js, npm and the following lines to `.bashsrc`:

```sh 
$ export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_com$
```

As I use `zsh`, I cut and pasted this to my `.zprofile`. I read somewhere that
it is better to use NVM (cannot find where anymore) but I don't understand why
this would be true except to get the latest version of nodejs and npm. And this is why I
decided to use [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm). Once installed I checked where were the corresponding binary and the versions:

```sh
$ type node
/home/kevcaz/.nvm/versions/node/v13.0.1/bin/node
$ which npm
/home/kevcaz/.nvm/versions/node/v13.0.1/bin/npm
$ node -v
v13.0.1
$ npm -v
6.12.0
```

I then installed `decktape` and `gtop`:


```sh
$ npm i decktape gtop -g
```

it worked pretty well! And the commands are also installed in `~/.nvm` :boom:.


```sh
$ type gtop
gtop is /home/kevcaz/.nvm/versions/node/v13.0.1/bin/gtop
```

During this process, I figured that I was able to have two versions installed,
one installed via `apt-get` and the other by NVM and so, while I have v13.0.1 installed via NVM, I also had v10.13.0.

```sh
$ whereis node
node: /usr/bin/node /usr/include/node /home/kevcaz/.nvm/versions/nv13.0.1/bin/node /usr/share/man/man1/node.1.gz
```

Seemed like this was not a problem but I thought the sane piece of software
installed twice at different locations with different versions wasn't the best
thing to do and so I removed v10.13.0. I may change this in the future if I use
nodejs for other Debian packages, in which case I will write a follow up to this
note :smile:!
