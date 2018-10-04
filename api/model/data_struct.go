package model

import (
	"errors"
	"math/rand"
	"time"
)

// will be used to generate unique int IDs
var iDGenerator = rand.New(rand.NewSource(time.Now().UnixNano()))

// Dataset represents an in-memory version of the database
type Dataset struct {
	Classes       []*Class
	Parents       []*Parent
	Relationships []*Relationship
	Students      []*Student
	Teachers      []*Teacher
}

// Class represents a school class taught by a Teacher
// This is an association between teachers and students
type Class struct {
	ID         int
	Topic      string
	Instructor *Teacher
	Students   []*Student
}

// Account represents and account which can sign up (parent/teacher)

// Parent represents a parent
type Parent struct {
	ID            int
	Fname         string
	Lname         string
	Email         string
	Password      string
	Relationships []*Relationship
}

// Role type is used to create an enum representing the role that a parent
// plays over a student
type Role string

const (
	mother        Role = "mom"
	father        Role = "dad"
	legalGuardian Role = "guard"
)

// Relationship represents an association between a Parent and a Student
type Relationship struct {
	link    *Role
	parent  *Parent
	student *Student
}

// Student represents a student
type Student struct {
	ID            int
	Fname         string
	Lname         string
	Relationships []*Relationship
	Classes       []*Class
}

// Teacher represents a teacher
type Teacher struct {
	ID       int
	Fname    string
	Lname    string
	Email    string
	Password string
	Classes  []*Class
}

// FindParent returns a parent object upon matching an email string with
// one in the database
func FindParent(email string, db *Dataset) (Parent, error) {
	for _, parent := range db.Parents {
		return *parent, nil
	}
	return Parent{}, errors.New("This email is not associated with an account")
}

// RegisterParent appends to the passed dataset
func RegisterParent(newParent *Parent, db *Dataset) error {
	for _, prt := range db.Parents {
		if newParent.Email == prt.Email {
			return errors.New("Email is already used by another Account")
		}
	}
	newParent.ID = generateID()
	db.Parents = append(db.Parents, newParent)
	return nil
}

// RegisterTeacher appends to the passed dataset
func RegisterTeacher(newTeacher *Teacher, db *Dataset) error {
	for _, tch := range db.Teachers {
		if newTeacher.Email == tch.Email {
			return errors.New("Email is already used by another Account")
		}
	}
	newTeacher.ID = generateID()
	db.Teachers = append(db.Teachers, newTeacher)
	return nil
}

func generateID() int {
	return iDGenerator.Int()
}
