import React, { FunctionComponent } from 'react';
import { noop } from 'lodash-es';

import styles from './style.scss';

interface ToggleProps {
    checked?: boolean;
    onClick?(): void;
}

const Toggle: FunctionComponent<ToggleProps> = ({ checked = false, onClick = noop }) => {
    return (
        <label className={styles.switch}>
            <input type="checkbox" checked={checked} onChange={onClick} />
            <span className={styles.slider}></span>
        </label>
    );
};

export default Toggle;
