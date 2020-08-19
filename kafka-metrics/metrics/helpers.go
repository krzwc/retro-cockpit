package metrics

import (
	"math/rand"
	"strconv"
)

func randomInRange(max int) int {
	return rand.Intn(max)
}

func randomMetricName(group string, metricCount int) string {
	return group + strconv.Itoa(randomInRange(metricCount))
}
