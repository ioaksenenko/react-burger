export interface ITargetBunState {
    readonly isOver: boolean;
    readonly canDrop: boolean;
};

export interface ITargetBunStore {
    readonly bun: ITargetBunState;
};