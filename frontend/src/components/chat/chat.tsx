import React, { PureComponent } from 'react';
import ChatInput from './components/chat-input';
import ChatMessage from './components/chat-message';

import { classNames } from 'common/helpers';
import styles from './style.scss';

const URL = 'ws://localhost:3030';

export interface Message {
    name: string;
    text: string;
}

interface ChatState {
    name: string;
    messages: Message[];
}

export const DEFAULT_USER = 'User1';

class Chat extends PureComponent<{}, ChatState> {
    public state = {
        name: DEFAULT_USER,
        messages: [] as Message[],
    };

    ws = new WebSocket(URL);

    public componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected');
        };

        this.ws.onmessage = (e: MessageEvent) => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(e.data);
            this.addMessage(message);
        };

        this.ws.onclose = () => {
            console.log('disconnected');
            // automatically try to reconnect on connection loss
            /* this.setState({
                ws: new WebSocket(URL),
            }); */
        };
    }

    private addMessage = (message: Message) => this.setState((state) => ({ messages: [message, ...state.messages] }));

    private submitMessage = (messageString: string) => {
        // on submitting the ChatInput form, send the message, add it to the list and reset the input
        const message = { name: this.state.name, text: messageString };
        this.ws.send(JSON.stringify(message));
        this.addMessage(message);
    };

    public render() {
        return (
            <section className={styles.comms}>
                {/* <label htmlFor="name">
                    Name:&nbsp;
                    <input
                        type="text"
                        id={'name'}
                        placeholder={'Enter your name...'}
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                </label>
                 */}
                <section className={classNames('message-list', styles.message_container)}>
                    {this.state.messages.map((message, index) => (
                        <ChatMessage key={index} {...message} />
                    ))}
                </section>
                <ChatInput onSubmitMessage={(messageString) => this.submitMessage(messageString)} />
            </section>
        );
    }
}

export default Chat;
