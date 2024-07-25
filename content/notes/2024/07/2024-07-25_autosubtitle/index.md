---
title: "Generating subtitles with `auto_subtitle`"
date: 2024-07-25
tags: [python, ai, cli, FFmpeg, whisper, autosubtitle]
---

I was recently trying to obtain subtitles for a video in Spanish. 
For numerous movies and TV shows, it is relatively easy to find subtitles files  online (mainly as `.srt` files, i.e. [SubRip files](https://sourceforge.net/projects/subrip/files/subrip/SubRip%201.57.1/)), but that is not true for all contents!

When I thought about automating the generation of subtitles for a minute, I was convinced that with a tool to extract the audio from a movie file and a trained AI model that would generate the transcript, it should be doable to automate the process. My second thought was: "If I can envision it so clearly, somebody has done it!". Well... I was right!

I was quickly referred to [Capte](https://www.capte.co/) that does exactly that. It is free for a short period after which you have to pay for the service. At that point, a third thought came to my mind: "there should be an open source version of the tool". A quick search on Reddit led me to
[`auto_subtitle`](https://github.com/m1guelpf/auto-subtitle) built by [Miguel
Piedrafita](https://miguel.build/) that leverages [Whisper made by OpenAI](https://openai.com/index/whisper/) and [FFmpeg](https://www.ffmpeg.org/). In a simple command line I can obtain a .srt file:

```sh
$ auto_subtitle my_movies_spanish.mp4 --output_dir ./subs --output_srt TRUE --srt_only TRUE
Extracting audio from my_movies_spanish...
Generating subtitles for my_movies_spanish... This might take a while.
Detected language: Spanish
 3%|██                                            | 6884/267421 [00:06<04:38, 936.51frames/s]
```

And it can also do the translation! Neat! Capte may leverage such solution, who knows, good for them if this works. What makes me happy is that people built such tool and make them open source. Also, the combo AI/FFmpeg gives plenty of idea on the kind of new and powerful tools that can be built combining AI with more "traditional" pieces of software.

