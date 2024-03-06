---
title: Debian Bookworm setup -- update
date: 2023-02-03
tags: [Linux, Debian, bookworm, setup]
descriptionOG: |
  In this post I shared my latest Debian setup.
---


I recently lent someone my Lenovo T470p and when I got it back, I decided to install
Debian back on it (I installed Ubuntu 22.04 to make it easier to use for a non-Linux user).
I went through all the installation seamlessly, but I was not able to have the wifi working. I knew it was related to `firmware-iwlwifi`, but I was unable to install it. 
As it turned out, the package was not available for bookworm (found this but looking at https://packages.debian.org/search?keywords=iwlwifi), probably due to some bugs (see https://bugs.debian.org/cgi-bin/pkgreport.cgi?pkg=firmware-iwlwifi;dist=unstable).


As I was looking for a solution, I found a pdf on the Lenovo website that explain how to install Debian (see ['Debian GNU/Linux Setup Guide For ThinkPad P53, P73'](https://download.lenovo.com/pccbbs/mobiles_pdf/lenovo_thinkpad_p53_p73_debian10_installation_v1.0.1.pdf)) with a solution (a manual install) that did not work for me (I may have done something wrong). The solution was to install an older version. I simply looked up for an older version of [firmware-iwlwifi.deb], and it worked. 


<br>


For the remaining installation, I used my gist with minor adjustements: 

<script src="https://gist.github.com/KevCaz/8c4074549d460c3f4cab168b3f6c63ab/18187897bd09a104174451cd3f94739bf20d5e48.js"></script>