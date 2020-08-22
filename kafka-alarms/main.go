package main

import (
	"kafka-alarms/alarms"
)

func main() {
	alarms.Producer()

	// alarmsConsumer := alarms.Consumer{}
	// alarmsConsumer.Consume()
}
