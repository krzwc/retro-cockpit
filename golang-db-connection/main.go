package main

import (
	"fmt"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB //database

// Alarms struct
type Alarms struct {
	gorm.Model

	Time     string
	Severity string
	Resolved bool
}

func main() {
	HOST := os.Getenv("HOST")
	PORT := os.Getenv("PORT")
	DB_NAME := os.Getenv("DB_NAME")
	USER := os.Getenv("USER")
	PASSWORD := os.Getenv("PASSWORD")

	conn, err := gorm.Open("postgres", "host="+HOST+" port="+PORT+" dbname="+DB_NAME+" user="+USER+" password="+PASSWORD+" sslmode=disable")
	if err != nil {
		fmt.Print(err)
	}
	defer conn.Close()
	db = conn
	db.Debug().AutoMigrate(&Alarms{}) //Database migration
	fmt.Println("Successfully connected!")

	var alarms Alarms
	/* db.Create(&Alarms{Time: time.Now().Format(time.RFC1123Z), Severity: "critical"}) */
	db.Find(&alarms)
	fmt.Print(alarms)
}
