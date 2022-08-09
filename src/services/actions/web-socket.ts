import {
    WS_CONNECT,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_DISCONNECT,
} from '../constants';

import { TWSMessage } from '../types';

export interface IWSConnectAction {
    readonly type: typeof WS_CONNECT;
    readonly url: string,
    readonly query?: string
};

export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly event: Event;
};

export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly event: Event;
};

export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly event: CloseEvent
};

export interface IWSGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly message: TWSMessage;
};

export interface IWSSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly message: TWSMessage;
};

export interface IWSDisconnectAction {
    readonly type: typeof WS_DISCONNECT;
};

export type TWebSocketActions = 
    | IWSConnectAction
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSGetMessageAction
    | IWSSendMessageAction
    | IWSDisconnectAction;

export const wsConnect = (url: string, query: string = ''): IWSConnectAction => ({
    type: WS_CONNECT,
    url,
    query
});

export const wsConnectionSuccess = (event: Event): IWSConnectionSuccessAction => ({
    type: WS_CONNECTION_SUCCESS,
    event
});

export const wsConnectionError = (event: Event): IWSConnectionErrorAction => ({
    type: WS_CONNECTION_ERROR,
    event
});

export const wsConnectionClosed = (event: CloseEvent): IWSConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSED,
    event
});

export const wsGetMessage = (message: TWSMessage): IWSGetMessageAction => ({
    type: WS_GET_MESSAGE,
    message
});

export const wsSendMessage = (message: TWSMessage): IWSSendMessageAction => ({
    type: WS_SEND_MESSAGE,
    message
});

export const wsDisconnect = (): IWSDisconnectAction => ({
    type: WS_DISCONNECT
});