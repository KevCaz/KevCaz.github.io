---
title: "Prezto's aliases for git"
date: 2019-11-01
tags: [git, prezto, alias]
---

A few days ago, as I was having a look at the list of aliases I use with
[Zsh](http://zsh.sourceforge.net/), I realized that there was a ton of aliases
available that I did not created:

```sh
$ alias
g=git
gCO='gCo $(gCl)'
gCT='gCt $(gCl)'
gCa='git add $(gCl)'
gCe='git mergetool $(gCl)'
gCl='git --no-pager diff --name-only --diff-filter=U'
gCo='git checkout --ours --'
gCt='git checkout --theirs --'
[...]
gws='git status --ignore-submodules=${_git_status_ignore_submodules} --short'
gwx='git rm -r'
```

I had two thoughts while I was examining those:

1. they're pretty cool :smile:!
2. how did I get them?

I quickly figured out that those come with
[Prezto](https://github.com/sorin-ionescu/prezto) --- a great configuring
framework for Zsh! Note that the full list is easy to find on [the GitHub
repository](https://github.com/sorin-ionescu/prezto/blob/master/modules/git/alias.zsh).
For the record, below is a selection that I find the most useful for my personal
use.

```sh
alias gr='git rebase'
alias gir='git reset'
alias gwx='git rm -r'
alias gwX='git rm -rf'
alias gp='git push'
alias gf='git fetch'
alias gcm='git commit --message'
alias gco='git checkout'
```

By the way, I decided to complement this set of aliases by adding one to [my own
list of
alias](https://github.com/KevCaz/dotfiles/blob/master/dotfiles/.zprofile) that
creates `.gitignore` file which ignores the
[.DS_Store](https://en.wikipedia.org/wiki/.DS_Store) files (MacOS most annoying
files :laughing:) that some of my collaborators keep adding in the repositories
we share...:scream:

```sh
alias gig='echo ".DS_Store" > .gitignore
```