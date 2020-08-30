package metrics

import "os"

// KafkaServer constant
// const KafkaServer = "localhost:9092"
var KafkaServer = os.Getenv("KAFKA_CONNECTION_STRING")

// KafkaTopic constant
const KafkaTopic = "Metrics"
