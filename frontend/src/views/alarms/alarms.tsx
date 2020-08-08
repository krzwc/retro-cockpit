import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { take } from 'lodash-es';

import { iRootState, Dispatch } from 'resources/store/store';
import { Alarm } from 'resources/store/models/alarms';
import useInterval from 'common/hooks';
import Toggle from 'components/toggle';

interface AlarmsProps {
    data: Alarm[];
    updateData(): Action;
    resolveAlarm(date: string): Action;
}

const Alarms: FunctionComponent<AlarmsProps> = ({ data, updateData, resolveAlarm }) => {
    useInterval(() => {
        console.log('working');
        updateData();
    }, 5000);

    return (
        <div className="nes-table-responsive">
            <table className="nes-table is-bordered is-dark">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Msg</th>
                        <th>Resolve</th>
                    </tr>
                </thead>
                <tbody>
                    {take(data, 5).map((alarm) => {
                        return (
                            <tr key={alarm.date}>
                                <td>{alarm.date}</td>
                                <td>{alarm.info}</td>
                                <td>
                                    <Toggle checked={alarm.active} onClick={() => resolveAlarm(alarm.date)} />
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
        resolveAlarm: (date: string) => {
            return dispatch.alarms.resolveAlarm(date);
        },
    };
};

export default connect(mapState, mapDispatch)(Alarms);
