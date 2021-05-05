package alarms

import "os"

// KafkaServer constant
// const KafkaServer = "localhost:9092"
var KafkaServer = os.Getenv("KAFKA_CONNECTION_STRING")

// KafkaTopic constant
const KafkaTopic = "Alarms"

//timeout in seconds
const timeout = 50
