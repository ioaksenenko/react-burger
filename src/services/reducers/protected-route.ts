import { ALLOW_ROUTE, FORBID_ALL } from '../constants';
import { TProtectedRouteActions } from '../actions';
import { IRouteState } from '../types';

const initialState = { };

export const protectedRouteReducer = (
    state: IRouteState = initialState, 
    action: TProtectedRouteActions
): IRouteState => {
    switch (action.type) {
        case ALLOW_ROUTE: {
            return {
                [action.path]: true
            };
        }
        case FORBID_ALL: {
            return { };
        }
        default: {
            return state;
        }
    }
};
