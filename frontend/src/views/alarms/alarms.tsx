import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { take } from 'lodash-es';

import { iRootState, Dispatch } from 'resources/store/store';
import { Alarm } from 'resources/store/models/alarms';
import Toggle from 'components/toggle';
import { classNames } from 'common/helpers';
import WebSocketService, { ENDPOINTS } from 'common/services/websocket-service';

import styles from './style.scss';

interface AlarmsProps {
    data: Alarm[];
    updateData(message: Alarm): Action;
    resolveAlarm(date: string): Action;
}

const Alarms: FunctionComponent<AlarmsProps> = ({ data, updateData, resolveAlarm }) => {
    useEffect(() => {
        WebSocketService.init(ENDPOINTS.ALARMS_ENDPOINT);
        WebSocketService.open();
        WebSocketService.onMessage(updateData);
    }, []);

    return (
        <div className={classNames('nes-table-responsive', styles.table)}>
            <table className={classNames('nes-table', 'is-bordered', 'is-dark')}>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Severity</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {take(data, 5).map((alarm) => {
                        return (
                            <tr key={alarm.time}>
                                <td>{new Date(alarm.time).toUTCString()}</td>
                                <td>{alarm.severity === 'critical' && <img src="assets/images/error.png" />}</td>
                                <td className={styles.toggle}>
                                    <Toggle checked={!alarm.resolved} onClick={() => resolveAlarm(alarm.time)} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const mapState = (state: iRootState) => ({
    data: state.alarms,
});

const mapDispatch = (dispatch: Dispatch) => {
    return {
        updateData: (payload: Alarm) => {
            return dispatch.alarms.updateData(payload);
        },
        resolveAlarm: (date: string) => {
            return dispatch.alarms.resolveAlarm(date);
        },
    };
};

export default connect(mapState, mapDispatch)(Alarms);
