---
title: "Make an image your favorite icon (favicon)"
date: 2018-10-24
tags: [ImageMagick, image manipulation, favicon]
---

[Favicon](https://en.wikipedia.org/wiki/Favicon) are every useful for visual
grepping: we use them pretty much every day to quickly find a website in your
bookmarks or to remember what a specific tab is about! Recently, I needed to convert a `.png` into a favicon, I knew that [ImageMagick could handle this](https://www.imagemagick.org/discourse-server/viewtopic.php?t=26252), here is the command line I used:

```bash
convert McTrickle.png -define icon:auto-resize=128,64,48,32,16 favicon.ico
```

ImageMagick :arrow_right: :+1: :trophy:!
