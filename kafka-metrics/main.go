package main

import (
	"kafka-metrics/metrics"
)

func main() {
	go metrics.PBProducer()
	metrics.BCProducer()

	// metricsConsumer := metrics.Consumer{}
	// metricsConsumer.Consume()
}
