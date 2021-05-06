export interface MenuButtonConfig {
    iconType: string;
    title: string;
    to: string;
}

export interface MenuButton extends MenuButtonConfig {
    routeStateName: string;
}
