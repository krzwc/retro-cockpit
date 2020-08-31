package metrics

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"
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

// PB_Metrics struct
type PB_Metrics struct {
	gorm.Model

	Pb        string
	Value     int
	Timestamp string
}

// BC_Metrics struct
type BC_Metrics struct {
	gorm.Model

	Core      string
	Freq0     int
	Freq1     int
	Timestamp string
}

var db *gorm.DB //database

// Consume function
func (c *Consumer) Consume() {
	config := sarama.NewConfig()
	config.Version = sarama.V2_4_0_0
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
		msgStr := string(msg.Value)
		fmt.Printf("Metrics consumer consumed a message: %v\n", msgStr)
		isPBMetric := strings.HasPrefix(strings.Fields(msgStr)[0], "pb")
		isBCMetric := strings.HasPrefix(strings.Fields(msgStr)[0], "core")
		if isPBMetric {
			pbVal, err := strconv.Atoi(strings.Fields(msgStr)[1])
			if err != nil {
				log.Fatal(err)
			}
			savePBMetricToDb(strings.Fields(msgStr)[0], pbVal, msgStr[strings.Index(msgStr, "timestamp")+10:])
		}
		if isBCMetric {
			bcAlarmValues := strings.Split(msgStr, ",")
			freq0, err := strconv.Atoi(bcAlarmValues[1][7:])
			if err != nil {
				log.Fatal(err)
			}
			freq1, err := strconv.Atoi(bcAlarmValues[2][7:])
			if err != nil {
				log.Fatal(err)
			}
			timestamp := bcAlarmValues[3] + "," + bcAlarmValues[4]

			saveBCMetricToDb(bcAlarmValues[0], freq0, freq1, timestamp[strings.Index(timestamp, "timestamp")+10:])
		}
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
	db.Debug().AutoMigrate(&PB_Metrics{}) //Database migration
	db.Debug().AutoMigrate(&BC_Metrics{}) //Database migration
	fmt.Println("Successfully connected!")
}

func savePBMetricToDb(pb string, value int, timestamp string) {
	db.Create(&PB_Metrics{Pb: pb, Value: value, Timestamp: timestamp})
}

func saveBCMetricToDb(core string, freq0 int, freq1 int, timestamp string) {
	db.Create(&BC_Metrics{Core: core, Freq0: freq0, Freq1: freq1, Timestamp: timestamp})
}
