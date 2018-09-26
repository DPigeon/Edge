package main

import (
	"SOEN341-Project/api/platform"
	"context"
	"fmt"
)

type customServer struct{}

func (srv *customServer) AddClass(context.Context, *platform.Class) (
	*platform.Status, error) {
	fmt.Println("Teacher requested to add class")
	return nil, nil
}
func (srv *customServer) AddStudents(context.Context, *platform.Student) (
	*platform.Status, error) {
	return nil, nil

}
func (srv *customServer) RegisterParent(context.Context, *platform.Parent) (
	*platform.Status, error) {
	return nil, nil

}
func (srv *customServer) RegisterTeacher(context.Context, *platform.Teacher) (
	*platform.Status, error) {
	return nil, nil

}
