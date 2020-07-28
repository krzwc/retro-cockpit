const WS_ENDPOINT = 'ws://localhost:3030'

import { Action } from 'redux';
export interface Message {
    name: string;
    text: string;
}

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
    }

    static close() {
        this.ws.addEventListener('close', () => {
            // on connecting, do nothing but log it to the console
            console.log('disconnected');
        }) 
    }

    static onMessage(handler: (message: Message) => Action) {
        // on receiving a message, use the passed handler
      this.ws.addEventListener('message', (e: MessageEvent) => {
        const message = JSON.parse(e.data);
        handler(message)
      });
    }
    /* static sendMessage(message) {
      // You can have some transformers here.
      // Object to JSON or something else...
      this.ws.send(message);
    } */
  }