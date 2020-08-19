package main

import (
	"kafka-metrics/metrics"
)

func main() {
	go metrics.PBProducer()
	go metrics.BCProducer()

	metricsConsumer := metrics.Consumer{}
	metricsConsumer.Consume()
}
