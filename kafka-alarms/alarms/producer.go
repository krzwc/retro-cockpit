package alarms

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
			Value: sarama.ByteEncoder("Alarm " + time.Now().Format(time.RFC1123Z) + " " + randomSeverity()),
		}

		_, _, err = syncProducer.SendMessage(msg)
		if err != nil {
			panic(err)
		}

		time.Sleep(timeout * time.Second)
	}
}
