import React, { FunctionComponent } from 'react';

import Link from 'components/link';
import Icon from 'components/icon';

import { MenuButton } from '../../interfaces';

const MenuButton: FunctionComponent<MenuButton> = (props) => {
    const { iconType, title, routeStateName, to } = props;

    const shouldRenderLink = routeStateName !== to;

    return shouldRenderLink ? (
        <Link clearFilterQuery={true} to={to}>
            <a>
                <Icon className="view-button-icon" type={iconType} />
                <span className="view-button-title">{title}</span>
            </a>
        </Link>
    ) : (
        <a>
            <Icon className="view-button-icon" type={iconType} />
            <span className="view-button-title">{title}</span>
        </a>
    );
};

export default MenuButton;
