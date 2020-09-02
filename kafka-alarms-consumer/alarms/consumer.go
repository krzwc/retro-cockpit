package alarms

import (
	"context"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/Shopify/sarama"
	"github.com/jinzhu/gorm"

	// blank import
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Consumer type
type Consumer struct {
}

// Alarms struct
type Alarms struct {
	gorm.Model

	Time     string
	Severity string
	Resolved bool
}

var db *gorm.DB //database

// Consume function
func (c *Consumer) Consume() {
	config := sarama.NewConfig()
	config.Version = sarama.V2_4_0_0
	fmt.Print(KafkaServer)
	group, err := sarama.NewConsumerGroup([]string{KafkaServer}, "my-group", config)
	if err != nil {
		panic(err)
	}

	go func() {
		for err := range group.Errors() {
			panic(err)
		}
	}()

	func() {
		ctx := context.Background()
		for {
			topics := []string{KafkaTopic}
			err := group.Consume(ctx, topics, c)
			if err != nil {
				fmt.Printf("kafka consume failed: %v, sleeping and retry in a moment\n", err)
				time.Sleep(time.Second)
			}
		}
	}()
}

// Setup function
func (c *Consumer) Setup(_ sarama.ConsumerGroupSession) error {
	return nil
}

// Cleanup function
func (c *Consumer) Cleanup(_ sarama.ConsumerGroupSession) error {
	return nil
}

// ConsumeClaim function
func (c *Consumer) ConsumeClaim(sess sarama.ConsumerGroupSession, claim sarama.ConsumerGroupClaim) error {
	openDb()
	for msg := range claim.Messages() {
		fmt.Printf("Alarms consumer consumed a message: %v\n", string(msg.Value))
		var severity string
		if strings.Contains(string(msg.Value), "Info") {
			severity = string(msg.Value)[43:]
		} else {
			severity = ""
		}

		saveToDb(string(msg.Value)[6:37], severity)
		sess.MarkMessage(msg, "")
	}
	defer db.Close()

	return nil
}

func openDb() {
	HOST := os.Getenv("HOST")
	PORT := os.Getenv("PORT")
	DB_NAME := os.Getenv("DB_NAME")
	USER := os.Getenv("USER")
	PASSWORD := os.Getenv("PASSWORD")

	conn, err := gorm.Open("postgres", "host="+HOST+" port="+PORT+" dbname="+DB_NAME+" user="+USER+" password="+PASSWORD+" sslmode=disable")
	if err != nil {
		fmt.Print(err)
	}
	db = conn
	db.Debug().AutoMigrate(&Alarms{}) //Database migration
	fmt.Println("Successfully connected!")
}

func saveToDb(time string, severity string) {
	db.Create(&Alarms{Time: time, Severity: severity, Resolved: false})
}
