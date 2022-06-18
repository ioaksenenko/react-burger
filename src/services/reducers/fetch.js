import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILED } from '../actions/fetch';

const initialState = {};

export const fetchReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST: {
            return {
                ...state,
                [action.url]: {
                    data: null,
                    error: null,
                    loading: true
                }
            };
        }
        case FETCH_SUCCESS: {
            return {
                ...state,
                [action.url]: {
                    data: action.data,
                    error: null,
                    loading: false
                }  
            };
        }
        case FETCH_FAILED: {
            return {
                ...state,
                [action.url]: {
                    data: null,
                    error: action.error,
                    loading: false
                }
            };
        }
        default: {
            return state;
        }
    }
};