---
title: "Updating all your Python packages"
date: 2020-01-05
tags: [installation, update, Python, packages]
---


Even if I do not frequently code in Python, my setup includes several packages
of this programming language. While I was looking for a simple way to update
all installed packages, I found [this thread on stack
overflow](https://stackoverflow.com/questions/2720014/how-to-upgrade-all-python-packages-with-pip)
which helps me writing the following alias in my zsh profile:

```bash
alias updpy='for i in  $(pip list --outdated --format=columns |tail -n +3|cut -d" " -f1)
    do pip install --user $i --upgrade
done'
```

Now, when I enter `updpy` in my Terminal, all installed Python packages are
updated. Pretty sweet :smile:! Note that if you are using Python more often
that I do, you may benefit from installing the package manager
[Conda](https://conda.io/en/latest/). With Conda, all you need to do is:


```bash
$ conda install package-name
```

to install a Python package, and:


```bash
$ conda update --all
```

to update all installed packages. 


