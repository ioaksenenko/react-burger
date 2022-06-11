import { combineReducers } from 'redux';
import { fetchReducer } from './fetch';
import { constructorReducer } from './constructor';
import { targetBunReducer } from './target-bun';
import { modalReducer } from './modal';

export const rootReducer = combineReducers({
    fetch: fetchReducer,
    con: constructorReducer,
    bun: targetBunReducer,
    modal: modalReducer
});