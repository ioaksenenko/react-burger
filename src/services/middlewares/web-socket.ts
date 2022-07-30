import type { Middleware, MiddlewareAPI } from 'redux';

import type {
    TAppDispatch, 
    TRootState, 
    TResponseDataDefault, 
    TResponseErrorDefault,
    TWSActions
} from '../types';

export const createWSMiddleware = <
    TResponseData = TResponseDataDefault, 
    TResponseError = TResponseErrorDefault
>(
    wsActions: TWSActions
): Middleware => {
    return (store: MiddlewareAPI<
        TAppDispatch<TResponseData, TResponseError>, 
        TRootState<TResponseData, TResponseError>
    >) => {
        let socket: WebSocket | null = null;
        return next => action => {
            const { dispatch } = store;
            
            const {
                onConnect,
                onOpen,
                onError,
                onClose,
                onGetMessage,
                onSendMessage,
                onDisconnect
            } = wsActions;
        
            if (onConnect(action.url, action.query).type === action.type) {
                socket = new WebSocket(`${action.url}?${action.query}`);
            }
        
            if (socket) {
                socket.onopen = event => {
                    dispatch(onOpen(event));
                };
          
                socket.onerror = event => {
                    dispatch(onError(event));
                };
          
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(onGetMessage(parsedData));
                };
          
                socket.onclose = event => {
                    dispatch(onClose(event));
                };
                
                if (onSendMessage(action.message).type === action.type) {
                    socket.send(JSON.stringify(action.message));
                }

                if (onDisconnect().type === action.type) {
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        };
    };
};