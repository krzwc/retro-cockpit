import { generateViews } from '../../resources/router/helpers';
import { RouteInstance } from '../../resources/router/interfaces';
import { ROUTE_NAMES, ROUTE_URLS } from '../../common/consts';

import Alarms from './alarms';

const alarmsRoute: RouteInstance = {
  name: ROUTE_NAMES.ALARMS,
  url: ROUTE_URLS.ALARMS,
  views: generateViews([
    {
      component: Alarms,
    },
  ]),
  params: {
  },
};

export default alarmsRoute;