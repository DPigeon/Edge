package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

const (
	dbConnPrefix    = "postgresql://"
	dbURL           = "localhost:26257"
	dbSecurityParam = "?sslmode=disable"

	dbUser     = "soen341"
	dbPassword = "secret"
	dbName     = "platform"
	dbAddress  = "localhost:8081"
)

func initDB() {
	connStr := fmt.Sprintf("%vroot@%v/%v", dbConnPrefix, dbURL, dbSecurityParam)
	db, err := sql.Open("postgres", connStr)
	checkIfAny(err)

	_, err = db.Exec(fmt.Sprintf("CREATE DATABASE IF NOT EXISTS %v", dbName))
	checkIfAny(err)

	_, err = db.Exec(fmt.Sprintf("CREATE USER IF NOT EXISTS %v", dbUser))
	checkIfAny(err)

	_, err = db.Exec(fmt.Sprintf("GRANT ALL ON DATABASE %v TO %v", dbName, dbUser))
	checkIfAny(err)

	log.Printf("Database \"%v\" initialised and user \"%v\" granted all priviledges on it", dbName, dbUser)

	checkIfAny(db.Close())

	userConnStr := fmt.Sprintf("%v%v@%v/%v", dbConnPrefix, dbUser, dbURL, dbSecurityParam)
	db, err = sql.Open("postgres", userConnStr)
	checkIfAny(err)

	_, err = db.Exec("SET DATABASE = %v", dbName)
	checkIfAny(err)

	// // createClassesTable := fmt.Sprintf("CREATE TABLE IF NOT EXISTS classes" +
	// "id SERIAL PRIMARY KEY" +
	// "topic STRING" +
	// "")
}

func checkIfAny(err error) {
	if err != nil {
		panic(err)
	}
}
