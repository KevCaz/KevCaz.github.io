---
title: "I love the 'multi-cursor-increment' package"
date: 2018-09-19
tags: [Atom, cursor, selection]
---

I do like the [multiple cursors in Atom](https://flight-manual.atom.io/using-atom/sections/editing-and-deleting-text/#multiple-cursors-and-selections). I first used such feature on
[Sublime Text](http://www.sublimetext.com/) a couple of years ago and now I use it pretty much everyday. Since that time, I have noticed that this is now a common feature among editors/IDEs, for instance, R users can use it in [RStudio](https://blog.rstudio.com/2015/05/06/rstudio-v0-99-preview-more-editor-enhancements/). Many time I hoped that a version of the multiple cursor would exist where it would be possible to set a sequence of number, I even thought that I should do it. Well, I should admit that I have never looked up for the existence of such feature until recently and you know what... it already exists!! Check
[the multi-cursor-increment package](https://atom.io/packages/multi-cursor-increment) out!

Below I demonstrate a case where I use this very helpful package (basically when I am too lazy to write a loop over 2 or 3 elements :smile:):

<video width="100%" controls>
 <source src="/notes/atom/assets/multicursors.webm" type="video/webm">
 Your browser does not support the video tag.
</video>


![](/notes/atom/assets/multicursors.webm)


Briefly, I use the [default keybindings](https://flight-manual.atom.io/using-atom/sections/editing-and-deleting-text/#multiple-cursors-and-selections) for the core feature:

- `cmd-alt-up` or `cmd-alt-down` to select with the arrows;
- `ctrl-click` to set multiple cursors by clicking;
- `alt-f3` to set a cursor for all piece of code identical to the current seletion

Regarding the 'multi-cursor-increment' package, I have slightly changed the default keybindings:

- `ctrl-alt-3` to set a sequence from 1:n where n is the number of cursors;
- `ctrl-alt-4` for an increment of 1;
- `ctrl-alt-2` for an decrement of 1;
