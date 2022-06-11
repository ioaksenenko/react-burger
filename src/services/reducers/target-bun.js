import { SET_BUN_HOVER } from "../actions/target-bun";

const initialState = {
    bunHover: false
};

export const targetBunReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUN_HOVER: {
            return {
                bunHover: action.bunHover
            };
        }
        default: {
            return state;
        }
    }
};