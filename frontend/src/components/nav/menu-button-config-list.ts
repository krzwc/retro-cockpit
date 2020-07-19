import { ROUTE_NAMES } from 'common/consts';

import { MenuButtonConfig } from './interfaces';

export const menuButtonConfigList: MenuButtonConfig[] = [
  {
    iconType: 'home',
    title: 'Home',
    to: ROUTE_NAMES.HOME,
  },
  {
    iconType: 'test',
    title: 'Test',
    to: ROUTE_NAMES.TEST,
  },
];
