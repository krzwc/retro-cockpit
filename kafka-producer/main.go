package main

import "kafka-producer/players"

func main() {
	go players.Producer()

	consumer := players.Consumer{}
	consumer.Consume()
}
