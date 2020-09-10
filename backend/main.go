// https://github.com/scotch-io/go-realtime-chat/blob/master/src/main.go

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/websocket"
)

// Alarm struct
type Alarm struct {
	Time     string `json:"time"`
	Severity string `json:"severity"`
	Resolved bool   `json:"resolved"`
}

// PB_Metric struct
type PB_Metric struct {
	Pb        string `json:"pb"`
	Value     int    `json:"value"`
	Timestamp string `json:"timestamp"`
}

// BC_Metric struct
type BC_Metric struct {
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

func main() {
	// Configure websocket routes
	http.HandleFunc("/alarms", handleAlarms)
	http.HandleFunc("/pbmetrics", handlePBMetrics)
	http.HandleFunc("/bcmetrics", handleBCMetrics)
	http.HandleFunc("/chat", handleChat)

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
	fmt.Println(resolveAlarm)
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

	/* for {
		var msg Message
		// Read in a new message as JSON and map it to a Message object
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, ws)
			break
		}
		// Send the newly received message to the broadcast channel
		broadcast <- msg
	} */
	/* err = ws.WriteMessage(websocket.TextMessage, []byte("hi")) */

	var alarm Alarm
	for {
		go handleResolveAlarm(ws)
		alarm = Alarm{getTime(), randomSeverity(), false}
		err = ws.WriteJSON(alarm)
		if err != nil {
			log.Printf("Websocket error: %s", err)
			ws.Close()
		}

		time.Sleep(3 * time.Second)
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
	var pbMetric PB_Metric
	for {
		pbMetric = PB_Metric{randomMetricName("pb", 5), randomInRange(100), getTime()}
		err = ws.WriteJSON(pbMetric)
		if err != nil {
			log.Printf("Websocket error: %s", err)
			ws.Close()
		}

		time.Sleep(10 * time.Second)
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
	var bcMetric BC_Metric
	for {
		bcMetric = BC_Metric{randomMetricName("core", 10), randomInRange(100), randomInRange(100), getTime()}
		err = ws.WriteJSON(bcMetric)
		if err != nil {
			log.Printf("Websocket error: %s", err)
			ws.Close()
		}

		time.Sleep(7 * time.Second)
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
