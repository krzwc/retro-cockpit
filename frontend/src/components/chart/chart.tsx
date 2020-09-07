import React, { FunctionComponent, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { connect } from 'react-redux';
import { Action } from 'redux';

import { iRootState, Dispatch } from 'resources/store/store';
import { BarChartData, BCMetric } from 'resources/store/models/metrics';
import WebSocketService, { ENDPOINTS } from 'common/services/websocket-service';

interface MovingChartProps {
    data: BarChartData[];
    updateBC(message: BCMetric): Action;
    /* updateData(): Action; */
}

const MovingChart: FunctionComponent<MovingChartProps> = ({ data, updateBC }) => {
    useEffect(() => {
        WebSocketService.init(ENDPOINTS.BC_METRICS_ENDPOINT);
        WebSocketService.open();
        WebSocketService.onMessage(updateBC);
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={450} height={340} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Bar dataKey="freq" fill="#8884d8" />
                <Bar dataKey="freq2" fill="#8214d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

const mapState = (state: iRootState) => ({
    data: state.metrics.barchart.data,
});

const mapDispatch = (dispatch: Dispatch) => {
    return {
        /* updateData: () => {
            return dispatch.metrics.updateData();
        }, */
        updateBC: (payload: BCMetric) => {
            return dispatch.metrics.updateBC(payload);
        },
    };
};

export default connect(mapState, mapDispatch)(MovingChart);
