---
title: "Resize image with Imagemagick"
date: 2018-10-05
tags: [ImageMagick, resize, image manipulation, shell script]
---


[ImageMagick](https://www.imagemagick.org/script/index.php) is a time saver!
It's designed and extremely powerful for manipulating images with a few command lines.
Few weeks ago, I had to [resize a bunch of `.png` images](http://www.imagemagick.org/Usage/resize/#shrink) and realize how helpful
ImageMagick could be is such case! All I had to do was creating a short
shell script very similar to the following lines:

```sh
mkdir img_resized
for f in *.png
do
  convert $f -resize 250x250\> img_resized/${f%.png}_250.png
done
```

Note that here, the size is expressed in pixels (`250x250`) and only images
larger than 250&nbsp;px are shrunk (as I use the `>` flag).
There are many arguments and several ways of using them (*e.g.* you
can use percentage with `-resize`), if you are interested in learning more, I
recommend you have a [look at the documentation of imageMagick](https://www.imagemagick.org/script/index.php).
By the way, the R :package: [magick](https://cran.r-project.org/web/packages/magick/index.html)
proposes a set of bindings to call ImageMagick directly from R.
