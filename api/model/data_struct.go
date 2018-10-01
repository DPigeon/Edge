package model

// Dataset an in-memory version of the database
type Dataset struct {
	Classes       []Class
	Parents       []Parent
	Relationships []Relationship
	Students      []Student
	Teachers      []Teacher
}

// Class represents a school class taught by a Teacher
// This is an association between teachers and students
type Class struct {
	ID         int
	Topic      string
	Instructor Teacher
	Students   []Student
}

// Parent represents a parent
type Parent struct {
	ID            int
	Fname         string
	Lname         string
	Email         string
	Relationships []Relationship
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
	link    Role
	parent  Parent
	student Student
}

// Student represents a student
type Student struct {
	ID            int
	Fname         string
	Lname         string
	Relationships []Relationship
	Classes       []Class
}

// Teacher represents a teacher
type Teacher struct {
	ID      int
	Fname   string
	Lname   string
	Email   string
	Classes []Class
}
