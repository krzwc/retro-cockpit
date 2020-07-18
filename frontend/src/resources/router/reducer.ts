import { fromJS, Map } from 'immutable';
import {
  FINISH_TRANSITION,
  IGNORED_TRANSITION,
  START_TRANSITION,
} from '@uirouter/redux/lib-esm/core/actions';
import { Transition } from '@uirouter/react';

import {
  RouterState,
  RouterActiveState,
  TransitionAction,
  RouteTarget,
} from './interfaces';

const getActiveState = (transition: Transition): RouterActiveState => {
  const target: RouteTarget = transition.$to();
  const params = transition.params();
  const { name, breadcrumbs, includes: includesPaths } = target;

  return fromJS({ name, params, includesPaths, breadcrumbs });
};

const initialState = fromJS({
  transitioning: false,
  activeState: {
    name: '',
    params: {},
    includesPaths: {},
    breadcrumbs: [],
  },
  previousState: {},
});

/**
 * Replaces reducer provided by @uirouter/redux plugin.
 * Original reducer attempts to store big Transition object full of unserializable data.
 * This reducer stores only the least state required in immutable object.
 * Should there be a need to store more data, check @uirouter/core Transition interface for more options.
 */
export const routerReducer = (
  state = initialState,
  action: TransitionAction,
) => {
  const { type } = action;
  const { transition } = action;

  switch (type) {
    case START_TRANSITION:
      return state.set('transitioning', true);

    case FINISH_TRANSITION:
      return state.withMutations((currentState: RouterState) => {
        currentState
          .set('transitioning', false)
          .set(
            'previousState',
            Map({
              name: state.getIn(['activeState', 'name']),
              params: state.getIn(['activeState', 'params']),
            }),
          )
          .set('activeState', getActiveState(transition));
      });
    case IGNORED_TRANSITION:
      return state.withMutations((currentState: RouterState) => {
        currentState
          .set('transitioning', false)
          .set('activeState', getActiveState(transition));
      });
    default:
      return state;
  }
};
