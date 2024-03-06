---
title: "Use FFmpeg!"
date: 2018-09-13
tags: [ffmpeg, video, audio, format, freeware]
---

As mentioned on its website, [FFmpeg](https://www.ffmpeg.org/) is:

> A complete, cross-platform solution to record, convert and stream audio and video.

FFmep is a powerful freeware, as mentioned on the [Wikipedia page](https://en.wikipedia.org/wiki/FFmpeg)


> FFmpeg includes libavcodec, an audio/video codec library used by many commercial and free software products, libavformat (Lavf),[6] an audio/video container mux and demux library, and the core ffmpeg command line program for transcoding multimedia files.

[libavcodec is actually used in VLC](https://en.wikipedia.org/wiki/VLC_media_player)
a popular multimedia you may be familiar with. Personally I value FFmpeg for its
CLI that allows many audio/video format manipulation and conversion. For instance,
in order to get a sample of 3.4 seconds from a video (let's say in `.mp4`)
starting at *56min42sec500ms* , do this:


```sh
ffmpeg -ss 00:56:42.500 -i yourvideo.mp4 -t 3.4 -c copy out.mp4         
```

Also, to convert audio file in batch formats in batch:

```sh
# wma to mp3
for i in *.wma; do ffmpeg -i "$i" -b 320kb "${i%wma}mp3"; done

# flac to mp3
for i in *.flac; do ffmpeg -i "$i"  -b 320kb "${i%flac}mp3"; done

# flac en alac
for i in *.flac; do ffmpeg -i "$i" -acodec alac  "`basename "$i" .flac`.m4a"; done;
```

The CLI is fairly simple and if you know a bit a `bash` then I,m sure many ideas
pop up in your mind and make you realize how powerful this could be.
