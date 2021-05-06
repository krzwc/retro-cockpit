import { ModelConfig, Models, RematchDispatch, ModelReducers, ModelEffects } from '@rematch/core';
import { range } from 'lodash-es';

export interface MetricsModel extends ModelConfig {
    state: MetricsState;
    name: string;
    reducers: ModelReducers;
    effects?: (dispatch: RematchDispatch<Models>) => ModelEffects<any>;
}

export const DEFAULT_USER = 'User1';

export interface PBMetric extends Record<string, unknown> {
    pb: string;
    value: number;
}

export interface BCMetric extends Record<string, unknown> {
    core: string;
    freq0: number;
    freq1: number;
}

export type BarChartData = {
    core: string;
    freq0: number;
    freq1: number;
};

export type PBData = {
    [key: string]: number;
};

type MetricsState = typeof INITIAL_STATE;

const initBCData = (bc: number) => {
    return range(bc).map((item) => ({
        core: 'core' + item,
        freq0: 0,
        freq1: 0,
    }));
};

const initPBData = (pb: number) => {
    return range(pb).reduce((acc, _, index) => {
        return { ...acc, [`pb${index}`]: 0 };
    }, {});
};

const INITIAL_STATE: {
    progressbars: { pbNo: number; data: PBData };
    barchart: {
        barsNo: number;
        data: BarChartData[];
    };
} = {
    progressbars: {
        pbNo: 5,
        data: initPBData(5),
    },
    barchart: {
        barsNo: 10,
        data: initBCData(10),
    },
};

export const metrics: MetricsModel = {
    state: INITIAL_STATE,
    name: 'metrics',
    reducers: {
        /* updateData: (state: MetricsState) => {
            return { ...state, barchart: { ...state.barchart, data: randomDataArray(state.barchart.barsNo) } }
        },
        updatePBData: (state: MetricsState) => {
            return { ...state, progressbars:  { ...state.progressbars, data: randomProgressBarsValues(state.progressbars.pbNo) } }
        }, */
        updatePB: (state: MetricsState, payload: PBMetric) => {
            console.log(payload);
            return {
                ...state,
                progressbars: {
                    ...state.progressbars,
                    data: { ...state.progressbars.data, [payload.pb]: payload.value },
                },
            };
        },
        updateBC: (state: MetricsState, payload: BCMetric) => {
            console.log(payload);
            return {
                ...state,
                barchart: {
                    ...state.barchart,
                    data: state.barchart.data.map((bc) => {
                        return bc.core === payload.core
                            ? { core: payload.core, freq0: payload.freq0, freq1: payload.freq1 }
                            : bc;
                    }),
                },
            };
        },
    },
};
