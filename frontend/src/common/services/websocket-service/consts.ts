import { ENDPOINTS_HOST } from 'common/consts'

export const ENDPOINTS = {
    ALARMS_ENDPOINT: ENDPOINTS_HOST + '/alarms',
    PB_METRICS_ENDPOINT: ENDPOINTS_HOST + '/pbmetrics',
    BC_METRICS_ENDPOINT: ENDPOINTS_HOST + '/bcmetrics',
    CHAT: ENDPOINTS_HOST + '/chat',
}

export enum MESSAGE_TYPES {
    RESOLVE_ALARM = 'RESOLVE_ALARM',
    RESOLVE_ALARMS = 'RESOLVE_ALARMS',
}