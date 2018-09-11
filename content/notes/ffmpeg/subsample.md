---
title: "FFMPEG"
date: 2018-09-14
draft: true
---

As the website mention, [FFmepg] is:

> A complete, cross-platform solution to record, convert and stream audio and video.

FFmep is an extremelly powerful freeware, as mentioned on the [Wikipedia page](https://en.wikipedia.org/wiki/FFmpeg)


> FFmpeg includes libavcodec, an audio/video codec library used by many commercial and free software products, libavformat (Lavf),[6] an audio/video container mux and demux library, and the core ffmpeg command line program for transcoding multimedia files.

[libavcodec is used in VLC](https://en.wikipedia.org/wiki/VLC_media_player)
a popular multimedia. Personnaly I value FFmpeg for its CLI that allows
many cnversation and can be easily integrated in bash script. For instance
to subsameple a usie strating at *56min42sec500ms* for 3.4 seconds:


```
ffmpeg -ss 00:56:42.500 -i yourvideomp4 -t 3.4 -c copy out.mp4         
```

Also it is extremelly helpful to convert audio formats in batch:

```sh
# wma to mp3
for i in *.wma; do ffmpeg -i "$i" -b 320kb "${i%wma}mp3"; done

# flac to mp3
for i in *.flac; do ffmpeg -i "$i"  -b 320kb "${i%flac}mp3"; done

# flac en alac
for i in *.flac; do ffmpeg -i "$i" -acodec alac  "`basename "$i" .flac`.m4a"; done;
```
