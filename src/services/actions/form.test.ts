import {
    setValue,
    clearForm
} from '../actions';

import {
    SET_VALUE,
    CLEAR_FORM
} from '../constants';

import { LOGIN_URL } from '../../utils/urls';

describe('test form action creators', () => {
    it('should create an action with type SET_VALUE and params url, field and value', () => {
        const url = LOGIN_URL;
        const field = 'email';
        const value = 'ioaksenenko@gmail.com';

        const expectedAction = {
            type: SET_VALUE,
            url,
            field,
            value
        };
      
        expect(setValue(url, field, value)).toEqual(expectedAction);
    });

    it('should create an action with type CLEAR_FORM and param are url', () => {
        const url = LOGIN_URL;

        const expectedAction = {
            type: CLEAR_FORM,
            url
        };
      
        expect(clearForm(url)).toEqual(expectedAction);
    });
});