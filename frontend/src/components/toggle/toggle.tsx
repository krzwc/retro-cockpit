import React, { FunctionComponent } from 'react';
import { noop } from 'lodash-es';
import { classNames } from 'common/helpers';

import styles from './style.scss';

interface ToggleProps {
    checked?: boolean;
    className?: string;
    onClick?(): void;
}

const Toggle: FunctionComponent<ToggleProps> = ({ checked = false, onClick = noop, className = '' }) => {
    return (
        <label className={classNames(styles.switch, className)}>
            <input type="checkbox" checked={checked} onChange={onClick} />
            <span className={styles.slider}></span>
        </label>
    );
};

export default Toggle;
