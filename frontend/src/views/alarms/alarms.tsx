import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { take } from 'lodash-es';

import { iRootState, Dispatch } from 'resources/store/store';
import { Alarm } from 'resources/store/models/alarms';
/* import useInterval from 'common/hooks'; */
import Toggle from 'components/toggle';
import { classNames } from 'common/helpers';
import WebSocketService from 'common/services/websocket-service';

import styles from './style.scss';

WebSocketService.init();

interface AlarmsProps {
    data: Alarm[];
    updateData(): Action;
    addAlarm(message: Alarm): Action;
    resolveAlarm(date: string): Action;
}

const Alarms: FunctionComponent<AlarmsProps> = ({ data, updateData, addAlarm, resolveAlarm }) => {
    /* useInterval(() => {
        updateData();
    }, 60000); */

    useEffect(() => {
        WebSocketService.open();
        WebSocketService.onMessage(addAlarm);
    }, []);

    return (
        <div className={classNames('nes-table-responsive', styles.table)}>
            <table className={classNames('nes-table', 'is-bordered', 'is-dark')}>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Severity</th>
                        <th>Resolved</th>
                    </tr>
                </thead>
                <tbody>
                    {take(data, 5).map((alarm) => {
                        return (
                            <tr key={alarm.time}>
                                <td>{alarm.time}</td>
                                <td>{alarm.severity === 'critical' && <img src="assets/images/error.png" />}</td>
                                <td className={styles.toggle}>
                                    <Toggle checked={alarm.resolved} onClick={() => resolveAlarm(alarm.time)} />
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
        updateData: () => {
            return dispatch.alarms.updateData();
        },
        addAlarm: (payload: Alarm) => {
            return dispatch.alarms.addAlarm(payload);
        },
        resolveAlarm: (date: string) => {
            return dispatch.alarms.resolveAlarm(date);
        },
    };
};

export default connect(mapState, mapDispatch)(Alarms);
