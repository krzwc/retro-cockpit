// https://github.com/scotch-io/go-realtime-chat/blob/master/src/main.go

package main

import (
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

// Alarm struct
type Alarm struct {
	Time     string `json:"time"`
	Severity string `json:"severity"`
	Resolved bool   `json:"resolved"`
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

func main() {
	// Configure websocket route
	http.HandleFunc("/ws", handleConnections)

	// Start listening for incoming chat messages
	/* go handleMessages() */

	// Start the server on localhost port 8000 and log any errors
	log.Println("http server started on :8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
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
		alarm = Alarm{time.Now().Format(time.RFC1123Z), randomSeverity(), false}
		err = ws.WriteJSON(alarm)
		if err != nil {
			log.Printf("Websocket error: %s", err)
			ws.Close()
		}

		time.Sleep(3 * time.Second)
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
