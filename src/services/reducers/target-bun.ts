import { SET_BUN_STATE } from '../constants';
import { TTargetBunActions } from '../actions';
import { ITargetBunState } from '../types';

const initialState: ITargetBunState = {
    isOver: false,
    canDrop: false
};

export const targetBunReducer = (
    state: ITargetBunState = initialState, 
    action: TTargetBunActions
): ITargetBunState => {
    switch (action.type) {
        case SET_BUN_STATE: {
            return {
                ...action.state
            };
        }
        default: {
            return state;
        }
    }
};