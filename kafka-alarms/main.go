package main

import (
	"kafka-alarms/alarms"
)

func main() {
	go alarms.Producer()

	alarmsConsumer := alarms.Consumer{}
	alarmsConsumer.Consume()
}
