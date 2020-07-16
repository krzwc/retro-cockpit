import React, {FunctionComponent} from 'react';
import { connect } from "react-redux";
import styles from './style.scss';
import {iRootState, Dispatch} from '../../resources/store/store'

type connectedProps = ReturnType<typeof mapState> &
    ReturnType<typeof mapDispatch>
type Props = connectedProps


const Test: FunctionComponent<Props> = ({ count, addByOne, addByOneAsync }) => {
    return (
        <div className={styles.test}>
            <h1>The count is: {count}</h1>
            <button onClick={addByOne}>Add 1</button>
            <button onClick={addByOneAsync}>Add 1 Async</button>
        </div>
    )
};

const mapState = (state: iRootState) => ({
    count: state.count,
});

const mapDispatch = (dispatch: Dispatch) => ({
    addByOne: () => dispatch.count.addBy(1),
    addByOneAsync: () => dispatch.count.addByAsync(1)
});

export default connect(mapState, mapDispatch)(Test);
