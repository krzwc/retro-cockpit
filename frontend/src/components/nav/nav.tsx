import React, { FunctionComponent } from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { StoreState } from 'resources/store/interfaces';
import { activeStateNameSelector } from 'resources/router/selectors';

import MenuButton from './components/menu-button';
import { menuButtonConfigList } from './menu-button-config-list';

import { classNames } from 'common/helpers';

import styles from './style.scss';

interface NavStateToProps {
    routeStateName: string;
}

const mapStateToProps: MapStateToProps<NavStateToProps, object, StoreState> = (state) => ({
    routeStateName: activeStateNameSelector(state),
});

const Nav: FunctionComponent<NavStateToProps> = ({ routeStateName }) => {
    const ViewButtons = menuButtonConfigList.map((props) => {
        return <MenuButton key={props.title} routeStateName={routeStateName} {...props} />;
    });

    return (
        <nav className={classNames('nes-container', 'is-dark', 'with-title', styles.nav)}>
            <h3 className="title">Menu</h3>
            <div className="menu-buttons-container">{ViewButtons}</div>
        </nav>
    );
};

export default connect(mapStateToProps)(Nav);
