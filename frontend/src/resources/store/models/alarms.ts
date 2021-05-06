import { ModelConfig, Models, RematchDispatch, ModelReducers, ModelEffects } from '@rematch/core';
import { isEmpty } from 'lodash-es';
/* import { convertTimestamp } from 'common/services/time-service'; */

/* const generateAlarm = () => {
    return {
        time: convertTimestamp(Date.now()),
        severity: "critical",
        resolved: false,
    }
}; */

export interface AlarmsModel extends ModelConfig {
    state: AlarmsState;
    name: string;
    reducers: ModelReducers;
    effects?: (dispatch: RematchDispatch<Models>) => ModelEffects<any>;
}

export interface Alarm extends Record<string, unknown> {
    time: string;
    severity: string;
    resolved: boolean;
}

/* const INITIAL_STATE = [generateAlarm()] as Alarm[]; */
const INITIAL_STATE: Alarm[] = [];

type AlarmsState = typeof INITIAL_STATE;

export const alarms: AlarmsModel = {
    state: INITIAL_STATE,
    name: 'alarms',
    reducers: {
        updateData: (state: AlarmsState, payload: Alarm) => {
            if (isEmpty(state)) {
                return [payload];
            }
            const lastSavedDate = state[0].time;
            if (new Date(payload.time) > new Date(lastSavedDate)) {
                return [payload, ...state];
            }
            return state;
        },
        resolveAlarm: (state: AlarmsState, payload) => {
            return state.map((item) => (item.time === payload ? { ...item, resolved: true } : item));
        },
        resolveAlarms: (state: AlarmsState) => {
            return state.map((alarm) => ({ ...alarm, resolved: true }));
        },
    },
};
