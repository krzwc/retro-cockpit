import React, { FunctionComponent } from 'react';
import { UIView } from '@uirouter/react';

import { classNames } from 'common/helpers';

import styles from './style.scss';

const Main: FunctionComponent = () => {
    return (
        <main className={classNames('nes-container', 'is-dark', styles.main)}>
            <UIView name="main" />
        </main>
    );
};

export default Main;
