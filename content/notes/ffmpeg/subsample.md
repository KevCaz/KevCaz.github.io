---
title: "FFMPEG"
date: 2018-09-14
draft: true
---

FFMEPG could be a string asset subsample a specific extract of a video

```
ffmpeg -ss 00:56:42.500 -i yourvideomp4 -t 3.4 -c copy out.mp4         
```


Conversion audio format:

```sh
# wma to mp3
for i in *.wma; do ffmpeg -i "$i" -b 320kb "${i%wma}mp3"; done

# flac to mp3
for i in *.flac; do ffmpeg -i "$i"  -b 320kb "${i%flac}mp3"; done

# flac en alac
for i in *.flac; do ffmpeg -i "$i" -acodec alac  "`basename "$i" .flac`.m4a"; done;
```
