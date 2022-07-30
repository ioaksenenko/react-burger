import { SET_VALUE, CLEAR_FORM } from '../constants';
import { TFormActions } from '../actions';
import { IFormState } from '../types';

const initialState = { };

export const formReducer = (
    state: IFormState = initialState, 
    action: TFormActions
): IFormState => {
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
