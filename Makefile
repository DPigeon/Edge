.PHONY: install-dep

install-dep:
	cd ./backend
	npm i --save

test: install-dep
	cd ./backend && npm test


