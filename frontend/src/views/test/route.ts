import { generateViews } from '../../resources/router/helpers';
import { RouteInstance } from '../../resources/router/interfaces';
import { ROUTE_NAMES, ROUTE_URLS } from '../../common/consts';

import Test from './test';

const testRoute: RouteInstance = {
    name: ROUTE_NAMES.TEST,
    url: ROUTE_URLS.TEST,
    views: generateViews([
        {
            component: Test,
        },
    ]),
    params: {},
};

export default testRoute;
