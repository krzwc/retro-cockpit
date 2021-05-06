import { generateViews } from 'resources/router/helpers';
import { RouteInstance } from 'resources/router/interfaces';
import { ROUTE_NAMES, ROUTE_URLS } from 'common/consts';

import Metrics from './metrics';

const metricsRoute: RouteInstance = {
    name: ROUTE_NAMES.METRICS,
    url: ROUTE_URLS.METRICS,
    views: generateViews([
        {
            component: Metrics,
        },
    ]),
    params: {},
};

export default metricsRoute;
