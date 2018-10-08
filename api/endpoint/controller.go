package main

import (
	"SOEN341-Project/api/model"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/goware/emailx"
)

// handler for signup/parent
var parentSignUp = func(writer http.ResponseWriter, req *http.Request) {

	if req.Method != http.MethodPost {
		errMsg := fmt.Sprintf("%v: wrong request method", http.StatusText(http.StatusNotAcceptable))
		http.Error(writer, errMsg, http.StatusNotAcceptable)
		log.Println(errMsg)
		return
	}
	log.Printf("******************\nRequest for parent sign up\n")
	fmt.Println(req.Body)

	err := req.ParseForm()

	if err != nil {
		errMsg := fmt.Sprintf("%v: %v", http.StatusText(http.StatusExpectationFailed), err)
		http.Error(writer, errMsg, http.StatusExpectationFailed)
		log.Println(errMsg)
		return
	}
	fname := req.Form.Get("first_name")
	lname := req.Form.Get("last_name")
	email := req.Form.Get("email")
	password := req.Form.Get("password")
	log.Printf("firstName: %v\nlastName: %v\nemail: %v\n", fname, lname, email)

	newParent := model.Parent{
		Fname:    strings.ToLower(fname),
		Lname:    strings.ToLower(lname),
		Email:    strings.ToLower(email),
		Password: password,
	}
	err = validateParent(&newParent)

	if err != nil {
		errMsg := fmt.Sprintf("%v: %v", http.StatusText(http.StatusPreconditionFailed), err.Error())
		http.Error(writer, errMsg, http.StatusPreconditionFailed)
		log.Println(errMsg)
		return
	}

	err = model.RegisterParent(&newParent, &database)
	log.Printf("parent: %v\n", newParent)
	log.Printf("database: %v\n", database)

	if err != nil {
		errMsg := fmt.Sprintf("%v: %v", http.StatusText(http.StatusPreconditionFailed), err.Error())
		http.Error(writer, errMsg, http.StatusPreconditionFailed)
		log.Println(errMsg)
		return
	}

	code, err := writer.Write([]byte("Success\n"))
	if err != nil {
		log.Printf("code: %v, err: %v\n", code, err)
	}
	log.Printf("Success\n")
	return
}

// handler for /signup/teacher
var teacherSignUp = func(writer http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodPost {
		http.Error(writer, "wrong request method", http.StatusNotAcceptable)
		log.Println("wrong request method")
		return
	}
	log.Printf("***\nRequest for teacher sign up\n")
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
	log.Printf("firstName: %v\nlastName: %v\nemail: %v\npassword: %v", newTeacher.Fname, newTeacher.Lname, newTeacher.Email, newTeacher.Password)

	err = validateTeacher(&newTeacher)
	if err != nil {
		log.Println(err)
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	err = model.RegisterTeacher(&newTeacher, &database)
	log.Printf("teacher: %v\n", newTeacher)
	log.Printf("database: %v\n", database)

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

// handler for /login/parent
var parentLogin = func(writer http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodPost {
		http.Error(writer, "wrong request method", http.StatusNotAcceptable)
		log.Println("wrong request method")
		return
	}
	log.Println("******************\nA parent has requested to log in")

	err := req.ParseForm()
	if err != nil {
		http.Error(writer, err.Error(), http.StatusExpectationFailed)
		log.Printf("error: %v", err)
		return
	}

	email := strings.ToLower(req.Form.Get("email"))
	password := req.Form.Get("password")

	foundParent, err := model.FindParent(email, &database)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusPreconditionFailed)
		log.Printf("error: %v", err)
		return
	}
	if password == foundParent.Password {
		expiration := time.Now().Add(time.Hour * 24 * 7)
		http.SetCookie(writer, &http.Cookie{
			Name:     "email",
			Value:    foundParent.Email,
			Expires:  expiration,
			Unparsed: []string{"active"},
		})
		log.Println("Parent is logged in")
		return
	}
	log.Println("Unsuccessful parent login attempt")
	return
}

//handler for /login/teacher
var teacherLogin = func(writer http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodPost {
		http.Error(writer, "wrong request method", http.StatusNotAcceptable)
		log.Println("wrong request method")
		return
	}
	log.Println("******************\nA teacher has requested to log in")

	err := req.ParseForm()
	if err != nil {
		http.Error(writer, err.Error(), http.StatusExpectationFailed)
		log.Printf("error: %v", err)
		return
	}

	email := strings.ToLower(req.Form.Get("email"))
	password := req.Form.Get("password")

	foundTeacher, err := model.FindTeacher(email, &database)

	if err != nil {
		http.Error(writer, err.Error(), http.StatusPreconditionFailed)
		log.Printf("error: %v", err)
		return
	}

	if password == foundTeacher.Password {
		expiration := time.Now().Add(time.Hour * 24 * 7)
		http.SetCookie(writer, &http.Cookie{
			Name:     "email",
			Value:    foundTeacher.Email,
			Expires:  expiration,
			Unparsed: []string{"active"},
		})
		log.Println("Teacher is logged in")
		return
	}
	log.Println("Unsuccessful teacher login attempt")
}

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

	if len(newParent.Password) < 6 {
		return errors.New("Password should be at least 6 characters")
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

	if len(newTeacher.Password) < 6 {
		return errors.New("Password should at least 6 characters")
	}
	return nil
}
