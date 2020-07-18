import { ModelConfig, Models, RematchDispatch, ModelReducers, ModelEffects } from "@rematch/core";

const delay = (time: number) => new Promise(resolve => setTimeout(() => resolve(), time));

export type CountState = number;

export interface CountModel extends ModelConfig{
    state: number;
    name: string;
    reducers: ModelReducers;
    effects: (dispatch: RematchDispatch<Models>) => ModelEffects<any>
}

export const count: CountModel = {
    state: 0, // initial state
    name: 'count',
    reducers: {
        addBy: (state: CountState, payload) => {
            return state + payload
        },
    },
    effects: (dispatch: RematchDispatch<Models>) => ({
        addByAsync: async (payload, state) => {
            await delay(1000);
            dispatch.count.addBy(1)
        }
    })
};

export interface RootModel {
    count: typeof count
}
