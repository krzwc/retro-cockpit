package main

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB //database

func main() {
	conn, err := gorm.Open("postgres", "host=172.27.0.2 port=5432 user=postgres dbname=postgres password=password")
	if err != nil {
		fmt.Print(err)
	}
	defer conn.Close()
	db = conn
	db.Debug().AutoMigrate(&Account{}, &Contact{}) //Database migration
	fmt.Println("Successfully connected!")
}
