import { init, RematchStore, RematchRootState, RematchDispatch } from '@rematch/core'
import * as models from './models'
import {routerMiddleware, routerReducer} from "../router/router";
import { RootModel} from "./models";

const store: RematchStore = init({
    models,
    redux: {
        middlewares: [routerMiddleware],
        reducers: {
            router: routerReducer
        },
    },
});

export const { dispatch } = store;

export default store

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type iRootState = RematchRootState<RootModel>
