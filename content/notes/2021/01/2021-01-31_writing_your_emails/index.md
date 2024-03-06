---
title: "Writing your emails in Markdown with Thunderbird 78"
date: 2021-01-31
tags: [Thunderbird, Markdown, Markdown-Here]
---


For more than three years now, I have been written most of my emails in
Markdown! How so? I have been using the [Markdown
Here](https://markdown-here.com/) add-on for Thunderbird. As explained in the
['features' page](https://markdown-here.com/features.html) of the extension
website: 

> Markdown Here is an extension for Chrome, Firefox, Safari, Opera, Thunderbird, and Postbox. With it, you can write email in Markdown, and then click a button (or context menu item, or use a hotkey) to render the email into good-looking, fully formatted text (HTML, technically). 


It adds an <i class="fab fa-markdown" aria-hidden="true"></i> button that I can
click on to render Markdown in HTML, making my email looking pretty good, check
out the screencast :arrow_down: 


{{< screencast src="./assets/mailinmarkdown.webm" width="80%" >}}


The only issue that I have encountered so far, is that it's not super easy to
find a working Markdown Here add-on for newer Thunderbird versions, and when I
switched to Thunderbird 78 (current version below, for clarity) I struggled once
again.


```.sh
$ thunderbird -v   
Thunderbird 78.6.1
```

The reason for this is actually quite simple, [Adam
Pritchard](https://github.com/adam-p/markdown-here), the creator of the
extension, has disappeared (see issue
[#644](https://github.com/adam-p/markdown-here/issues) on GitHub). So when comes
a new version of Thunderbird, I can only hope that someone with the right skills
will be able to update the existing code to support the newer version of
Thunderbird. Fortunately, this time, [Rob Lemley, a.k.a.
jfx2006](https://github.com/jfx2006) (who is part of the Thunderbird core
development team) came to the rescue. He added Thunderbird 78 support in his
fork and released a [working add-on (`.xpi`
file)](https://github.com/jfx2006/markdown-here/releases/tag/v2.13.4_mailext).
So now I am very pleased to use Markdown Here, along with the [great features
brought by Thunderbird
78](https://blog.thunderbird.net/2020/07/whats-new-in-thunderbird-78/). 

Looks like many people are using Markdown Here (~50k stars on GitHub is a lot)
and now, at least one member of the Thunderbird core development is aware of the
enthusiasm of the community for this extension. That is why I am hoping that
such feature will eventually be part of the application it-self (I may be just
hoping too much here). Anyway, Markdown Here is a great extension and I am
extremely grateful to Adam Pritchard, wherever he is! 
