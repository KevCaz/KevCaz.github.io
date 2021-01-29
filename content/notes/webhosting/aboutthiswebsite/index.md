--- 
title: "Time to talk about this website!"
date: 2021-01-29 
tags: [Hugo, website, GitHub pages]
---


For this 100<sup>th</sup> SilicoNote/post, I have decided to share some notes about this website : its story and a few details about how I built the last version of it.


## The short story behind my website

As far as I remembered, I have built 5 different versions of my personal
website. I decided to get a website when I was doing my PhD, back in 2014 (not a
100% about sur about the timeline), in order to share some of my work. With my
(very) modest skills I built a first website using CSS, HTML and a bit of PHP,
no framework of any sort, no static site generators either. It was hosted by
1and1 (which is now [Ionos](https://www.ionos.com/), apparently) and I used to
send updates to the server with [FileZilla](https://filezilla-project.org/). It
was a funny looking website... looked like a website from the 90's! Shame I
didn't take a screenshot! It lasted a year or so before I worked on a
second version.

In 2015, I rebuilt my personal website with [Jekyll](https://jekyllrb.com/),
which was a big improvement: I was able to write posts more efficiently cause I
wrote them with [Markdown](https://en.wikipedia.org/wiki/Markdown) and I was
able to use GitHub to version my website (now [archived on
GitHub](https://github.com/KevCaz/KevCazWebsite)) and to host it on [GitHub
Pages](https://pages.github.com/)! I had a good experience with Jekyll, it made
me realize the power of static site generators. But I struggled a bit with
[Liquid](https://shopify.github.io/liquid/) which, I guess, is the main reason why
I decided to try [Hugo](https://gohugo.io/) out, which I have been using ever
since. 

I created three different versions of my personal website with Hugo. The
learning curve was rather steep, but one step at a time, I managed to get used
to partials, shortcode, archetypes, etc. The documentation, including the great
[tutorials by Mike Dane](https://www.mikedane.com/) ('Giraffe Academy' at the
time) were extremely helpful for this! I first used the ['Academic'
theme](https://themes.gohugo.io/academic/) without any modification. It was well
suited for my needs and I was rather content with it, but at some point, I was
looking for more freedom and I decided to work on my skills to get such freedom.
So, for the second version (released in February 2018), I chose a very minimal
theme, [Hugo Xmin](https://xmin.yihui.org/), that I forked and tweaked in
[KevCaz/hugo-KevCaz](https://github.com/KevCaz/hugo-KevCaz). This was a good
mean to have a first experience with Hugo themes and this actually led me to
consider creating my own theme, which I did in the third Hugo version (so the
5<sup>th</sup> version total, released in February 2020), which is the one you
are looking at (well, at least if it is an update relatively close to [commit
`a2baec2`](https://github.com/KevCaz/KevCaz.github.io/commit/0ddcfc7556bd082b82ffdf953265cafc0932eee9)). I'd like to share what I've learned building this 5<sup>th</sup> version in what follows. 

{{< figcenter "look_012021.png" 100 "Screenshot of the home page of this website (localhost, January 29<sup>th</sup> 2021, commit [a2baec2](https://github.com/KevCaz/KevCaz.github.io/commit/0ddcfc7556bd082b82ffdf953265cafc0932eee9))" >}}





## The 5<sup>th</sup> version

My website is now an important tool for me to gather and structure some details
about my professional life, to showcase my work and to write blog posts. When I
built my Hugo theme I had several goals in mind to either make my website even
more tailored to my needs or to use specific technologies : 

- I had a specific design in mind with two vertical navigation bars. 
- I wanted a fairly light theme (i.e. not relying on heavy external libraries/frameworks)
- I was eager to use [Sass](https://sass-lang.com/) (mainly to use variables in CSS)
- I was looking for using as many Hugo features as possible!

I achieved those goals by working a week or two on my theme: [funkyflex](https://github.com/KevCaz/funkyflex) and now I feel that I really have a website tailored to my needs, let me tell you a bit more in the next sections.


### First thing: the design 

I am glad that I thought about the design first, cause it helped me building the website step by step with a clear goal for the visual rendering. In my mind,
I had to get the following design elements right:  

- a main navigation bar on the left side, 
- no top navigation bar and no footer (actually this is only true for medium and large devices) 
- a secondary/contextual navigation bar to help navigating through the page content;
- the home page had to include an academic mission statement

By the way, I looked at various website to get ideas and I would like to mention the one by [Régis Philibert](https://regisphilibert.com/fr/) cause not only it contains great posts about Hugo, it also has an awesome design! 



### New HTML/CSS/Javascript knowledge

I am pleased that I've spent time learning [Sass](https://sass-lang.com/), using its features made my work with CSS way more efficient. The nice and clear [tutorials](https://grafikart.fr/tutoriels/sass) by Garfikart (this French is a rock star!) made my learning of Sass super easy, and the integration [Sass/Hugo](https://gohugo.io/hugo-pipes/scss-sass/) is already well documented! Have a look at the [assets/scss](https://github.com/KevCaz/funkyflex/tree/master/assets/scss) folder of my theme to check out what I've done!

I am also glad I took some time to learn a bit more about responsive web design and media queries. I have learned how to use [flexbox](https://grafikart.fr/tutoriels/flexbox-806) which helped me making my theme lighter as I didn't need to rely on external frameworks (such as Boostrap), which is pretty neat!

At some point, I asked some friends how to attach more infos to a URL. Doesn't make sense, right? Well that was my way of describing it... you know, on many platforms nowadays (e.g. Slack), when a URL is shared, it often comes with a text and/or an image! Turns out this is a protocol, [the Open Graph protocol](https://ogp.me/), and it is fairly easy to use, and so I did use in the file [header.html](https://github.com/KevCaz/funkyflex/blob/9189be9e81edd1d223d8aff1251b6551cb5610aa/layouts/partials/head.html#L42-L48) of my theme and I even made it an optional parameter for having specific text/image for posts in my website (see [head_custom.html](https://github.com/KevCaz/KevCaz.github.io/blob/772c1c6205e759ecd503ba82341c7c615b426b78/layouts/partials/head_custom.html))! 


{{< figcenter "shared_on_slack.png" 60 "URL of my home page shared on Slack." >}}


Finally, even though I had (and still have) very limited JavaScript skills, I
figured how to create my secondary basic using the Document Object Model (DOM)
(see my
[sidebar-secondary.js](https://github.com/KevCaz/funkyflex/blob/master/static/js/sidebar-secondary.js)
file). What amazed me is that with less than 15 lines of code I was able to
avoid appending an external library such as
[Tocify](http://gregfranko.com/jquery.tocify.js/), which is a great one, but
definitively an overkill for my needs.



### More Hugo features

As I mentioned above, one of my goal was to use as much Hugo features as I
could, which was a very sensible choice of mine! Lucky me, when I worked on this
project, [Hugo 60](https://gohugo.io/news/0.60.0-relnotes/) just came out which
was bringing new improvements! One of the major new feature was that Hugo became
[Common Mark compliant](https://gohugo.io/news/0.60.0-relnotes/) as it uses
[goldmark](https://github.com/yuin/goldmark) (Markdown parser written in Go)
ever since. I had the opportunity to embrace this new feature and one detail
I'll surely keep in mind is that one must use the following in `config.toml`

```.toml
[markup.goldmark.renderer]
unsafe = true
```

to render HTML tags with goldmark! The second change I've made and would like to
report here is that I chose [Chroma](https://github.com/alecthomas/chroma) over
[highlight.js](https://highlightjs.org/). Chroma has been supported since Hugo
0.28 and it is fast, has various great features (such as built-in line
numbering) and is user friendly, [check out the
documentation](https://gohugo.io/content-management/syntax-highlighting/). 




### New deployment skills

Well, as many developers (I guess), in 2020, I started to [move away from Travis CI](https://insileco.github.io/2020/11/24/continuous-integration-for-r-projects-from-travis-ci-to-github-actions-step-by-step/) and I started to use [GitHub Actions](https://github.com/features/actions) more and more frequently. And to deploy my new website with a new theme, I created a [workflow](https://github.com/KevCaz/KevCaz.github.io/blob/772c1c6205e759ecd503ba82341c7c615b426b78/.github/workflows/deploy.yaml) which is extremely efficient, and for this I am very grateful to [Shohei Ueda](https://peaceiris.com/) for [peaceiris/actions-hugo](https://github.com/peaceiris/actions-hugo)
and [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)!




### I've learned even more

There are a myriad of things that I've learned and I won't detail here. From
little technical details, such as the [difference between `rem` and
`em`](https://stackoverflow.com/questions/13941275/how-does-rem-differ-from-em-in-css)
to technologies I was not even aware of, such as [KaTeX](https://katex.org/) for
math typesetting (see [this cool post by Edwin
Kofler](https://eankeen.github.io/blog/posts/render-latex-with-katex-in-hugo-blog/)).
I may write notes about these in a near future and I will be very happy to use
my website to do so! After a year now, I am very very happy with this version
and I intend to keep it as is for at another year (at the very least), with tiny
tweaks here and there to make my personal website look even nicer! One goal I
have now is to work towards making it one of the official [Hugo
Themes](https://themes.gohugo.io/). This will require some work, but I'll be
happy to try! 



## tl;dr 

Hugo is great! Work on your CSS/HTML/Javascript skills and mix them with Hugo, you'll feel empowered and will easily build the static website that fulfill your needs!
