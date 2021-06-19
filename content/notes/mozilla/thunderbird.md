---
title: What is wrong with Thunderbird?
date: 2021-06-19
tags: [Debian, Thunderbird, installation, Evolution]
---

Few days ago, as I was trying to refresh my emails, I realize that Thunderbird (Thunderbird [78.11.0](https://www.thunderbird.net/en-US/thunderbird/78.11.0/releasenotes/)) was no longer able to retrieved my mails from Gmail. I tried to understand what was the problem but I wasn't able to figure it out. After a while, I decided to uninstall Thunderbird and reinstall it. Things just got worst I couldn't set any of my email accounts. For my Gmail, I tried to use [OAuth2](https://auth0.com/docs/protocols/protocol-oauth2), as it is [recommended](https://support.mozilla.org/en-US/questions/1269204) (it used to work for me), but the identification protocol did not work: instead of getting the Gmail interface to login, I got an error message pointing out a lack of security (`NS_ERROR_NET_INADEQUATE_SECURITY`)... As I did not understand why, I decided to stop speeding time on trying to find the origin of the problem. All I can say if that it should be related with the latest patch, [78.11.0-1](https://metadata.ftp-master.debian.org/changelogs//main/t/thunderbird/thunderbird_78.11.0-1_changelog) (and my setup, I guess). 
 
 ```sh
 $ apt policy thunderbird
 thunderbird:
   Installed: 1:78.11.0-1
   Candidate: 1:78.11.0-1
   Version table:
  *** 1:78.11.0-1 500
         500 http://ftp.ca.debian.org/debian bullseye/main amd64 Packages
         100 /var/lib/dpkg/status
 ```

 
As I much prefer to use email client, I went the easy way and I set up another one! I opted for [Evolution](https://wiki.gnome.org/Apps/Evolution) that was already installed on my machine. For my HGmail account it went smoothly, For my Yahoo account, I had to set up an application password (it's in the security panel in the email interface) and looks like this is how the `normal password` should be used (it did not work with the actual password). I am not sure that I understand all of this correctly and I certainly do not understand why it should all so complicated to setup a email client... 

To end this post I would like to mention that even if they may not always be the easiest way to process your emails, CLI email clients are also an option. I actually gave a go to [himalaya](https://github.com/soywod/himalaya), written in Rust, and I was amazed: it took me literally 2 minutes to set it up, and it is super easy to use. I can definitively see myself using it on a regular basis, we shall see! 








 