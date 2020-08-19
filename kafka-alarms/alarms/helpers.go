package alarms

import (
	"math/rand"
)

func randomCritical() string {
	if v := rand.Intn(11); v > 7 {
		return "CRITICAL"
	}

	return ""
}
