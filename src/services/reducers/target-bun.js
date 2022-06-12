import { SET_BUN_STATE } from "../actions/target-bun";

const initialState = {};

export const targetBunReducer = (state = initialState, action) => {
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