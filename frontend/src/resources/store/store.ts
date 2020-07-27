import { init, RematchStore, RematchRootState, RematchDispatch } from '@rematch/core'
import { count, chat, RootModel } from './models'
// import { routerModel } from './models/routerModel'
// import {routerMiddleware, routerReducer} from "../router/router";
import routerMiddleware from '../router/middleware'
import { routerReducer } from '../router/reducer'


const store: RematchStore = init({
    models: { count, chat },
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
