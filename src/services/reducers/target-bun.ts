import { SET_BUN_STATE, ITargetBunStateAction } from "../actions/target-bun";

const initialState = {
    isOver: false,
    canDrop: false
};

interface ITargetBunReducer {
    (state: ITargetBunState, action: ITargetBunStateAction): void;
};

export const targetBunReducer: ITargetBunReducer = (state = initialState, action) => {
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