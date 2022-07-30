import { TAxiosActions } from '../actions';
import { SEND_REQUEST, SET_DATA, SET_ERROR, CLEAR_RESPONSE } from '../constants';
import { IAxiosState, TResponseDataDefault, TResponseErrorDefault } from '../types';

const initialState = { };

export const axiosReducer = <TResponseData = TResponseDataDefault, TResponseError = TResponseErrorDefault>(
    state: IAxiosState<TResponseData, TResponseError> = initialState, 
    action: TAxiosActions<TResponseData, TResponseError>
): IAxiosState<TResponseData, TResponseError> => {
    switch (action.type) {
        case SEND_REQUEST: {
            return {
                ...state,
                [action.url]: {
                    loading: true,
                    data: null,
                    error: null
                }
            };
        }
        case SET_DATA: {
            return {
                ...state,
                [action.url]: {
                    loading: false,
                    data: action.data,
                    error: null
                }
            };
        }
        case SET_ERROR: {
            return {
                ...state,
                [action.url]: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            };
        }
        case CLEAR_RESPONSE: {
            return {
                ...state,
                [action.url]: {
                    loading: false,
                    data: null,
                    error: null
                }
            };
        }
        default: {
            return state;
        }
    }
};