import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import styles from './style.scss';
import { iRootState, Dispatch } from '../../resources/store/store';
import { bindActionCreators } from 'redux';
import { triggerTransition } from '@uirouter/redux/lib/core/actions';
// import { useSrefActive } from '@uirouter/react';
// import { dispatch } from '../../resources/store/store';
// import { TRIGGER_TRANSITION, triggerTransition } from '@uirouter/redux/lib/core/actions';

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
type Props = connectedProps;

const Test: FunctionComponent<Props> = ({ count, addByOne, addByOneAsync, triggerTransitionHome }) => {
    return (
        <>
            <div className={styles.test}>
                <h1>The count is: {count}</h1>
                <button onClick={addByOne}>Add 1</button>
                <button onClick={addByOneAsync}>Add 1 Async</button>
            </div>
            <div>
                {/* <button onClick={() => console.log(dispatch(triggerTransition))}>Go Home</button> */}
                {/* <button onClick={() => console.log(triggerTransitionAction('home', {}))}>Go Home</button> */}
                <button onClick={triggerTransitionHome}>Go Home</button>
            </div>
        </>
    );
};

const mapState = (state: iRootState) => ({
    count: state.count,
});

const mapDispatch = (dispatch: Dispatch) => {
    const triggerTransitionAction = bindActionCreators(triggerTransition, dispatch);

    return {
        addByOne: () => {
            /* console.log(dispatch.count.addBy); */
            return dispatch.count.addBy(1);
        },
        addByOneAsync: () => dispatch.count.addByAsync(1),
        triggerTransitionHome: () => {
            /* console.log(() => triggerTransitionAction('home', {})); */
            return triggerTransitionAction('home', {});
        },
        // triggerTransitionHome: () => dispatch.count.triggerTransitionAction('home', {}),
    };
};

export default connect(mapState, mapDispatch)(Test);
