package alarms

import (
	"math/rand"
)

func randomSeverity() string {
	if v := rand.Intn(11); v > 7 {
		return "Info critical"
	}

	return ""
}
