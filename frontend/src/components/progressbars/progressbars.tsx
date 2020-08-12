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
    useInterval(() => updatePBData(), 5000);

    return (
        <>
            {Object.values(data).map((singlePB, index) => (
                <ProgressBar range={singlePB} key={index} label={`KPI${index}`} id={`KPI${index}`} />
            ))}
            {console.log(data)}
        </>
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
