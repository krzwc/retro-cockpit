import { generateViews } from '../../resources/router/helpers';
import { RouteInstance } from '../../resources/router/interfaces';
import { ROUTE_NAMES, ROUTE_URLS } from '../../common/consts';

import Comms from './comms';

const commsRoute: RouteInstance = {
    name: ROUTE_NAMES.COMMS,
    url: ROUTE_URLS.COMMS,
    views: generateViews([
        {
            component: Comms,
        },
    ]),
    params: {},
};

export default commsRoute;
