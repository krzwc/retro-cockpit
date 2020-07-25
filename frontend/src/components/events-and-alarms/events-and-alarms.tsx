import React, { FunctionComponent } from 'react';

import { classNames } from 'common/helpers';

import styles from './style.scss';

const EventsAndAlarms: FunctionComponent = () => {
    return (
        <div className={classNames('nes-container', 'is-dark', 'with-title', styles.alarms_container)}>
            <h3 className="title">Alarms</h3>
            <div className={styles.alarms}>
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

export default EventsAndAlarms;
