import React, { FunctionComponent } from 'react';
import { UIView } from '@uirouter/react';

import styles from './style.scss';

const Main: FunctionComponent = () => {
    return (
        <div className={styles.mainContent}>
            <UIView name="main" />
        </div>
    );
};

export default Main;
