package main

import (
	"SOEN341-Project/api/model"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/goware/emailx"
)

var parentSignUp = func(writer http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodPost {
		http.Error(writer, "wrong request method", http.StatusNotAcceptable)
		log.Println("wrong request method")
		return
	}
	fmt.Printf("***\nRequest for parent sign up\n")

	err := req.ParseForm()
	if err != nil {
		http.Error(writer, err.Error(), http.StatusExpectationFailed)
		log.Printf("error: %v", err)
		return
	}
	fname := req.Form.Get("firstName")
	lname := req.Form.Get("lastName")
	email := req.Form.Get("email")
	password := req.Form.Get("password")
	fmt.Printf("firstName: %v\nlastName: %v\nemail: %v\n", fname, lname, email)

	newParent := model.Parent{
		Fname:    strings.ToLower(fname),
		Lname:    strings.ToLower(lname),
		Email:    strings.ToLower(email),
		Password: password,
	}
	err = validateParent(&newParent)
	if err != nil {
		log.Println(err)
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	err = model.RegisterParent(&newParent, &database)
	fmt.Printf("parent: %v\n", newParent)
	fmt.Printf("database: %v\n", database)

	if err != nil {
		http.Error(writer, err.Error(), http.StatusPreconditionFailed)
		log.Printf("error: %v", err)
		return
	}

	code, err := writer.Write([]byte("Success\n"))
	if err != nil {
		log.Printf("code: %v, err: %v\n", code, err)
	}
	log.Printf("Success\n")
	return
}

var teacherSignUp = func(writer http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodPost {
		http.Error(writer, "wrong request method", http.StatusNotAcceptable)
		log.Println("wrong request method")
		return
	}
	fmt.Printf("***\nRequest for teacher sign up\n")
	err := req.ParseForm()
	if err != nil {
		http.Error(writer, err.Error(), http.StatusExpectationFailed)
		log.Printf("error: %v", err)
		return
	}
	newTeacher := model.Teacher{
		Fname:    strings.ToLower(req.Form.Get("firstName")),
		Lname:    strings.ToLower(req.Form.Get("lastName")),
		Email:    strings.ToLower(req.Form.Get("email")),
		Password: req.Form.Get("password"),
	}
	fmt.Printf("firstName: %v\nlastName: %v\nemail: %v\n", newTeacher.Fname, newTeacher.Lname, newTeacher.Email)

	err = validateTeacher(&newTeacher)
	if err != nil {
		log.Println(err)
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	err = model.RegisterTeacher(&newTeacher, &database)
	fmt.Printf("teacher: %v\n", newTeacher)
	fmt.Printf("database: %v\n", database)

	if err != nil {
		http.Error(writer, err.Error(), http.StatusExpectationFailed)
		log.Printf("error: %v", err)
		return
	}
	code, err := writer.Write([]byte("Success\n"))
	if err != nil {
		log.Printf("code: %v, err: %v\n", code, err)
		return
	}
	log.Printf("Success\n")
	return
}

// var parentLogin = func(writer http.ResponseWriter, req *http.Request) {
// if req.Method != http.MethodPost {
// http.Error(writer, "wrong request method", http.StatusNotAcceptable)
// log.Println("wrong request method")
// return
// }
//
// err := req.ParseForm()
// if err != nil {
// http.Error(writer, err.Error(), http.StatusExpectationFailed)
// log.Printf("error: %v", err)
// return
// }
//
// // **************** TODO ***************************//
// //finish the processs for parent login
// //return a cookie to track the session
// // ***********************************************  //
//
// }

func validateParent(newParent *model.Parent) error {
	if len(newParent.Fname) < 2 || len(newParent.Lname) < 2 {
		return errors.New("Wrong name format")
	}
	err := emailx.Validate(newParent.Email)

	switch err {
	case emailx.ErrInvalidFormat:
		return errors.New("Invalid email format")
	case emailx.ErrUnresolvableHost:
		return errors.New("Unreachable email host")
	}
	return nil
}

func validateTeacher(newTeacher *model.Teacher) error {
	if len(newTeacher.Fname) < 2 || len(newTeacher.Lname) < 2 {
		return errors.New("Wrong name format")
	}
	err := emailx.Validate(newTeacher.Email)

	switch err {
	case emailx.ErrInvalidFormat:
		return errors.New("Invalid email format")
	case emailx.ErrUnresolvableHost:
		return errors.New("Unreachable email host")
	}
	return nil
}
