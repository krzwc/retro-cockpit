// https://github.com/scotch-io/go-realtime-chat/blob/master/src/main.go

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gorilla/websocket"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/jinzhu/now"
)

var db *gorm.DB //database

// Alarm struct
// type Alarm struct {
// 	Time     string `json:"time"`
// 	Severity string `json:"severity"`
// 	Resolved bool   `json:"resolved"`
// }

// PB_Metric struct
// type PB_Metric struct {
// 	Pb        string `json:"pb"`
// 	Value     int    `json:"value"`
// 	Timestamp string `json:"timestamp"`
// }

// BC_Metric struct
// type BC_Metric struct {
// 	Core      string `json:"core"`
// 	Freq0     int    `json:"freq0"`
// 	Freq1     int    `json:"freq1"`
// 	Timestamp string `json:"timestamp"`
// }

// AlarmModel struct
type Alarms struct {
	gorm.Model

	Time     string
	Severity string
	Resolved bool
}

// AlarmMsg struct
type AlarmMsg struct {
	Time     string `json:"time"`
	Severity string `json:"severity"`
	Resolved bool   `json:"resolved"`
}

// PB_Metrics struct
type PB_Metrics struct {
	gorm.Model

	Pb        string
	Value     int
	Timestamp string
}

// PB_MetricMsg struct
type PB_MetricMsg struct {
	Pb        string `json:"pb"`
	Value     int    `json:"value"`
	Timestamp string `json:"timestamp"`
}

// BC_Metrics struct
type BC_Metrics struct {
	gorm.Model

	Core      string
	Freq0     int
	Freq1     int
	Timestamp string
}

// BC_MetricMsg struct
type BC_MetricMsg struct {
	Core      string `json:"core"`
	Freq0     int    `json:"freq0"`
	Freq1     int    `json:"freq1"`
	Timestamp string `json:"timestamp"`
}

type ChatMessage struct {
	Name string `json:"name"`
	Text string `json:"text"`
}

type ResolveAlarm struct {
	Time string
	Type string
}

var clients = make(map[*websocket.Conn]bool) // connected clients
// var broadcast = make(chan Message)           // broadcast channel

// Configure the upgrader
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func randomSeverity() string {
	if v := rand.Intn(11); v > 7 {
		return "critical"
	}

	return ""
}

func getTime() string {
	return time.Now().Format(time.RFC1123Z)
}

func randomInRange(max int) int {
	return rand.Intn(max)
}

func randomMetricName(group string, metricCount int) string {
	return group + strconv.Itoa(randomInRange(metricCount))
}

func openDb() {
	HOST := os.Getenv("HOST")
	PORT := os.Getenv("PORT")
	DB_NAME := os.Getenv("DB_NAME")
	USER := os.Getenv("USER")
	PASSWORD := os.Getenv("PASSWORD")

	conn, err := gorm.Open("postgres", "host="+HOST+" port="+PORT+" dbname="+DB_NAME+" user="+USER+" password="+PASSWORD+" sslmode=disable")
	if err != nil {
		fmt.Print(err)
	}
	db = conn
	db.Debug().AutoMigrate(&Alarms{}, &PB_Metrics{}, &BC_Metrics{}) //Database migration
	fmt.Println("Successfully connected!")
}

func main() {
	// Open db
	openDb()
	// Configure websocket routes
	http.HandleFunc("/alarms", handleAlarms)
	http.HandleFunc("/pbmetrics", handlePBMetrics)
	http.HandleFunc("/bcmetrics", handleBCMetrics)
	http.HandleFunc("/chat", handleChat)

	defer db.Close()

	// Start listening for incoming chat messages
	/* go handleMessages() */

	// Start the server on localhost port 8000 and log any errors
	log.Println("http server started on :8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func handleResolveAlarm(ws *websocket.Conn) {
	resolveAlarm := ResolveAlarm{}
	err := ws.ReadJSON(&resolveAlarm)
	if err != nil {
		log.Println(err)
		return
	}
	switch alarmType := resolveAlarm.Type; alarmType {
	case "RESOLVE_ALARM":
		fmt.Println("RESOLVE_ALARM")
	case "RESOLVE_ALARMS":
		fmt.Println("RESOLVE_ALARMS")
	default:
		fmt.Println("Unknown message type")
	}
}

func handleAlarms(w http.ResponseWriter, r *http.Request) {
	// Upgrade initial GET request to a websocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	// Make sure we close the connection when the function returns
	defer ws.Close()

	// Register our new client
	clients[ws] = true

	var alarms []Alarms
	lastTimestamp := now.BeginningOfMinute()
	for {
		go handleResolveAlarm(ws)
		db.Where("updated_at > ?", lastTimestamp).Find(&alarms)
		for _, alarm := range alarms {
			err = ws.WriteJSON(AlarmMsg{alarm.Time, alarm.Severity, alarm.Resolved})
			if err != nil {
				log.Printf("Websocket error: %s", err)
				ws.Close()
			}
		}
		lastTimestamp, err = now.Parse(alarms[len(alarms)-1].Time)
		if err != nil {
			lastTimestamp = now.BeginningOfMinute()
		}

		time.Sleep(10 * time.Second)
	}
}

func handlePBMetrics(w http.ResponseWriter, r *http.Request) {
	// Upgrade initial GET request to a websocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	// Make sure we close the connection when the function returns
	defer ws.Close()

	// Register our new client
	clients[ws] = true

	var pbMetrics []PB_Metrics
	lastTimestamp := now.BeginningOfMinute()
	for {
		db.Where("updated_at > ?", lastTimestamp).Find(&pbMetrics)
		for _, pbMetric := range pbMetrics {
			err = ws.WriteJSON(PB_MetricMsg{pbMetric.Pb, pbMetric.Value, pbMetric.Timestamp})
			if err != nil {
				log.Printf("Websocket error: %s", err)
				ws.Close()
			}
		}
		lastTimestamp, err = now.Parse(pbMetrics[len(pbMetrics)-1].Timestamp)
		if err != nil {
			lastTimestamp = now.BeginningOfMinute()
		}

		time.Sleep(15 * time.Second)
	}
}

func handleBCMetrics(w http.ResponseWriter, r *http.Request) {
	// Upgrade initial GET request to a websocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	// Make sure we close the connection when the function returns
	defer ws.Close()

	// Register our new client
	clients[ws] = true

	var bcMetrics []BC_Metrics
	lastTimestamp := now.BeginningOfMinute()
	for {
		db.Where("updated_at > ?", lastTimestamp).Find(&bcMetrics)
		for _, bcMetric := range bcMetrics {
			err = ws.WriteJSON(BC_MetricMsg{bcMetric.Core, bcMetric.Freq0, bcMetric.Freq1, bcMetric.Timestamp})
			if err != nil {
				log.Printf("Websocket error: %s", err)
				ws.Close()
			}
		}
		lastTimestamp, err = now.Parse(bcMetrics[len(bcMetrics)-1].Timestamp)
		if err != nil {
			lastTimestamp = now.BeginningOfMinute()
		}

		time.Sleep(10 * time.Second)
	}
}

func handleChat(w http.ResponseWriter, r *http.Request) {
	// Upgrade initial GET request to a websocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	// Make sure we close the connection when the function returns
	defer ws.Close()

	// Register our new client
	clients[ws] = true
	for {
		_, message, err := ws.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		// Send it out to every client that is currently connected
		for client := range clients {
			err = client.WriteMessage(websocket.TextMessage, message)
			if err != nil {
				log.Printf("Websocket error: %s", err)
				ws.Close()
			}
			confirmation := &ChatMessage{Name: "BOT", Text: "Affirmative"}
			confirmationMsg, err := json.Marshal(confirmation)
			if err != nil {
				fmt.Println(err)
				return
			}
			err = client.WriteMessage(websocket.TextMessage, []byte(confirmationMsg))
			if err != nil {
				log.Printf("Websocket error: %s", err)
				ws.Close()
			}
		}
	}
}

/* func handleMessages() {
	for {
		// Grab the next message from the broadcast channel
		msg := <-broadcast
		// Send it out to every client that is currently connected
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
} */
