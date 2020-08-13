import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { take } from 'lodash-es';

import { iRootState, Dispatch } from 'resources/store/store';
import { Alarm } from 'resources/store/models/alarms';
import useInterval from 'common/hooks';
import Toggle from 'components/toggle';
import { classNames } from 'common/helpers';

import styles from './style.scss';

interface AlarmsProps {
    data: Alarm[];
    updateData(): Action;
    resolveAlarm(date: string): Action;
}

const Alarms: FunctionComponent<AlarmsProps> = ({ data, updateData, resolveAlarm }) => {
    useInterval(() => {
        updateData();
    }, 60000);

    return (
        <div className={classNames('nes-table-responsive', styles.table)}>
            <table className={classNames('nes-table', 'is-bordered', 'is-dark')}>
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
                                <td className={styles.toggle}>
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
