import React, { FunctionComponent } from 'react';
import { Message, DEFAULT_USER } from '../../chat';

import { classNames } from 'common/helpers';

import styles from './style.scss';

const leftOrRight = (name: string) => (name === DEFAULT_USER ? styles.right : styles.left);
const leftOrRightBaloon = (name: string) => (name === DEFAULT_USER ? 'from-right' : 'from-left');

const ChatMessage: FunctionComponent<Message> = ({ name, text }) => {
    return (
        <section className={classNames('message', leftOrRight(name), styles.message)}>
            {console.log(name)}
            <div className={classNames('nes-balloon', leftOrRightBaloon(name), 'is-dark')}>
                <p>{text}</p>
            </div>
        </section>
    );
};

export default ChatMessage;
