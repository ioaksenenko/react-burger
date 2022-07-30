import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_DISCONNECT,
} from '../constants';

import { TWebSocketActions } from '../actions';

import { IWebSocketState } from '../types';

const initialState: IWebSocketState = {
    wsConnected: false,
    wsError: null,
    wsMessage: null
};

export const webSocketReducer = (
    state: IWebSocketState = initialState, 
    action: TWebSocketActions
): IWebSocketState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
                wsError: null
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                wsError: action.event
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };
        case WS_GET_MESSAGE:
            return {
                ...state,
                wsError: null,
                wsMessage: {...action.message}
            };
        case WS_DISCONNECT:
            return {
                ...state,
                wsConnected: false,
                wsError: null
            };
        default:
            return state;
    }
};