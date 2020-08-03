import { count } from './count';
import { chat } from './chat';
import { metrics } from './metrics';

export interface RootModel {
    count: typeof count,
    chat: typeof chat,
    metrics: typeof metrics,
}

export { count, chat, metrics }