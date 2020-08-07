import React, { FunctionComponent } from 'react';

import { classNames } from 'common/helpers';

import styles from './style.scss';

interface ProgressBarProps {
    range: number;
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({ range }) => {
    return (
        <progress
            className={classNames('nes-progress', 'is-error', styles.progress)}
            value={range}
            max="100"
        ></progress>
    );
};

export default ProgressBar;
