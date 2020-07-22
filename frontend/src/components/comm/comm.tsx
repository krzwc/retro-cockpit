import React, { FunctionComponent } from 'react';

import { classNames } from 'common/helpers';

import styles from './style.scss';

const Comm: FunctionComponent = () => {
    return (
        <div className={classNames('nes-container', 'is-dark', styles.comm)}>
            <p className={classNames('nes-balloon', 'from-left', 'nes-pointer')}>
                This is not a clickable element, but it's an area of the pointer.
            </p>
        </div>
    );
};

export default Comm;
