import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { iRootState, Dispatch } from 'resources/store/store';
import { classNames } from 'common/helpers';

interface ProgressBarProps {
    data: number;
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({ data }) => {
    return <progress className={classNames('nes-progress', 'is-error')} value={data} max="100"></progress>;
};

const mapState = (state: iRootState) => ({
    data: state.metrics.progressbars.pb1,
});

const mapDispatch = (dispatch: Dispatch) => {
    return {};
};

export default connect(mapState, mapDispatch)(ProgressBar);
