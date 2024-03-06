---
title: "Installing Spell Right on VSCodium v1.49"
date: 2020-09-21
tags: [Linux, VSCodium, spellright, hunspell]
---


[VSCodium](https://vscodium.com/) is an automatic "clean" build of [Virtual Studio Code (VSCode)](https://code.visualstudio.com/), 
i.e. a build without the Microsoft touch. VSCode (thus VSCodium) is very powerful, has a tons of features and its development is very dynamic, so I am always keeping an eye on what's new with VSCode even though I am still using [Atom](https://atom.io/) more frequently.


When [I set up Bullseye on my ThinkPad](/notes/hardware/setup_bullseye) I installed the latest version of VSCodium and when I looked up for my favorite extensions, I realized that 
many extensions were actually missing. After a quick search, I figured that, since version 1.46,
[Visual Studio Marketplace](https://marketplace.visualstudio.com/) is no longer added as an extension gallery in VSCodium. Rather, VSCodium relies on
[Open VSX Registry](https://open-vsx.org) (see also [the article about Open VSX on Gitpod](https://www.gitpod.io/blog/open-vsx/)) but the [publication on this registry](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions) represents extra step for developers, thus the missing applications. This includes [Spell Right](https://github.com/bartosz-antosik/vscode-spellright)
that, a very handful spell checker, that is only available on https://marketplace.visualstudio.com/. Fortunately, the VSCodium team has listed [several ways to deal with this issue](https://github.com/VSCodium/vscodium/blob/master/DOCS.md#extensions-marketplace) (including a way to add Visual Studio Marketplace as a registry). I opted for installing Spell Right from the `.vsix`. To do so, I went on the extension's page on [Marketplace](https://marketplace.visualstudio.com/items?itemName=ban.spellright) and clicked on <kbd>Download Extension</kbd>, 
then I used the following command:


```sh
$ codium --install-extension ban.spellright-3.0.52.vsix 
```

Finally, I linked my [hunspell](http://hunspell.github.io/) dictionaries like so:

```sh
$ ln -s /usr/share/hunspell/* ~/.config/VSCodium/Dictionaries
```

And all work great! Note that the final step was actually not properly explained for Linux and VSCodium on the documentation, so I reported this in issue [#354](https://github.com/bartosz-antosik/vscode-spellright/issues/354). Hopefully, the developers will soon add this neat package on Open VSX Registry, which would make everything easier!



<br>

<details>

VSCodium's version

```sh
$ codium --version
1.49.1
58bb7b2331731bf72587010e943852e13e6fd3cf
x64
```

</details>