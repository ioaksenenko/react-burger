import {
    allowRoute,
    forbidAll
} from '../actions';

import { 
    ALLOW_ROUTE, 
    FORBID_ALL
} from '../constants';

describe('test protected route action creators', () => {
    it('should create an action with type ALLOW_ROUTE and param path', () => {
        const path = '/profile';

        const expectedAction = {
            type: ALLOW_ROUTE,
            path
        };
      
        expect(allowRoute(path)).toEqual(expectedAction);
    });

    it('should create an action with type FORBID_ALL', () => {
        const expectedAction = {
            type: FORBID_ALL
        };
      
        expect(forbidAll()).toEqual(expectedAction);
    });
});