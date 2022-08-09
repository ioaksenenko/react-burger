import {
    wsConnect,
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetMessage,
    wsSendMessage,
    wsDisconnect
} from '../actions';

import { 
    WS_CONNECT,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_DISCONNECT
} from '../constants';

import {
    WS_ORDERS_USER_URL
} from '../../utils/urls';

describe('test web socket action creators', () => {
    it('should create an action with type WS_CONNECT and param url and query', () => {
        const url = WS_ORDERS_USER_URL;
        const query = `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjkzNDllNDJkMzRhMDAxYzI3MDk1MiIsImlhdCI6MTY1OTg2NDc0OCwiZXhwIjoxNjU5ODY1OTQ4fQ.soJH9Yd4GTrAiRQHR7SeZUguWGCWVrdkxfv64haLbNg`;

        const expectedAction = {
            type: WS_CONNECT,
            url,
            query
        };
      
        expect(wsConnect(url, query)).toEqual(expectedAction);
    });

    it('should create an action with type WS_CONNECTION_SUCCESS and param event', () => {
        const event = new Event('open');

        const expectedAction = {
            type: WS_CONNECTION_SUCCESS,
            event
        };
      
        expect(wsConnectionSuccess(event)).toEqual(expectedAction);
    });

    it('should create an action with type WS_CONNECTION_ERROR and param event', () => {
        const event = new Event('error');

        const expectedAction = {
            type: WS_CONNECTION_ERROR,
            event
        };
      
        expect(wsConnectionError(event)).toEqual(expectedAction);
    });

    it('should create an action with type WS_CONNECTION_CLOSED and param event', () => {
        const event = new CloseEvent('close');

        const expectedAction = {
            type: WS_CONNECTION_CLOSED,
            event
        };
      
        expect(wsConnectionClosed(event)).toEqual(expectedAction);
    });

    it('should create an action with type WS_GET_MESSAGE and param message', () => {
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

        const expectedAction = {
            type: WS_GET_MESSAGE,
            message
        };
      
        expect(wsGetMessage(message)).toEqual(expectedAction);
    });

    it('should create an action with type WS_SEND_MESSAGE and param message', () => {
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

        const expectedAction = {
            type: WS_SEND_MESSAGE,
            message
        };
      
        expect(wsSendMessage(message)).toEqual(expectedAction);
    });

    it('should create an action with type WS_DISCONNECT', () => {
        const expectedAction = {
            type: WS_DISCONNECT
        };
      
        expect(wsDisconnect()).toEqual(expectedAction);
    });
});