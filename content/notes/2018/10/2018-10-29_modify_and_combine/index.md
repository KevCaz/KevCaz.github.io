---
title: "Modify and combine a set of files in one"
date: 2018-10-29
tags: [cli, GNU, core utilities, Unix, head, tail]
---


Today I was looking for a way to combine a set of files in one but before
appending a given file, the 2 first lines as well as the last line had to be removed. On Stackoverflow <i class="fa fa-stack-overflow" aria-hidden="true"></i> I found a couple of answers (see questions [18006581](https://stackoverflow.com/questions/18006581/how-to-append-contents-of-multiple-files-into-one-file), [12176492](https://stackoverflow.com/questions/12176492/shell-delete-the-last-line-of-a-huge-text-log-file) and [5410757](https://stackoverflow.com/questions/5410757/delete-lines-in-a-text-file-that-contain-a-specific-string)) and based on these I decided to use a combination of
[head](https://www.gnu.org/software/coreutils/manual/html_node/head-invocation.html) and [tail](https://www.gnu.org/software/coreutils/manual/html_node/tail-invocation.html). I ended up creating the following shell script:

```sh
#!/bin/bash
touch biblio.yaml
for f in refs/*.yml
do
  tail -n+3 $f | head -n-1 >> biblio.yaml
  echo "\n" >> biblio.yaml
done
```

Let's break it down:

- first the [Shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) to mention that it is a bash script;
- then `touch biblio.yaml` creates the file where all other files will be appended;
- a `for` loop over the set of files in `refs` that ends by `.yml`, at each iteration of the loop, `$f` will be a new file;
- for each file, print the last lines of the files starting with line 3 (`tail -n+3`), then take the result (`|`) and print the first lines of it but stop at the line before the last one (`head -n-1`) then append the result in biblio.yaml (`>> biblio.yaml`);
- the iteration with the addition of a line break: `echo "\n" >> biblio.yaml`.
