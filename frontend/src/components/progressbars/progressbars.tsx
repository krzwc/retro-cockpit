import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';

import { iRootState, Dispatch } from 'resources/store/store';
import ProgressBar from 'components/progressbar';
import { PBData, PBMetric } from 'resources/store/models/metrics';
import WebSocketService, { ENDPOINTS } from 'common/services/websocket-service';
/* import useInterval from 'common/hooks'; */

interface ProgressBarsProps {
    data: PBData;
    updatePB(message: PBMetric): Action;
    /* updatePBData(): Action; */
}

const ProgressBars: FunctionComponent<ProgressBarsProps> = ({ data, updatePB /* , updatePBData */ }) => {
    /* useInterval(() => updatePBData(), 5000); */

    useEffect(() => {
        WebSocketService.init(ENDPOINTS.PB_METRICS_ENDPOINT);
        WebSocketService.open();
        WebSocketService.onMessage(updatePB);
    }, []);

    return (
        <>
            {Object.values(data).map((singlePB, index) => (
                <ProgressBar range={singlePB} key={index} label={`KPI${index}`} id={`KPI${index}`} />
            ))}
        </>
    );
};

const mapState = (state: iRootState) => ({
    data: state.metrics.progressbars.data,
});

const mapDispatch = (dispatch: Dispatch) => {
    return {
        /* updatePBData: () => {
            return dispatch.metrics.updatePBData();
        }, */
        updatePB: (payload: PBMetric) => {
            return dispatch.metrics.updatePB(payload);
        },
    };
};

export default connect(mapState, mapDispatch)(ProgressBars);
