package main

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB //database

// Alarms struct
type Alarms struct {
	gorm.Model

	Time     string
	Severity string
}

func main() {
	conn, err := gorm.Open("postgres", "host=localhost port=5432 dbname=retro_cockpit user=postgres password=password sslmode=disable")
	if err != nil {
		fmt.Print(err)
	}
	defer conn.Close()
	db = conn
	db.Debug().AutoMigrate(&Alarms{}) //Database migration
	fmt.Println("Successfully connected!")

	var alarms Alarms
	db.Raw("SELECT time, severity FROM alarms WHERE id = ?", 0).Scan(&alarms)
	fmt.Print(alarms)
}
