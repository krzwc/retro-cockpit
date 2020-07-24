import React, { FunctionComponent } from 'react';

import Nav from 'components/nav';
import Main from 'components/main';
import Notifications from 'components/notifications';

import styles from './style.scss';

const Layout: FunctionComponent = () => {
    return (
        <div className={styles.layout}>
            <Nav />
            <Main />
            <Notifications />
        </div>
    );
};

export default Layout;
