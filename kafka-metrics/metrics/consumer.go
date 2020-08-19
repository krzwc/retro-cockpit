package metrics

import (
	"context"
	"fmt"
	"time"

	"github.com/Shopify/sarama"
)

// Consumer type
type Consumer struct {
}

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
	for msg := range claim.Messages() {
		fmt.Printf("Metrics consumer consumed a message: %v\n", string(msg.Value))
		sess.MarkMessage(msg, "")
	}
	return nil
}
