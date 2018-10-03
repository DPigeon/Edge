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
	database.Classes = make([]*model.Class, 0)
	database.Parents = make([]*model.Parent, 0)
	database.Relationships = make([]*model.Relationship, 0)
	database.Students = make([]*model.Student, 0)
	database.Teachers = make([]*model.Teacher, 0)

	http.HandleFunc("/signup/parent", parentSignUp)
	http.HandleFunc("/signup/teacher", teacherSignUp)
	// http.HandleFunc("")
	log.Fatal(http.ListenAndServe(port, nil))

}

func checkIfAny(err error) {
	if err != nil {
		panic(err)
	}
}
