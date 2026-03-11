---
title: "Using `pass` in a team"
date: 2025-06-12
tags: [password, pass, cli]
---

I use [pass](https://www.passwordstore.org/) for my password management everyday. I use it for my own usage, but the need to share passowrd with my team has become more important. I decided to see whether it was possible to use pass to do it and stumbled into the post ['Using pass in a team'](https://medium.com/@davidpiegza/using-pass-in-a-team-1aa7adf36592) by David on Medium. 

This provided all the steps to configure a shared repository. The goal of this post is not to rephrase what David explains throughout his posts but to complement and clarify what was not clear in the original post. 

First it may not be obvious, but in the post it is said that team member must sign the keys of your teammates using the `gpg --edit-key` command. Before that being possible, user must have received the public key of the user, to do so 

```

```