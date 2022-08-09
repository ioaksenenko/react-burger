import {
    setBunState
} from '../actions';

import { 
    SET_BUN_STATE
} from '../constants';

describe('test target bun action creators', () => {
    it('should create an action with type SET_BUN_STATE and param state', () => {
        const state = {
            isOver: false,
            canDrop: true
        };

        const expectedAction = {
            type: SET_BUN_STATE,
            state
        };
      
        expect(setBunState(state)).toEqual(expectedAction);
    });
});