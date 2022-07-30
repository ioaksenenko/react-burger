import { SET_BUN_STATE } from '../constants';
import { ITargetBunState } from '../types';

export interface ISetBunStateAction {
    readonly type: typeof SET_BUN_STATE;
    readonly state: ITargetBunState;
};

export type TTargetBunActions = ISetBunStateAction;

export const setBunState = (state: ITargetBunState): ISetBunStateAction => ({
    type: SET_BUN_STATE,
    state
});