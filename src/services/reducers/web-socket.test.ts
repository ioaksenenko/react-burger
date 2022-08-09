import { webSocketReducer } from '../reducers';

import {
    WS_CONNECT,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_DISCONNECT,
} from '../constants';

describe('test web socket resucer', () => {
    it('should return initial state when has been called web socket connect action', () => {
        const state = undefined;

        const action = {
            type: WS_CONNECT,
            url: 'wss://some-url',
            query: ''
        };

        const expected = {
            wsConnected: false,
            wsError: null,
            wsMessage: null
        };

        const received = webSocketReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set web socket connected to true when has been called web socket connection success action', () => {
        const state = undefined;
        const event = new Event('open');

        const action = {
            type: WS_CONNECTION_SUCCESS,
            event: event
        };

        const expected = {
            wsConnected: true,
            wsError: null,
            wsMessage: null
        };

        const received = webSocketReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set web socket connected to false and set web socket error when has been called web socket connection error action', () => {
        const state = undefined;
        const event = new Event('error');

        const action = {
            type: WS_CONNECTION_ERROR,
            event: event
        };

        const expected = {
            wsConnected: false,
            wsError: event,
            wsMessage: null
        };

        const received = webSocketReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set web socket connected to false when has been called web socket connection closed action', () => {
        const state = undefined;
        const event = new CloseEvent('close');

        const action = {
            type: WS_CONNECTION_CLOSED,
            event: event
        };

        const expected = {
            wsConnected: false,
            wsError: null,
            wsMessage: null
        };

        const received = webSocketReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set web socket message when has been called web socket get message action', () => {
        const state = undefined;
        const message = {
            orders: [{
                createdAt: "2022-06-28T01:25:27.746Z",
                ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cc', '60d3b41abdacab0026a733cd'],
                name: "Space флюоресцентный spicy бургер",
                number: 18669,
                status: "done",
                updatedAt: "2022-06-28T01:25:27.916Z",
                _id: "62ba588742d34a001c270c46"
            }],
            success: true,
            total: 22282,
            totalToday: 101
        };

        const action = {
            type: WS_GET_MESSAGE,
            message
        };

        const expected = {
            wsConnected: true,
            wsError: null,
            wsMessage: message
        };

        const received = webSocketReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set web socket connected to false when has been called web socket disconnect action', () => {
        const state = undefined;

        const action = {
            type: WS_DISCONNECT
        };

        const expected = {
            wsConnected: false,
            wsError: null,
            wsMessage: null
        };

        const received = webSocketReducer(state, action);

        expect(received).toEqual(expected);
    });
});