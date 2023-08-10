---
title: "Installing Python packages in Debian Trixie"
date: 2023-08-10
tags: [installation, update, Python, packages]
---

I recently switched back to Debian testing and since last June, testing is Debian 13 (codename Trixie). As I was installing a bunch of Python packages, I got the following error:

```sh
$ pip install numpy
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try apt install
    python3-xyz, where xyz is the package you are trying to
    install.
    
    If you wish to install a non-Debian-packaged Python package,
    create a virtual environment using python3 -m venv path/to/venv.
    Then use path/to/venv/bin/python and path/to/venv/bin/pip. Make
    sure you have python3-full installed.
    
    If you wish to install a non-Debian packaged Python application,
    it may be easiest to use pipx install xyz, which will manage a
    virtual environment for you. Make sure you have pipx installed.
    
    See /usr/share/doc/python3.11/README.venv for more information.

note: If you believe this is a mistake, please contact your Python installation 
or OS distribution provider. You can override this, at the risk of breaking 
your Python installation or OS, by passing --break-system-packages.
hint: See PEP 668 for the detailed specification.

```

As it turned out, Debian [has adopted PEP 668](https://salsa.debian.org/python-team/packages/python-pip/-/blob/master/debian/NEWS) a few months ago. In a nutshell, the PEP 668 is motivated by the fact that most distros ship Python and install Python packages via their own package manager (e.g. `apt` on Debian) and that there are potential conflicts between these packages and the ones installed via `pip`. For instance, the following command line shows that I have almost 200 python packages installed via `apt` (as mentioned above they start via `python3-` or `python-`). 

```sh
$ apt list --installed | grep "^python" | wc -l
```

So if I want to install a new package to do some analysis, `apt` may encounter situation where a package I need will conflict with one installed, but the one installed is installed for at least one software program I used... so better not do anything wrong with those packages. Debian has been using for quite some time a mechanism to prevent this from happening, but if you read the [PEP 668](https://peps.python.org/pep-0668/) closely, you will the paragraph below explaining one way to bypass this safety guard:


> (We have seen user reports of externally-installed packages being deleted on Debian or a derivative. We suspect this is because the user has previously run sudo pip install --upgrade pip and therefore now has a version of /usr/bin/pip without the Debian patch; standardizing this behavior in upstream package installers would address this problem.)

I am pretty sure I did that many times, because I was not able to install the package I needed, I was lucky that nothing was broken...


Anyway, the solution proposes is a standardized mechanism to warn the user that python packages are managed (precisely the message above) and to suggest to use a virtual environment such as [`venv`](https://docs.python.org/3/library/venv.html). And so I installed a virtual environment (see this [thread on StackOverflow](https://stackoverflow.com/questions/75602063/pip-install-r-requirements-txt-is-failing-this-environment-is-externally-manag)
). Note that using [Conda](https://docs.conda.io/en/latest/) is also a suitable option. To easily trigger the virtual environment I created an alias venc, which I call when I launch Python (I use [ipython](https://ipython.readthedocs.io/en/stable/)).

```sh
alias venv='source ~/.venv/bin/activate'
alias P='venv; ipython'
```




<details>
<summary>Configuration</summary>

```.sh
$ inxi -S
System:
  Host: deblen Kernel: 6.4.0-1-amd64 arch: x86_64 bits: 64
  Desktop: GNOME v: 43.6 Distro: Debian GNU/Linux trixie/sid
```

</details>