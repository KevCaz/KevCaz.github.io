---
title: "I love the 'multi-cursor-increment' package"
date: 2018-09-19
tags: [Atom, cursor, selection]
---

I truly like the [multiple cursors in Atom](https://flight-manual.atom.io/using-atom/sections/editing-and-deleting-text/#multiple-cursors-and-selections). I remember the first I used such feature, it was on [Sublime Text](http://www.sublimetext.com/), it blew my mind. I now use it pretty much everyday, and I have noticed that this is now a common feature among editors/IDEs, for instance, R users can use it in [RStudio](https://blog.rstudio.com/2015/05/06/rstudio-v0-99-preview-more-editor-enhancements/). Many time I hoped that a version of the multiple cursor would exist where it would be possible to set a sequence of number, I even thought that I should do it. Well, I must admit that I have never looked up for the existence of such feature until recently and guess what... it already exists!! Check
[the multi-cursor-increment package](https://atom.io/packages/multi-cursor-increment) out!

Below I exemplify how I use this very helpful package, basically when I am too lazy to write a loop over 2 or 3 elements :smile::

{{< screencast src="./assets/multicursors.webm">}}


Briefly, I use the [default keybindings](https://flight-manual.atom.io/using-atom/sections/editing-and-deleting-text/#multiple-cursors-and-selections) for the core feature:

- `cmd-alt-up` or `cmd-alt-down` to select with the arrows;
- `ctrl-click` to set multiple cursors by clicking;
- `alt-f3` to set a cursor for all piece of code identical to the current seletion

Regarding the 'multi-cursor-increment' package, I have slightly changed the
default keybindings like so:

- `ctrl-alt-3` to set a sequence from 1:n where n is the number of cursors;
- `ctrl-alt-4` for an increment of 1;
- `ctrl-alt-2` for an decrement of 1.

I love this multi-cursors setup!
