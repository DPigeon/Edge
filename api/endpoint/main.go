package main

import (
	"SOEN341-Project/api/model"
	"log"
	"net/http"
)

var database model.Dataset

const (
	port = ":9090"
)

func main() {
	database.Classes = make([]model.Class, 10)
	database.Parents = make([]model.Parent, 10)
	database.Relationships = make([]model.Relationship, 10)
	database.Students = make([]model.Student, 10)
	database.Teachers = make([]model.Teacher, 10)

	http.HandleFunc("/parent/signup", personSignUp)
	// http.HandleFunc("")
	log.Fatal(http.ListenAndServe(port, nil))

}

func checkIfAny(err error) {
	if err != nil {
		panic(err)
	}
}
