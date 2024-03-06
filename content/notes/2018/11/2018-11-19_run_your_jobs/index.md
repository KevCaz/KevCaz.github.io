---
title: "Run your jobs one by one on Travis!"
date: 2018-11-19
tags: [continuous integration, Travis]
---

I now test [rcites](https://github.com/ropensci/rcites) for [4 configurations
on Travis](https://travis-ci.org/ropensci/rcites) so Travis runs 4 jobs. For a
while, I was running all the jobs at once, and as rcites is R-client for a
web API, many of the jobs failed because of the well-known error 429:

> Too Many Requests (RFC 6585) (HTTP 429).

I always ended restarting some jobs, I coped with it. At some point, I stepped
back and thought: "people people behind Travis are smart,
so they should have thought about limiting concurrent jobs". You bet they did!
It's one of the many settings available. So I simply switched the button
`Limit concurrent jobs` in `Settings/General` and on a set the limit to 1.
No more HTTP 429!
