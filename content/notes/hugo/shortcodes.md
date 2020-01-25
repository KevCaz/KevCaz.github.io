---
title: "My video shortcode"
date: 2018-09-27
tags: [Hugo, website, shortcode, video]
---

[Shortcodes](https://gohugo.io/content-management/shortcodes/) are among my
favorite features in [Hugo](https://gohugo.io/). As I am currently writing
several notes a week that often include small screencasts, I thought that the
time had come for me to [create my own screencast shortcode](https://gohugo.io/templates/shortcode-templates/).
Here it is:

```html
<center>
  <video width='
    {{ if .Get "width" }}
      {{ .Get "width" }}
    {{ else }}
      100%
    {{ end }}'
  controls>
    <source src="{{ .Get `src` }}" type="video/webm">
    Your browser does not support the video tag.
  </video>
</center>
```

In this shortcode I have named the two arguments available:

1. `src` that has no default value;
2. `width` that is set to `100%` is no value is passed.

Also, I only use [.webm](https://en.wikipedia.org/wiki/WebM) file as it is an
open video format for the web (and the default format of screencast in
[GNOME](https://www.gnome.org/)). From now on, I include my screencast like so:

```html
{{</* screencast src="/notes/atom/assets/multicursors.webm" */>}}
```

and if I want to modify the width, I simply do:

```html
{{</* screencast src="/notes/atom/assets/multicursors.webm" width="50%" */>}}
```

Quite convenient, isn't it?

A last sentence to mention that I am actually using several shortcodes for this website (including one that
parses a list of authors) if you are interested, [have a look at the GitHub
repository](https://github.com/KevCaz/KevCaz.github.io/tree/dev/layouts/shortcodes).
