import React, { FunctionComponent } from 'react';

import Nav from 'components/nav';
import Main from 'components/main';
import EventsAndAlarms from 'components/events-and-alarms';

import styles from './style.scss';

const Layout: FunctionComponent = () => {
    return (
        <div className={styles.layout}>
            <Nav />
            <Main />
            <EventsAndAlarms />
        </div>
    );
};

export default Layout;
