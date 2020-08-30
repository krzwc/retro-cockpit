package main

import (
	"kafka-metrics/metrics"
)

func main() {
	go metrics.PBProducer()
	metrics.BCProducer()
}
