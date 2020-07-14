import { init, RematchStore } from '@rematch/core'
import * as models from './models'

const store: RematchStore = init({
    models,
});

export const { dispatch } = store;

export default store
