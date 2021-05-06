import { count } from './count';
import { chat } from './chat';
import { metrics } from './metrics';
import { alarms } from './alarms';

export interface RootModel {
    count: typeof count;
    chat: typeof chat;
    metrics: typeof metrics;
    alarms: typeof alarms;
}

export { count, chat, metrics, alarms };
