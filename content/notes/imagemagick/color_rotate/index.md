---
title: "Color and rotate an image with ImageMagick"
date: 2019-12-02
tags: [ImageMagick, image manipulation, convert]
---


I've already written about ImageMagick in previous notes (e.g. [this
one](/notes/imagemagick/resizeimagemagick) about image resizing). Yesterday I
used [`convert`](https://imagemagick.org/script/convert.php) to color and rotate
an image and I would like to show how simple it is here. Note that in order to
show what the different command lines yield, I've used the PNG file of the
GitHub Octocat (`Octocat.png`) available at https://github.com/logos.

{{< figcenter "./Octocat.png" 30 "Octocat.png" >}}

To fill `Octocat.png` with black, I've used the following command line:

```sh
$ convert Octocat.png -fill black -colorize 100% Octocat_black.png
```

that created `Octocat_black.png`

{{< figcenter "./Octocat_black.png" 30 "Octocat_black.png" >}}


the option `-fill` accept all color format listed at https://imagemagick.org/script/color.php. For instance I can use `#80cbc3`


```sh
$ convert Octocat.png -fill '#80cbc3' -colorize 100 Octocat_blue.png
```

{{< figcenter "./Octocat_blue.png" 30 "Octocat_blue.png" >}}

Note that the `%` after 100 is optional. Using a value lower that 100, say 80 o4 40, tints the image with the desired color!


```sh
$ convert Octocat.png -fill '#80cbc3' -colorize 80 Octocat_blue80.png
```

{{< figcenter "./Octocat_blue80.png" 30 "Octocat_blue80.png" >}}


```sh
$ convert Octocat.png -fill '#80cbc3' -colorize 40 Octocat_blue40.png
```

{{< figcenter "./Octocat_blue40.png" 30 "Octocat_blue40.png" >}}

Using a value above 100 yield funky results (I did not check whether this is expected)

```sh
$ convert Octocat.png -fill '#80cbc3' -colorize 200 Octocat_weird.png
```

{{< figcenter "./Octocat_weird.png" 30 "Octocat_weird.png" >}}

It is also pretty straight forward to add a background to the image as explain in [this article available at codeyarns.com](https://codeyarns.com/2014/11/19/how-to-set-background-color-in-imagemagick/)


```sh
$ convert Octocat.png -background '#80cbc3' -flatten Octocat_bg.png
```

{{< figcenter "./Octocat_bg.png" 30 "Octocat_bg.png" >}}


Note that `-flatten` is required otherwise it would not add the background layer required.
As explained in the [documentation](https://imagemagick.org/script/command-line-options.php#layers) `flatten` does the following :

>  Create a canvas the size of the first images virtual canvas using the current -background color, and -compose each image in turn onto that canvas. Images falling outside that canvas is clipped. Final image will have a zero virtual canvas offset.


Rotating an image is even more simple, is only requires to use the `roate` option (see the list of options available for `convert` at https://imagemagick.org/script/convert.php)


```sh
$ convert Octocat.png -rotate "45" Octocat_45.png
```

{{< figcenter "./Octocat_45.png" 30 "Octocat_45.png" >}}


Finally, all the step above can be combined is one line to do multiple transformations at once !

```sh
$ convert Octocat.png -background black -flatten -rotate "-45" -fill '#80cbc3' -colorize 80 Octocat_all.png
```

{{< figcenter "./Octocat_all.png" 30 "Octocat_all.png" >}}

<br>


To conclude this note, I'd like to mention that I'm currently using ImageMagick 6

```sh
$ convert --version
Version: ImageMagick 6.9.10-23 Q16 x86_64 20190101 https://imagemagick.org
Copyright: © 1999-2019 ImageMagick Studio LLC
```

even thought there have been a major release in 2015, ImageMagick 7 ([not
available in Debian Sid yet](https://tracker.debian.org/pkg/imagemagick)), which
I still need to try. That said, [ImageMagick 6 should be supported and enhanced
at least until
2025](https://www.imagemagick.org/discourse-server/viewtopic.php?t=28749) and
the command line above should work for ImageMagick 7 just as fine.
