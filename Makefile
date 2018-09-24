PROTO_PATH = ./api/shift_service_api/

.PHONY: dep proto db

build: proto
	go install ./...

proto:
	protoc --proto_path=$(PROTO_PATH) shift.proto --go_out=plugins=grpc:$(PROTO_PATH)
