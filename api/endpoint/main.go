package main

import (
	"SOEN341-Project/api/model"
	"log"
	"net/http"
)

// Status Represents a REST json status response
type Status struct {
	Success string `json:"success,ommitempty"`
	Message string `json:"message,omitempty"`
}

var database model.Dataset

const (
	port = ":80"
)

func main() {
	database.Classes = make([]*model.Class, 0)
	database.Parents = make([]*model.Parent, 0)
	database.Relationships = make([]*model.Relationship, 0)
	database.Students = make([]*model.Student, 0)
	database.Teachers = make([]*model.Teacher, 0)

	http.HandleFunc("/", fileServerHandler)

	http.HandleFunc("/signup/parent", parentSignUp)
	http.HandleFunc("/signup/teacher", teacherSignUp)
	http.HandleFunc("/login/parent", parentLogin)
	http.HandleFunc("/login/teacher", teacherLogin)

	// http.HandleFunc("")
	log.Fatal(http.ListenAndServe(port, nil))

}

func checkIfAny(err error) {
	if err != nil {
		panic(err)
	}
}

var fileServerHandler = func(writer http.ResponseWriter, req *http.Request) {
	http.ServeFile(writer, req, "web/src/view"+req.URL.Path)
}
