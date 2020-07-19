import { Map } from 'immutable';
import { createSelector, Selector } from 'reselect';

import { StoreState } from 'resources/store/interfaces';

import {
    RouterActiveState,
    RouterState,
  } from './interfaces';

export const routerSelector: Selector<StoreState, RouterState> = (state) => {
    return state.router;
}
  

export const routerActiveStateSelector: Selector<
  StoreState,
  RouterActiveState
> = createSelector(
  routerSelector,
  (router) => router.get('activeState', Map({})),
);

export const activeStateNameSelector: Selector<
  StoreState,
  string
> = createSelector(
  routerActiveStateSelector,
  (activeState) => activeState.get('name'),
);