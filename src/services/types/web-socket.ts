import {
    wsConnect,
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetMessage,
    wsSendMessage,
    wsDisconnect
} from '../actions';

export type TOrder = {
    readonly createdAt: string;
    readonly ingredients: ReadonlyArray<string>;
    readonly name: string;
    readonly number: number;
    readonly status: string;
    readonly updatedAt: string;
    readonly _id: string;
};

export type TWSMessage = {
    readonly orders: ReadonlyArray<TOrder>,
    readonly success: boolean,
    readonly total: number,
    readonly totalToday: number
};

export type TWSActions = {
    readonly onConnect: typeof wsConnect;
    readonly onOpen: typeof wsConnectionSuccess;
    readonly onError: typeof wsConnectionError;
    readonly onClose: typeof wsConnectionClosed;
    readonly onGetMessage: typeof wsGetMessage;
    readonly onSendMessage: typeof wsSendMessage;
    readonly onDisconnect: typeof wsDisconnect;
};

export interface IWebSocketState {
    readonly wsConnected: boolean;
    readonly wsError: Event | null;
    readonly wsMessage: TWSMessage | null;
};