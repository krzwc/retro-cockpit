export enum ENDPOINTS {
    ALARMS_ENDPOINT = 'ws://localhost:8000/alarms',
    PB_METRICS_ENDPOINT = 'ws://localhost:8000/pbmetrics',
    BC_METRICS_ENDPOINT = 'ws://localhost:8000/bcmetrics',
    CHAT = 'ws://localhost:8000/chat',
}

export enum MESSAGE_TYPES {
    RESOLVE_ALARM = 'RESOLVE_ALARM',
    RESOLVE_ALARMS = 'RESOLVE_ALARMS',
}