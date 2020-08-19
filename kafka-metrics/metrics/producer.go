package metrics

import (
	"strconv"
	"time"

	"github.com/Shopify/sarama"
)

// PBProducer creates a kafka producer
func PBProducer() {
	syncProducer, err := sarama.NewSyncProducer([]string{KafkaServer}, nil)
	if err != nil {
		panic(err)
	}

	for {
		msg := &sarama.ProducerMessage{
			Topic: KafkaTopic,
			// Value: sarama.ByteEncoder("Hello World " + time.Now().Format(time.RFC3339)),
			Value: sarama.ByteEncoder(randomMetricName("pb", PBMetricsCount) + " " + strconv.Itoa(randomInRange(100))),
		}

		_, _, err = syncProducer.SendMessage(msg)
		if err != nil {
			panic(err)
		}

		time.Sleep(10 * time.Second)
	}
}

// BCProducer creates a kafka producer
func BCProducer() {
	syncProducer, err := sarama.NewSyncProducer([]string{KafkaServer}, nil)
	if err != nil {
		panic(err)
	}

	for {
		msg := &sarama.ProducerMessage{
			Topic: KafkaTopic,
			// Value: sarama.ByteEncoder("Hello World " + time.Now().Format(time.RFC3339)),
			Value: sarama.ByteEncoder(randomMetricName("core", BCMetricsCount) + ", freq0 " + strconv.Itoa(randomInRange(100)) + ", freq1 " + strconv.Itoa(randomInRange(100))),
		}

		_, _, err = syncProducer.SendMessage(msg)
		if err != nil {
			panic(err)
		}

		time.Sleep(7 * time.Second)
	}
}
