---
title: "GitHub actions, checkout and submodule"
date: 2019-12-04
tags: [continuous integration, GitHub, GitHub Actions, checkout, submodule]
type: "siliconote"
---


I now use [GitHub Actions](https://github.com/features/actions) to deploy this website (see my [previous note about it](../githubactions)) and last Monday (two days ago :smiley:) after I pushed I got an email saying the deployment failed and found the following error message in the console log:

```sh
##[error]The input 'submodules' is not supported in actions/checkout@v2
```

Turns out this is because version 2 of [checkout](https://github.com/actions/checkout) does not support submodule yet (see this issue report https://github.com/actions/checkout/issues/81) which I use to install my [Hugo Theme](https://github.com/KevCaz/hugo-KevCaz). All I had to do was to use a previous version, so I replaced `uses: actions/checkout@master` by `uses: actions/checkout@v1.2.0` in my [`deploy.yaml`](https://github.com/KevCaz/KevCaz.github.io) file:


```yaml
name: github pages

on:
  push:
    branches:
    - dev

jobs:
  build-deploy:
    runs-on: ubuntu-18.04
    steps:
    - uses: actions/checkout@v1.2.0
      with:
        submodules: true
    - name: Setup Hugo
      uses: peaceiris/actions-hugo@v2.2.2
      with:
        hugo-version: '0.57.2'
        # extended: true
    - name: Build website
      run: hugo --minify
    - name: Deploy website
      uses: peaceiris/actions-gh-pages@v2.5.0
      env:
        ACTIONS_DEPLOY_KEY: ${{ secrets.ACTIONS_DEPLOY_KEY }}
        PUBLISH_BRANCH: master
        PUBLISH_DIR: ./public
```

Hope submodule soon will be supported soon in the new version!