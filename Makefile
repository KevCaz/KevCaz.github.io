cur = $(shell pwd)
idf = $(shell head -n 1 pswd.md)
psw = $(shell head -n 2 pswd.md | tail -n 1)
adr = $(shell tail -n 1 pswd.md)


all: public/index.html

public/index.html: static/* content/*/* themes/*
	rm -rf public/
	hugo


online:
	ncftpput -Rz -u $(idf) -p $(psw) $(adr) ./ $(cur)/public/*;

clean:
	rm -rf public/
