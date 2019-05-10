---
title: "Make your computer talk!"
date: 2018-10-20
tags: [Linux, spd-say, espeak, speech synthesizer, cli]
---

When I was on MacOS, I really enjoyed the command [say](https://www.tekrevue.com/tip/make-your-mac-talk-say-command/)  to make my macOS speak (another bad reason to procrastinate) and I was looking
for a similar tool on Linux to make my Lenovo speak :smile:.  After a quick
search, I found two software: `spd-say` and `espeak`. They both offer the
same basic options, similar to the ones `say` provides on MacOS.


### `spd-say`

`spd-say` was already included in the set of tools I install with Debian
so I checked out the documentation with `man spd-say`:

```sh
NAME
       spd-say - send text-to-speech output request to speech-dispatcher

SYNOPSIS
       spd-say [options] "some text"

DESCRIPTION
       spd-say  sends  text-to-speech  output  request to speech-dispatcher process which
       handles it and ideally outputs the result to the audio system.

[...]
```

On my current set up, the default language was English:

```sh
❯ spd-say "hello, my name is Bob"
```

In order to check out the complete list of languages, one must use option `-L`:

```sh
 ❯ spd-say -L
```

then option `-l` to select the language:

```sh
 ❯ spd-say -l es -t female2 -r -20 "Yo soy Miguel"
```

In the command above, I used option `-t` to select a specific type of voice
and `r` to set the rate of speech, it takes a value between -100 (very slow) and
+100 (very quick).



### `espeak`

`espeak` required to be installed, so on my Debian machine I first entered:


```sh
❯ sudo apt-get install espeak
```

Again, I first skimmed he documentation, *i.e.* `man espeak`:

```sh
NAME
       espeak - A multi-lingual software speech synthesizer.

SYNOPSIS
       espeak [options] [<words>]

DESCRIPTION
       espeak is a software speech synthesizer for English, and some other languages.

[...]
```

So, in order to display the list of voices available I had to type:  

```
❯ espeak --voices
```

And then I used `-v` to select the language, `-s` to set the speed of speech
(expressed as a number of words per minutes) and `-p` adjust the pitch
(0 being very flat, 99 very sharp):

```
❯ espeak -v pt-br -p 20 -s 200 "Eu sou brasileiro"
```
