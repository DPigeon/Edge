.PHONY: build run

build:
	    go install ./...

run: build
    sudo enpoint
