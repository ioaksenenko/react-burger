export interface IRouteState {
    readonly [path: string]: boolean;
};

export interface IRouteStore {
    readonly route: IRouteState;
};