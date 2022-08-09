import { targetBunReducer } from '../reducers';

import { SET_BUN_STATE } from '../constants';

describe('test target bun resucer', () => {
    it('should set target bun state even if the state is undefined', () => {
        const state = undefined;

        const action = {
            type: SET_BUN_STATE, 
            state: {
                isOver: true,
                canDrop: true
            }
        };

        const expected = {
            isOver: true,
            canDrop: true
        };

        const received = targetBunReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should replace target bun state if other target bun state already is set', () => {
        const state = {
            isOver: true,
            canDrop: true
        };

        const action = {
            type: SET_BUN_STATE, 
            state: {
                isOver: false,
                canDrop: true
            }
        };

        const expected = {
            isOver: false,
            canDrop: true
        };

        const received = targetBunReducer(state, action);

        expect(received).toEqual(expected);
    });
});