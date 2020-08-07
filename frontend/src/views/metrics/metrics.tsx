import React, { FunctionComponent } from 'react';

import MovingChart from 'components/chart';
import ProgressBars from 'components/progressbars';

import styles from './style.scss';

const Metrics: FunctionComponent = () => {
    return (
        <div className={styles.grid}>
            <div className={styles.progressbars}>
                <ProgressBars />
            </div>
            <div className={styles.barcharts}>
                <MovingChart />
            </div>
        </div>
    );
};

export default Metrics;
