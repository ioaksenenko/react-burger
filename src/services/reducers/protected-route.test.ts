import { protectedRouteReducer } from '../reducers';

import {
    ALLOW_ROUTE,
    FORBID_ALL
} from '../constants';

describe('test protected route resucer', () => {
    it('should allow passed route even if state is undefined', () => {
        const state = undefined;

        const action = {
            type: ALLOW_ROUTE, 
            path: '/profile'
        };

        const expected = {
            '/profile': true
        };

        const received = protectedRouteReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should change allowed route if state has other one', () => {
        const state = {
            '/profile': true
        };

        const action = {
            type: ALLOW_ROUTE,
            path: '/feed'
        };

        const expected = {
            '/feed': true
        };

        const received = protectedRouteReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should clear allowed route if has been called forbid all', () => {
        const state = {
            '/profile': true
        };

        const action = {
            type: FORBID_ALL
        };

        const expected = {};

        const received = protectedRouteReducer(state, action);

        expect(received).toEqual(expected);
    });
});