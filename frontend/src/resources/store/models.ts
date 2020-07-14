const delay = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

const devtools =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export const count = {
    redux: {
        enhancers: [devtools()],
    },
    state: 0, // initial state
    reducers: {
        addBy(state, payload) {
            return state + payload
        }
    },
    effects: (dispatch) => ({
        async addByAsync(payload, state) {
            await delay(1000)
            dispatch.count.addBy(1)
        }
    })
};
