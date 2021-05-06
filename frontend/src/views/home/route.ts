import { generateViews } from '../../resources/router/helpers';
import { RouteInstance } from '../../resources/router/interfaces';
import { ROUTE_NAMES, ROUTE_URLS } from '../../common/consts';

import Home from './home';

const homeRoute: RouteInstance = {
    name: ROUTE_NAMES.HOME,
    url: ROUTE_URLS.HOME,
    views: generateViews([
        {
            component: Home,
        },
    ]),
    params: {},
};

export default homeRoute;
