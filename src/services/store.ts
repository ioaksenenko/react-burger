import { createStore } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { compose, applyMiddleware } from 'redux';
import { createWSMiddleware } from './middlewares';
import {
    wsConnect,
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetMessage,
    wsSendMessage,
    wsDisconnect
} from './actions';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const wsMiddleware = createWSMiddleware({
  onConnect: wsConnect,
  onOpen: wsConnectionSuccess,
  onError: wsConnectionError,
  onClose: wsConnectionClosed,
  onGetMessage: wsGetMessage,
  onSendMessage: wsSendMessage,
  onDisconnect: wsDisconnect
});

const enhancer = composeEnhancers(applyMiddleware(thunk, wsMiddleware));

export const store = createStore(rootReducer, enhancer);
