---
title: "Memory issue with ImageMagick"
date: 2019-08-26
tags: [ImageMagick, image manipulation, convert, memory]
---



Today, I was [combining a set of images](/notes/imagemagick/combineimage/) like so:

```
convert -append figP*.png out.png
```

when I got error stating that `cache resources exhausted`. I was first surprised because it was the same set of images I combined a couple of days before EXCEPT that I significantly increased their resolution. So I  googled the error message and found [this issue](https://github.com/ImageMagick/ImageMagick/issues/396) on the GitHub repository of ImageMagick.

Well, turns out it was not a issue at all, I simply needed to change the memory limit as explained [here](https://www.imagemagick.org/script/security-policy.php) and well summarized in the issue:


> [...] increasing the memory limit in `/etc/ImageMagic-6/policy.xml`  works for me.

So, all I had to do was to go to `/etc/ImageMagick-6` (with a *k*, there is a typo in the original comment quoted above) and
modify `policy.xml`: I changed

```
<policy domain="resource" name="memory" value="256MiB"/>
```

for

```
<policy domain="resource" name="memory" value="1GiB"/>
```

Given my 16GB of memory, I thought it was ok to bump up to 1GB my :wink:!
