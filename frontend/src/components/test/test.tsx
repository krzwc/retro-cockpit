import React from 'react';
import { connect } from "react-redux";
import styles from './style.scss';

const Test = ({ count, addByOne, addByOneAsync }) => {
    return (
        <div className={styles.test}>
            <h1>The count is: {count}</h1>
            <button onClick={addByOne}>Add 1</button>
            <button onClick={addByOneAsync}>Add 1 Async</button>
        </div>
    )
};

const mapState = (state) => ({
    count: state.count,
});

const mapDispatch = ({ count: { addBy, addByAsync }}) => ({
    addByOne: () => addBy(1),
    addByOneAsync: () => addByAsync(1)
});

export default connect(mapState, mapDispatch)(Test);
