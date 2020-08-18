package players

import (
	"math/rand"
	"strconv"
)

func randomInRange(max int) int {
	return rand.Intn(max)
}

func randomMetricName(metricCount int) string {
	return "pb" + strconv.Itoa(randomInRange(metricCount))
}
