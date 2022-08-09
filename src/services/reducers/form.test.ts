import { formReducer } from '../reducers';

import {
    SET_VALUE,
    CLEAR_FORM
} from '../constants';

describe('test form resucer', () => {
    it('should set field value even if the state is undefined', () => {
        const state = undefined;

        const action = {
            type: SET_VALUE, 
            url: '/login',
            field: 'email',
            value: 'ioaksenenko@gmail.com'
        };

        const expected = {
            '/login': {
                data: {
                    email: 'ioaksenenko@gmail.com'
                }
            }
        };

        const received = formReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set field value and not change other field values', () => {
        const state = {
            '/login': {
                data: {
                    email: 'ioaksenenko@gmail.com'
                }
            }
        };

        const action = {
            type: SET_VALUE, 
            url: '/login',
            field: 'password',
            value: 'qwerty'
        };

        const expected = {
            '/login': {
                data: {
                    email: 'ioaksenenko@gmail.com',
                    password: 'qwerty'
                }
            }
        };

        const received = formReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set field value and not change other form values', () => {
        const state = {
            '/login': {
                data: {
                    email: 'ioaksenenko@gmail.com',
                    password: 'qwerty'
                }
            }
        };

        const action = {
            type: SET_VALUE, 
            url: '/register',
            field: 'name',
            value: 'ivan aksenenko'
        };

        const expected = {
            '/login': {
                data: {
                    email: 'ioaksenenko@gmail.com',
                    password: 'qwerty'
                }
            },
            '/register': {
                data: {
                    name: 'ivan aksenenko'
                }
            }
        };

        const received = formReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should return init state if trying clear form and state is undefined', () => {
        const state = undefined;

        const action = {
            type: CLEAR_FORM,
            url: '/login'
        };

        const expected = {
            '/login': {
                data: {}
            }
        };

        const received = formReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should clear form by passed url but not change other forms', () => {
        const state = {
            '/login': {
                data: {
                    email: 'ioaksenenko@gmail.com',
                    password: 'qwerty'
                }
            },
            '/register': {
                data: {
                    name: 'ivan aksenenko'
                }
            }
        };

        const action = {
            type: CLEAR_FORM,
            url: '/login'
        };

        const expected = {
            '/login': {
                data: {}
            },
            '/register': {
                data: {
                    name: 'ivan aksenenko'
                }
            },
        };

        const received = formReducer(state, action);

        expect(received).toEqual(expected);
    });
});