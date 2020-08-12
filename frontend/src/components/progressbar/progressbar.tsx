import React, { FunctionComponent } from 'react';

import { classNames } from 'common/helpers';

import styles from './style.scss';

interface ProgressBarProps {
    range: number;
    label: string;
    id: string;
}

const progressBarStatus = (range: number): string => {
    switch (true) {
        case range < 20:
            return 'is-error';
        case range < 50:
            return 'is-warning';
        default:
            return 'is-success';
    }
};

const ProgressBar: FunctionComponent<ProgressBarProps> = ({ range, label, id }) => {
    return (
        <>
            <label htmlFor={id} style={{ color: '#fff' }}>
                {label}
            </label>
            <progress
                className={classNames('nes-progress', progressBarStatus(range), styles.progress)}
                value={range}
                max="100"
                id={id}
            ></progress>
        </>
    );
};

export default ProgressBar;
