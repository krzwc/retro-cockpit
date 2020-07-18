import { ImmutableMap } from '../../common/interfaces';
import { RouterState } from '../../resources/router/interfaces';

export type StoreState = ImmutableMap<{
  router: RouterState;
}>;