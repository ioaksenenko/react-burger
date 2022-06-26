import { SET_VALUE, CLEAR_FORM } from "../actions/form";

const initialState = { };

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VALUE: {
            return {
                ...state,
                [action.url]: {
                    data: {
                        ...(state[action.url]?.data || { }),
                        [action.field]: action.value
                    }
                }
            };
        }
        case CLEAR_FORM: {
            return {
                ...state,
                [action.url]: {
                    data: { }
                }
            };
        }
        default: {
            return state;
        }
    }
};
