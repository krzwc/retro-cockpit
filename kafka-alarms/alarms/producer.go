package alarms

import (
	"fmt"
	"time"

	"github.com/Shopify/sarama"
)

// Producer creates a kafka producer
func Producer() {
	fmt.Print(KafkaServer)
	syncProducer, err := sarama.NewSyncProducer([]string{KafkaServer}, nil)
	if err != nil {
		panic(err)
	}

	for {
		severity := randomSeverity()
		var severityMsg string
		if severity != "" {
			severityMsg = " Info " + severityMsg
		} else {
			severityMsg = ""
		}

		msg := &sarama.ProducerMessage{
			Topic: KafkaTopic,
			Value: sarama.ByteEncoder("Alarm " + time.Now().Format(time.RFC1123Z) + severityMsg),
		}

		_, _, err = syncProducer.SendMessage(msg)
		if err != nil {
			panic(err)
		}

		time.Sleep(3 * time.Second)
	}
}
