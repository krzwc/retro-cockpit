// https://karlboghossian.com/2020/05/24/introduction-to-websockets/
// https://stackoverflow.com/questions/46994344/architecture-in-a-react-native-app-using-websockets
// https://gist.github.com/woraperth/3ecb45fe3b6502cabae043ba9fd3a3e5

import { Action } from 'redux';

export default class WebSocketService {
    private static ws: WebSocket;
    private static endpoint: string;

    static init(endpoint: string) {
        this.endpoint = endpoint;
        this.ws = new WebSocket(endpoint);
    }

    static open() {
        this.ws.addEventListener('open', () => {
            // on connecting, do nothing but log it to the console
            console.log('connected');
        });
        this.ws.addEventListener('close', () => {
            // on connecting, do nothing but log it to the console
            console.log('disconnected');
            // automatically try to reconnect on connection loss
            this.init(this.endpoint);
        });
    }

    static onMessage(handler: (message: Record<string, unknown>) => Action) {
        // on receiving a message, use the passed handler
        this.ws.addEventListener('message', (e: MessageEvent) => {
            const message = JSON.parse(e.data);
            handler(message);
        });
    }

    static sendMessage(message: Record<string, unknown>, handler?: (message: Record<string, unknown>) => Action) {
        this.ws.send(JSON.stringify(message));
        if (handler) {
            handler(message);
        }
    }
}
