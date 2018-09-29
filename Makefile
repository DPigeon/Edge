PROTO_PATH = ./api/platform/

.PHONY:  proto build

build: proto
	go install ./...

proto:
	protoc --proto_path=$(PROTO_PATH) platform.proto --go_out=:$(PROTO_PATH)
	