import React, { FunctionComponent } from 'react';

import Nav from 'components/nav';
import Main from 'components/main';
import Events from 'components/events';

import styles from './style.scss';

const Layout: FunctionComponent = () => {
    return (
        <div className={styles.layout}>
            <Nav />
            <Main />
            <Events />
        </div>
    );
};

export default Layout;
