// https://karlboghossian.com/2020/05/24/introduction-to-websockets/
// https://stackoverflow.com/questions/46994344/architecture-in-a-react-native-app-using-websockets

import { Action } from 'redux';

const WS_ENDPOINT = 'ws://localhost:3030'

export default class WebSocketService {
    private static ws: WebSocket;
    
    static init() {
      this.ws = new WebSocket(WS_ENDPOINT);
    }

    static open() {
        this.ws.addEventListener('open', () => {
            // on connecting, do nothing but log it to the console
            console.log('connected');
        }) 
        this.ws.addEventListener('close', () => {
            // on connecting, do nothing but log it to the console
            console.log('disconnected');
            // automatically try to reconnect on connection loss
            this.init();
        })        
    }

    static onMessage(handler: (message: object) => Action) {
        // on receiving a message, use the passed handler
      this.ws.addEventListener('message', (e: MessageEvent) => {
        const message = JSON.parse(e.data);
        handler(message)
      });
    }

    static sendMessage(message: object, handler: (message: object) => Action) {
        this.ws.send(JSON.stringify(message));
        handler(message);
    }
  }