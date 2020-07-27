import { count } from './count';
import { chat } from './chat';

export interface RootModel {
    count: typeof count,
    chat: typeof chat,
}

export { count, chat }