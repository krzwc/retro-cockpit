import React, { FunctionComponent } from 'react';

import Nav from 'components/nav';
import Main from 'components/main';
import Comm from 'components/comm';

import styles from './style.scss';

const Layout: FunctionComponent = () => {
    return (
        <div className={styles.layout}>
            <Nav />
            <Main />
            <Comm />
        </div>
    );
};

export default Layout;
