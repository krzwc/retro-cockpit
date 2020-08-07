import { ModelConfig, Models, RematchDispatch, ModelReducers, ModelEffects } from "@rematch/core";
import { range } from 'lodash-es';

export interface MetricsModel extends ModelConfig {
    state: MetricsState;
    name: string;
    reducers: ModelReducers;
    effects?: (dispatch: RematchDispatch<Models>) => ModelEffects<any>
}

export const DEFAULT_USER = 'User1';

export type BarChartData = {
    name: string,
    freq: number,
    freq2: number,
}

export type PBData = {
    [key: string]: number;
}

const INITIAL_STATE = {
    progressbars: { 
        pbNo: 5,
        data: {} as PBData,
    },
    barchart: {
        barsNo: 10,
        data: [] as BarChartData[],
    }
};

type MetricsState = typeof INITIAL_STATE;

const randomDataArray = (nb_elem: number) => {
    return range(nb_elem).map((item) => ({
        name: 'core ' + item,
        freq: Math.round(Math.random() * 1000),
        freq2: Math.round(Math.random() * 1000),
    }));
};

const randomProgressBarsValues = (pb_amount: number) => {
    return range(pb_amount).reduce((acc, _,index) => {
        return { ...acc, [`pb${index}`]: Math.round(Math.random() * 100) }
    }, {})
}

export const metrics: MetricsModel = {
    state: INITIAL_STATE,
    name: 'metrics',
    reducers: {
        updateData: (state: MetricsState) => {
            return { ...state, barchart: { ...state.barchart, data: randomDataArray(state.barchart.barsNo) } }
        },
        updatePBData: (state: MetricsState) => {
            return { ...state, progressbars:  { ...state.progressbars, data: randomProgressBarsValues(state.progressbars.pbNo) } }
        },
    },
};