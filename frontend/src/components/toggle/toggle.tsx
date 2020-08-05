import React from 'react';

import styles from './style.scss';

const Toggle = () => {
    return (
        <label className={styles.switch}>
            <input type="checkbox" />
            <span className={styles.slider}></span>
        </label>
    );
};

export default Toggle;
