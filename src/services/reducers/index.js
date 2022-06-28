import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { targetBunReducer } from './target-bun';
import { modalReducer } from './modal';
import { formReducer } from './form';
import { axiosReducer } from './axios';
import { protectedRouteReducer } from './protected-route';

export const rootReducer = combineReducers({
    con: constructorReducer,
    bun: targetBunReducer,
    modal: modalReducer,
    form: formReducer,
    axios: axiosReducer,
    route: protectedRouteReducer,
});