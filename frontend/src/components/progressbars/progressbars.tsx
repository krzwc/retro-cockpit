import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';

import { iRootState, Dispatch } from 'resources/store/store';
import ProgressBar from 'components/progressbar';
import { PBData } from 'resources/store/models/metrics';
import useInterval from 'common/hooks';

interface ProgressBarsProps {
    data: PBData;
    updatePBData(): Action;
}

const ProgressBars: FunctionComponent<ProgressBarsProps> = ({ data, updatePBData }) => {
    useInterval(() => updatePBData(), 1000);

    return (
        <div>
            {Object.values(data).map((singlePB, index) => (
                <ProgressBar range={singlePB} key={index} />
            ))}
            {console.log(data)}
        </div>
    );
};

const mapState = (state: iRootState) => ({
    data: state.metrics.progressbars.data,
});

const mapDispatch = (dispatch: Dispatch) => {
    return {
        updatePBData: () => {
            return dispatch.metrics.updatePBData();
        },
    };
};

export default connect(mapState, mapDispatch)(ProgressBars);
