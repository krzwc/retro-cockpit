// https://blog.bitlabstudio.com/a-simple-chat-app-with-react-node-and-websocket-35d3c9835807

import React, { PureComponent } from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';

import ChatInput from './components/chat-input';
import ChatMessage from './components/chat-message';

import { classNames } from 'common/helpers';
import styles from './style.scss';

import { iRootState, Dispatch } from '../../resources/store/store';

const URL = 'ws://localhost:3030';

export interface Message {
    name: string;
    text: string;
}

interface ChatProps {
    name: string;
    chat: Message[];
    addMessage(message: Message): Action;
}

class Chat extends PureComponent<ChatProps> {
    private ws = new WebSocket(URL);
    private messageListRef = React.createRef<HTMLDivElement>();

    public componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected');
        };

        this.ws.onmessage = (e: MessageEvent) => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(e.data);
            this.props.addMessage(message);
        };

        this.ws.onclose = () => {
            console.log('disconnected');
            // automatically try to reconnect on connection loss
            /* this.setState({
                ws: new WebSocket(URL),
            }); */
        };
    }

    public componentDidUpdate() {
        if (this.messageListRef.current) {
            this.messageListRef.current.scrollTop = this.messageListRef.current.scrollHeight;
        }
    }

    private submitMessage = (messageString: string) => {
        // on submitting the ChatInput form, send the message, add it to the list and reset the input
        const message = { name: this.props.name, text: messageString };
        this.ws.send(JSON.stringify(message));
        this.props.addMessage(message);
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
                {console.log(this.messageListRef)}
                <div className={classNames('message-list', styles.message_container)} ref={this.messageListRef}>
                    {this.props.chat.map((message, index) => (
                        <ChatMessage key={index} {...message} />
                    ))}
                </div>
                <ChatInput onSubmitMessage={(messageString) => this.submitMessage(messageString)} />
            </section>
        );
    }
}

const mapState = (state: iRootState) => ({
    chat: state.chat.chat,
    name: state.chat.name,
});

const mapDispatch = (dispatch: Dispatch) => {
    return {
        addMessage: (payload: Message) => {
            return dispatch.chat.addMessage(payload);
        },
    };
};

export default connect(mapState, mapDispatch)(Chat);
