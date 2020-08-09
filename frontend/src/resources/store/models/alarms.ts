import { ModelConfig, Models, RematchDispatch, ModelReducers, ModelEffects } from "@rematch/core";
import { convertTimestamp } from 'common/services/time-service';

const generateAlarm = () => {
    return {
        date: convertTimestamp(Date.now()),
        active: true,
        info: "No data"
    }
};

export interface AlarmsModel extends ModelConfig {
    state: AlarmsState;
    name: string;
    reducers: ModelReducers;
    effects?: (dispatch: RematchDispatch<Models>) => ModelEffects<any>
}

export interface Alarm {
    date: string;
    active: boolean;
    info: string;
}

const INITIAL_STATE = [generateAlarm()] as Alarm[];

type AlarmsState = typeof INITIAL_STATE;

export const alarms: AlarmsModel = {
    state: INITIAL_STATE,
    name: 'alarms',
    reducers: {
        updateData: (state: AlarmsState) => {
            return [ generateAlarm(), ...state ]
        },
        resolveAlarm: (state: AlarmsState, payload) => {

            return state.map((item) => item.date === payload ? { ...item, active: false } : item )
        }
    },
};