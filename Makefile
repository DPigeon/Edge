.PHONY: install-dep

install-dep:
	cd ./backend && npm i --save
	cd ./frontend && npm i --save

test: install-dep
	cd ./backend && npm test
	cd ./frontend && CI=true npm test


