package main

import (
	"SOEN341-Project/api/implemented"
	"SOEN341-Project/api/platform"
	"log"
	"net"

	"google.golang.org/grpc"
)

// implements platformserver

const port = ":9090"

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	grpcServer := grpc.NewServer()
	platform.RegisterPlatformServer(grpcServer, &implemented.Server{})

	err = grpcServer.Serve(lis)
	if err != nil {
		log.Printf("failed to serve: %v", err)
		panic(err)
	}

}
