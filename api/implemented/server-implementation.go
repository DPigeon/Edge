package implemented

import (
	"SOEN341-Project/api/platform"
	"context"
	"errors"
	"fmt"
)

// Server Implements the interface platformServer
type Server struct{}

// AddClass ...
func (srv *Server) AddClass(ctx context.Context, class *platform.Class) (
	*platform.Status, error) {
	fmt.Println("Teacher requested to add class")
	return &platform.Status{Success: true, Message: "bruh"}, nil
}

// AddStudents ...
func (srv *Server) AddStudents(ctx context.Context, student *platform.Student) (
	*platform.Status, error) {
	return nil, nil

}

// RegisterParent ...
func (srv *Server) RegisterParent(ctx context.Context, parent *platform.Parent) (
	*platform.Status, error) {
	return nil, nil

}

// RegisterTeacher ...
func (srv *Server) RegisterTeacher(ctx context.Context, teacher *platform.Teacher) (
	*platform.Status, error) {

	//check for correct name formats
	if len(teacher.FirstName) < 2 || len(teacher.LastName) < 2 {
		status := &platform.Status{Success: false, Message: "Incorrect name format"}
		return status, errors.New(status.Message)
	}

	return nil, nil

}

func validateName(first, last string) *platform.Status {
	status := platform.Status{Success: true}
	if len(first) < 2 || len(last) < 2 {
		status.Success = false
		status.Message = "Incorrect name formant"
	}
	return &status
}

func validateEmail(email string) *platform.Status {
	status := platform.Status{Success: true}
	//i := strings.Index(email, "@")
	//host := email[i+1:]

	return &status
}
