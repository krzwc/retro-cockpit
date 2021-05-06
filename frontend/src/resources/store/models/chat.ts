import { ModelConfig, Models, RematchDispatch, ModelReducers, ModelEffects } from '@rematch/core';

export interface Message {
    name: string;
    text: string;
}

interface ChatState {
    name: string;
    chat: Message[];
}

export interface ChatModel extends ModelConfig {
    state: ChatState;
    name: string;
    reducers: ModelReducers;
    effects?: (dispatch: RematchDispatch<Models>) => ModelEffects<any>;
}

export const DEFAULT_USER = 'User1';

const INITIAL_STATE: { name: string; chat: Message[] } = {
    name: DEFAULT_USER,
    chat: [],
};

export const chat: ChatModel = {
    state: INITIAL_STATE,
    name: 'chat',
    reducers: {
        addMessage: (state: ChatState, payload: Message) => {
            return { ...state, chat: [...state.chat, payload] };
        },
    },
};
