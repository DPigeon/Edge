package main

import (
	"fmt"
	"math/rand"
	"testing"
	"time"
)

func TestRandomNumberGeneration(t *testing.T) {
	var set []int
	set = make([]int, 0)
	for i := 0; i < 100; i++ {
		randomNum := rand.New(rand.NewSource(time.Now().UnixNano()))
		for index, value := range set {
			if randomNum.Int() == value {
				fmt.Println(index)
				fmt.Println(randomNum.Int(), "==", value)
				fmt.Println(randomNum.Int())
				t.Fail()
			}
		}
		// fmt.Println(randomNum.Int())
		set = append(set, randomNum.Int())
	}
}

func TestSeed(t *testing.T) {
	var set []int
	set = make([]int, 0)
	randomNum := rand.New(rand.NewSource(time.Now().UnixNano()))
	for i := 0; i < 10000000000; i++ {
		rn := randomNum.Int()
		for index, value := range set {
			if rn == value {
				fmt.Println(index)
				t.Fail()
			}
			set = append(set, rn)
		}
	}
}
