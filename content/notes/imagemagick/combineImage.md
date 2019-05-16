---
title: "Combine images with ImageMagick"
date: 2019-05-16
tags: [ImageMagick, image manipulation, convert, PhyloPic]
---

I do love create figures with R, I found quite satisfying to make them very
personalized, yet reproducible! However I sometime wish that combining two
plots was  easier (as it often requires to build larges matrices and crazy
`layout()` calls). I was looking for a simple way to do basic combinations of
customized R figures, and I stumbled on [this discussion on <i class="fa
fa-stack-exchange"
aria-hidden="true"></i>](https://superuser.com/questions/290656/combine-multiple-images-using-imagemagick)
showing how easy it is to do so with
[ImageMagick](https://imagemagick.org/script/develop.php). Let me exemplify with
a reproducible example based on two silhouettes by [Timothey
Bartley](https://www.researchgate.net/profile/Timothy_Bartley) available on
[PhyloPic](http://phylopic.org/) (note that I use 2 images here, but it works
the same way with more):

1. [lake trout](http://phylopic.org/image/d8072f32-4792-4649-a318-c9e37ccc023d/) (*Salvelinus namaycush*);  
2. [yellow perch](http://phylopic.org/image/5e431267-dc57-435d-a64f-b91d4c569677) (*Perca flavescens*).

Let's first create a folder `assets` and download the silhouettes with [wget](https://www.gnu.org/software/wget/manual/):

```shell
mkdir assets
wget http://phylopic.org/assets/images/submissions/5e431267-dc57-435d-a64f-b91d4c569677.1024.png -O assets/perca_flavescens.png
wget http://phylopic.org/assets/images/submissions/7f2cbb42-12b1-4481-8ac0-705eb7363c74.1024.png -O assets/salvelinus_namaycush.png
```

Here there are:

1. `perca_flavescens.png`

{{< imgcenter "/notes/imagemagick/assets/perca_flavescens.png" "35" >}}

2. `salvelinus_namaycush.png`

{{< imgcenter "/notes/imagemagick/assets/salvelinus_namaycush.png" "35" >}}

<br>

To combine them, you just need to use `convert` with the option `+append` to
combine them horizontally or `-append` to combine them vertically. Let's start
with `+append`:


```shell
convert +append assets/perca_flavescens.png assets/salvelinus_namaycush.png assets/fishH.png
```

{{< imgcenter "/notes/imagemagick/assets/fishH.png" 35 >}}

:boom: Neat, right? There is something about the default behavior you need to know, though. Indeed, by default, the images are top-aligned and so, if one image is shorter, a patch is added to make the image of the same size and this patch has a white background by default. You may not have noticed this here, but it'd be obvious with a black background:

```shell
convert +append -background black assets/perca_flavescens.png assets/salvelinus_namaycush.png assets/fishH1.png
```

{{< imgcenter "/notes/imagemagick/assets/fishH1.png" 35 >}}

By showing you this problem, I've almost solved it! So if you want to get rid of the white background, add a transparent one!

```shell
convert +append -background transparent assets/perca_flavescens.png assets/salvelinus_namaycush.png assets/fishH2.png
```

{{< imgcenter "/notes/imagemagick/assets/fishH2.png" "35" >}}

<br>

And now let's combine the image vertically with a transparent background for the patch:

```shell
convert -append -background transparent assets/perca_flavescens.png assets/salvelinus_namaycush.png assets/fishV.png
```

{{< imgcenter "/notes/imagemagick/assets/fishV.png" 35 >}}


Love this trick! Two short remarks to end this note:

1. there are many programming langages that [interface ImageMagick](https://imagemagick.org/script/develop.php);
2. the R :package: [patchwork](https://github.com/thomasp85/patchwork) is making this kind of operation really easy with ggplot2.

<br>

#### See ya next note :pencil:
