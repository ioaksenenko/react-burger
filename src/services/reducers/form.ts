import { SET_VALUE, CLEAR_FORM, IFormAction } from "../actions/form";

const initialState = { };

interface IFormReducer {
    (state: IFormState, action: IFormAction): void;
};

export const formReducer : IFormReducer = (state = initialState, action) => {
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
