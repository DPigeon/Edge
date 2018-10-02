package main

import (
	"SOEN341-Project/api/model"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/goware/emailx"
)

var personSignUp = func(writer http.ResponseWriter, req *http.Request) {

	if req.Method != http.MethodPost {
		// writer.Write([]byte("you dumb"))
		http.Error(writer, "wrong request method", http.StatusNotAcceptable)
		log.Println("wrong request method")
		return
	}
	err := req.ParseForm()
	if err != nil {
		log.Printf("error: %v", err)
		return
	}
	fname := req.Form.Get("firstName")
	lname := req.Form.Get("lastName")
	email := req.Form.Get("email")
	fmt.Printf("firstName: %v\nlastname: %v\n email:%v\n", fname, lname, email)

	newParent := model.Parent{
		Fname: req.Form.Get("firstName"),
		Lname: req.Form.Get("lastName"),
		Email: req.Form.Get("email"),
	}
	if err := validateParent(&newParent); err != nil {
		log.Println(err)
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return

	}
	model.RegisterParent(&newParent, &database)
	result1 := fmt.Sprintf("parent: %v\n", newParent)
	result2 := fmt.Sprintf("database: %v\n", database)
	writer.Write([]byte(result1))
	writer.Write([]byte(result2))

	fmt.Println(result1)
	fmt.Println(result2)

}

func validateParent(parent *model.Parent) error {
	if len(parent.Fname) < 2 || len(parent.Lname) < 2 {
		return errors.New("Wrong name format")
	}
	err := emailx.Validate(parent.Email)

	switch err {
	case emailx.ErrInvalidFormat:
		return errors.New("Invalid email format")
	case emailx.ErrUnresolvableHost:
		return errors.New("Unreachable email host")
	}
	return nil
}
