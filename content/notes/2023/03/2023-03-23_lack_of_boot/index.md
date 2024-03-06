---
title: "Lack of boot space"
date: 2023-03-23
tags: [Ubuntu, apt, boot]
---

On my Ubuntu 20.04 device at work, I ran into the same issue several times.  Basically, I was not able to install the latest kernel because I was running out of boot space. As it turned out, the previous kernel images were kept and as I had only 700&nbsp;Mb of boot space (`/boot` partition), after stacking a few images (most of them were [OEM kernels](https://wiki.ubuntu.com/Kernel/OEMKernel)) I was not able to update the kernel. After reading several posts (e.g. [here](https://askubuntu.com/questions/1207958/error-24-write-error-cannot-write-compressed-block) and [there](https://digitaliandm.com/2022/08/12/ubuntu-22-04-1-and-also-how-i-solved-the-fg-boot-space-issue/)) I was able to identify and delete the old kernel images that were no longer needed, i.g:

```sh
sudo apt autoremove --purge linux-modules-5.11.0-27-generic
```


