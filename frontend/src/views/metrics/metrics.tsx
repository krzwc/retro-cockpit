import React, { FunctionComponent } from 'react';

import MovingChart from 'components/chart';
import ProgressBar from 'components/progressbar';

import styles from './style.scss';

const Metrics: FunctionComponent = () => {
    return (
        <div className={styles.grid}>
            <div className={styles.progressbars}>
                <ProgressBar />
            </div>
            <div className={styles.barcharts}>
                <MovingChart />
            </div>
        </div>
    );
};

export default Metrics;
