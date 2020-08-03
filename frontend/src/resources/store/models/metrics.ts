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

const INITIAL_STATE = {
    progressbar: 30,
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

export const metrics: MetricsModel = {
    state: INITIAL_STATE,
    name: 'metrics',
    reducers: {
        updateData: (state: MetricsState) => {
            return { ...state, barchart: { ...state.barchart, data: randomDataArray(state.barchart.barsNo) } }
        },
    },
};