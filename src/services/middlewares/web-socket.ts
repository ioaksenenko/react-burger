import type { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from '../../utils/cookie';
import { refreshToken } from '../../utils/axios';

import type {
    TAppDispatch, 
    TRootState, 
    TResponseDataDefault, 
    TResponseErrorDefault,
    TWSActions
} from '../types';

const RECONNECT_PERIOD = 3000;

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
        let isConnected = false;
        let reconnectTimer: number = 0;
        let url: string = '';
        let query: string = '';
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
                url = action.url;
                query = action.query;
            }
        
            if (socket) {
                isConnected = true;

                socket.onopen = event => {
                    dispatch(onOpen(event));
                };
          
                socket.onerror = event => {
                    dispatch(onError(event));
                };
          
                socket.onmessage = async event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    if (!parsedData.success && parsedData.message === 'Invalid or missing token') {
                        await refreshToken();
                        const accessToken = getCookie('accessToken');
                        const searchParams = new URLSearchParams(query);
                        if (accessToken) {
                            searchParams.set('token', accessToken);
                        }
                        dispatch(onConnect(url, searchParams.toString()));
                    } else {
                        dispatch(onGetMessage(parsedData));
                    }
                };
          
                socket.onclose = event => {
                    dispatch(onClose(event));
                    if (!isConnected) {
						reconnectTimer = window.setTimeout(() => {
							dispatch(onConnect(url, query));
						}, RECONNECT_PERIOD);
					}
                };
                
                if (onSendMessage(action.message).type === action.type) {
                    socket.send(JSON.stringify(action.message));
                }

                if (onDisconnect().type === action.type) {
                    socket.close();
                    socket = null;
                    clearTimeout(reconnectTimer);
                    isConnected = false;
                    reconnectTimer = 0;
                }
            }

            next(action);
        };
    };
};