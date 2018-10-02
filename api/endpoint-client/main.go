package main

import (
	"encoding/json"
	"fmt"
)

const address = "localhost:9090"

type person struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

func main() {
	b := person{Name: "ribal", Age: 21}
	serialised, _ := json.Marshal(&b)
	fmt.Println(string(serialised))
	// any := `{ "name": "ribal","age": 21}`

	// client := http.Client{}

}
