package main

import (
	"SOEN341-Project/api/platform"
	"context"
	"fmt"
	"log"

	"google.golang.org/grpc"
)

const address = "localhost:9090"

func main() {

	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("failed to connect %v", err)
	}
	defer conn.Close()
	client := platform.NewPlatformClient(conn)
	status, err := client.AddClass(context.Background(), &platform.Class{Id: 6953, Topic: "Math"})
	if err != nil {
		log.Fatalf("error: %v", err)
	}
	fmt.Printf("success: %v\nmessage: %v\n", status.Success, status.Message)
}
