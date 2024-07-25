---
title: "Concatenate audio files with FFmpeg"
date: 2020-10-24
tags: [FFmpeg, audio, format, concatenate]
---

Yesterday I needed to combine several audio files and I figured out to do this
with command lines. It was not as easy as I expected but I guess I 
underestimated how little I know about audio files! Anyway, below I explain what
I did! 


## Preparing my audio files 

I had several audio files that I recorded with the [voice
recorder](https://play.google.com/store/apps/details?id=com.sec.android.app.voicenote&hl=fr_CA&gl=US)
available on my phone. This application saves audio files as
[`.m4a`](https://en.wikipedia.org/wiki/MPEG-4_Part_14), so basically I had a
bunch of `.m4a` files! 

Between every file I recorded I needed to add a blank, so instead of recording a
blank, I created blank of 30 seconds with [FFmpeg](https://ffmpeg.org/) (see
[this gist](https://gist.github.com/daz/30862fdd0fef80c1bbed37204c9d8a14)):

```sh
ffmpeg -f lavfi -i anullsrc=r=11025:cl=mono -t 30 -acodec aac out.m4a
```

Then I had to so some cuts. For instance, I needed to only use the first 1min 30sec 
`part2_all.m4a`, so I used FFmpeg one more time: 


```sh
ffmpeg -ss 0 -t 90 -i part2_all.m4a part2c.m4a
```

and so I obtained `part2c.m4a`. That being done I had all the files I needed.


## Concatenate the files

That was the tricky part, cause it is not super easy to 
concatenate audio files because of [codecs](https://en.wikipedia.org/wiki/Codec) and [timestamps](https://en.wikipedia.org/wiki/Timestamp)... As all my files where all in `.m4a` I thought I woul be able to use the [FFmpeg
to concatenate files with same
codecs](https://trac.ffmpeg.org/wiki/Concatenate#samecodec), but it did not
work. I try to use other formats but it did not work either.  Fortunately, I
stumbled into the [following <i class="fab fa-stack-exchange"
aria-hidden="true"></i>
answer](https://superuser.com/questions/1368180/concatenation-of-m4a-files-is-either-too-long-or-too-short)
that gives valuable information about this. The solution proposed is to convert files to
[Pulse-code modulation](https://en.wikipedia.org/wiki/Pulse-code_modulation), then 
use a simple file concatenation with [`cat`](https://www.geeksforgeeks.org/cat-command-in-linux-with-examples/) (cause this is possible with such files)
and then convert the file thereby obtained back to `.m4a`. So this is what I have done:

```sh
# convertion to pcm 
for f in *.m4a
do 
  ffmpeg -i ${f%.*}.m4a -c:a pcm_s16le -ac 2 -ar 48000 -f s16le ${f%.*}.pcm
done
# concatenate files 
cat blank.pcm part1.pcm blank.pcm part2c.pcm part2f.pcm blank.pcm part3.pcm blank.pcm part4.pcm blank.pcm > final.pcm
# back to .m4a
ffmpeg -f s16le -ac 2 -ar 48000 -i final.pcm -c:a aac -b:a 192K -ac 2 final.m4a
```

and so I got `final.m4a` :boom:! 

Two last remarks. First, I have also tried with [`.aac`
files](https://en.wikipedia.org/wiki/Advanced_Audio_Coding) following [this <i
class="fab fa-stack-overflow" aria-hidden="true"></i> answer
](https://stackoverflow.com/questions/18434854/merge-m4a-files-in-terminal), but
it did not work. And again I can just blame myself for not knowing enough about
this, so I still do really know why... I guess it means that I can learn a
lot about audio files! Second, I would like to mention [SoX](http://sox.sourceforge.net/) that looks like a
very handy tool for this kind of manipulation, but I did not test it yet! Maybe next time! 
