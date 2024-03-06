---
title: "More radio stations"
date: 2018-11-04
tags: [GNOME, GNU, Rhythmbox, audio, internet radio]
---

I am a radio listener and a podcast addict :radio:! Yesterday, I spent some time adding more
radio stations with [Rhythmbox](https://wiki.gnome.org/Apps/Rhythmbox). I
really love this software, it is simple and do everything I need, adding a new
radio station with it was straightforward but it requires first to find the
URLs of the radio stations to be added as there is no radio browser integrated
(but have a look at [radio-browser](https://github.com/fossfreedom/radio-browser)).
So to be more accurate, I spent some time finding where to find such URLs!

Lists of URLs for well-known broadcasters are easy to find, for instance I
quickly found the list of [URLs for BBC radio stations](http://www.suppertime.co.uk/blogmywiki/2015/04/updated-list-of-bbc-network-radio-urls/)
and the list for [CBC ones](https://www.cbc.ca/radio/includes/streams.html). What
I found more complicated was to find a database with internet radios that broadcast
music not only because there are tons of them, but also because the websites
that are meant to let you discover them rarely provide the URLs you need :angry:.
I finally found [InternetRadio](https://www.internet-radio.com/) that really
made my day: it gathers many radio stations and sort them by genres, bitrate
and the current number of listeners! Once I found a station I liked,
I simply had to download the corresponding `.m3u` file, Rhythmbox reads it and
adds the internet radio to my list of internet radios that is actually stored in
`.local/share/rhythmbox/rhythmdb.xml`.


By the way, I also found this amazing website [radio.garden](http://radio.garden),
as I said in a tweet:

{{< tweet user="KCazelles" id="1058787657390551040" >}}
