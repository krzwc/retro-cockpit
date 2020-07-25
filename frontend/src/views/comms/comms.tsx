import React, { FunctionComponent } from 'react';

import { classNames } from 'common/helpers';

import styles from './style.scss';

const Comms: FunctionComponent = () => {
    return (
        <section className={styles.comms}>
            <section className={classNames('message-list', styles.message_container)}>
                <section className={classNames('message', '-left')}>
                    <div className={classNames('nes-balloon', 'from-left', 'is-dark')}>
                        <p>Hello NES.css</p>
                    </div>
                </section>

                <section className={classNames('message', '-right')}>
                    <div className={classNames('nes-balloon', 'from-right', 'is-dark')}>
                        <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
                    </div>
                </section>

                <section className={classNames('message', '-left')}>
                    <div className={classNames('nes-balloon', 'from-left', 'is-dark')}>
                        <p>Hello NES.css</p>
                    </div>
                </section>

                <section className={classNames('message', '-right')}>
                    <div className={classNames('nes-balloon', 'from-right', 'is-dark')}>
                        <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
                    </div>
                </section>

                <section className={classNames('message', '-left')}>
                    <div className={classNames('nes-balloon', 'from-left', 'is-dark')}>
                        <p>Hello NES.css</p>
                    </div>
                </section>

                <section className={classNames('message', '-right')}>
                    <div className={classNames('nes-balloon', 'from-right', 'is-dark')}>
                        <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
                    </div>
                </section>
            </section>
            <div className={classNames('nes-field', 'is-inline', styles.message_input)}>
                <input
                    type="text"
                    id="dark_field"
                    className={classNames('nes-input', 'is-success', 'is-dark')}
                    placeholder="Your message..."
                />
            </div>
        </section>
    );
};

export default Comms;
