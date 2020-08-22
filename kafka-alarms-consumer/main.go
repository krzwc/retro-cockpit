package main

import (
	"kafka-alarms-consumer/alarms"
)

func main() {
	alarmsConsumer := alarms.Consumer{}
	alarmsConsumer.Consume()
}
