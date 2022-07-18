export const SET_BUN_STATE = 'SET_BUN_STATE';

export interface ITargetBunStateAction {
    type: 'SET_BUN_STATE';
    state: ITargetBunState;
};

export const setBunState = (state: ITargetBunState) => ({
    type: SET_BUN_STATE,
    state
});