import { ROUTE_NAMES } from 'common/consts';

import { MenuButtonConfig } from './interfaces';

export const menuButtonConfigList: MenuButtonConfig[] = [
  /* {
    iconType: 'home',
    title: 'Home',
    to: ROUTE_NAMES.HOME,
  },
  {
    iconType: 'test',
    title: 'Test',
    to: ROUTE_NAMES.TEST,
  }, */
  {
    iconType: 'comms',
    title: 'Comms',
    to: ROUTE_NAMES.COMMS,
  },
  {
    iconType: 'metrics',
    title: 'Metrics',
    to: ROUTE_NAMES.METRICS,
  },
  {
    iconType: 'alarms',
    title: 'Alarms',
    to: ROUTE_NAMES.ALARMS,
  },
];
