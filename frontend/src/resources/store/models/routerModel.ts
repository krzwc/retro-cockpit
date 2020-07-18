import { bindActionCreators } from 'redux'
import { triggerTransition } from '@uirouter/redux/lib/core/actions';
import { routerReducer } from '../../router/reducer';

export const routerModel = {
    baseReducer: routerReducer,
    effects: (dispatch: any) =>
        bindActionCreators(
            {
                triggerTransition
            },
            dispatch
        ),
} 