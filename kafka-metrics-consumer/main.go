package main

import (
	"kafka-metrics-consumer/metrics"
)

func main() {
	metricsConsumer := metrics.Consumer{}
	metricsConsumer.Consume()
}
