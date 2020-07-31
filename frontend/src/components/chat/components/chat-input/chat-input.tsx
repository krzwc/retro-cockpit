import React, { FunctionComponent, useState, SyntheticEvent } from 'react';

import { classNames } from 'common/helpers';

import styles from './style.scss';

interface ChatInput {
    onSubmitMessage(message: string): void;
}

const ChatInput: FunctionComponent<ChatInput> = ({ onSubmitMessage }) => {
    const [messageString, setMessageString] = useState('');

    return (
        <div className={classNames('nes-field', 'is-inline', styles.chat_input)}>
            <form
                action="."
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitMessage(messageString);
                    setMessageString('');
                }}
                className={styles.form}
            >
                <input
                    type="text"
                    placeholder={'Enter message...'}
                    className={classNames('nes-input', 'is-success', 'is-dark')}
                    value={messageString}
                    onChange={(e: SyntheticEvent<HTMLInputElement>) =>
                        setMessageString((e.target as HTMLInputElement).value)
                    }
                />
            </form>
        </div>
    );
};

export default ChatInput;
