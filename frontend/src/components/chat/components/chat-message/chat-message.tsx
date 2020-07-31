import React, { FunctionComponent } from 'react';

import { DEFAULT_USER } from 'resources/store/models/chat';
import { classNames } from 'common/helpers';

import { Message } from '../../chat';
import styles from './style.scss';

const leftOrRight = (name: string) => (name === DEFAULT_USER ? styles.right : styles.left);
const leftOrRightBaloon = (name: string) => (name === DEFAULT_USER ? 'from-right' : 'from-left');
const isBot = (name: string) => name === 'BOT';

const ChatMessage: FunctionComponent<Message> = ({ name, text }) => {
    return (
        <section className={classNames('message', leftOrRight(name), styles.message)}>
            {isBot(name) && (
                <img
                    className={classNames('nes-avatar', 'is-rounded', 'is-large', styles.avatar)}
                    src="assets/images/robot.png"
                />
            )}
            <div className={classNames('nes-balloon', leftOrRightBaloon(name), 'is-dark')}>
                <p>{text}</p>
            </div>
        </section>
    );
};

export default ChatMessage;
