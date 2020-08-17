package players

import (
	"time"

	"github.com/Shopify/sarama"
)

// Producer creates a kafka producer
func Producer() {
	syncProducer, err := sarama.NewSyncProducer([]string{KafkaServer}, nil)
	if err != nil {
		panic(err)
	}

	for {
		msg := &sarama.ProducerMessage{
			Topic: KafkaTopic,
			Value: sarama.ByteEncoder("Hello World " + time.Now().Format(time.RFC3339)),
		}

		_, _, err = syncProducer.SendMessage(msg)
		if err != nil {
			panic(err)
		}

		time.Sleep(time.Second)
	}
}
