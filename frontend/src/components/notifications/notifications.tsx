import React, { FunctionComponent } from 'react';

import { classNames } from 'common/helpers';

import styles from './style.scss';

const Notifications: FunctionComponent = () => {
    return (
        <div className={classNames('nes-container', 'is-dark', 'with-title', styles.notifications_container)}>
            <h3 className="title">Notifications</h3>
            <div className={styles.notifications}>
                <button type="button" className={classNames('nes-btn', /* 'is-dark', */ 'is-success', 'nes-pointer')}>
                    Success
                </button>
                <button type="button" className={classNames('nes-btn', /* 'is-dark',  */ 'is-warning', 'nes-pointer')}>
                    Warning
                </button>
                <button type="button" className={classNames('nes-btn', /* 'is-dark', */ 'is-error', 'nes-pointer')}>
                    Error
                </button>
            </div>
        </div>
    );
};

export default Notifications;
