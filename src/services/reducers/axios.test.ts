import { axiosReducer } from '../reducers';

import {
    SEND_REQUEST,
    SET_DATA,
    SET_ERROR,
    CLEAR_RESPONSE
} from '../constants';

import { INGREDIENTS_URL } from '../../utils/urls';

describe('test axios resucer', () => {
    it('should handle SEND_REQUEST when state is empty', () => {
        const state = undefined;

        const action = {
            type: SEND_REQUEST, 
            url: INGREDIENTS_URL
        };

        const expected = {
            [INGREDIENTS_URL]: {
                loading: true,
                data: null,
                error: null
            }
        };

        const received = axiosReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should handle SEND_REQUEST when state is not empty', () => {
        const state = {
            '/some-url': {
                loading: true,
                data: null,
                error: null
            }
        };

        const action = {
            type: SEND_REQUEST, 
            url: INGREDIENTS_URL
        };

        const expected = {
            '/some-url': {
                loading: true,
                data: null,
                error: null
            },
            [INGREDIENTS_URL]: {
                loading: true,
                data: null,
                error: null
            }
        };

        const received = axiosReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should handle SET_DATA when state is empty', () => {
        const state = undefined;
        
        const action = {
            type: SET_DATA, 
            url: INGREDIENTS_URL,
            data: {
                success: true,
                data: [{
                    calories: 420,
                    carbohydrates: 53,
                    fat: 24,
                    image: "https://code.s3.yandex.net/react/code/bun-02.png",
                    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                    name: "Краторная булка N-200i",
                    price: 1255,
                    proteins: 80,
                    type: "bun",
                    __v: 0,
                    _id: "60d3b41abdacab0026a733c6"
                }]
            }
        };

        const expected = {
            [INGREDIENTS_URL]: {
                loading: false,
                data: {
                    success: true,
                    data: [{
                        calories: 420,
                        carbohydrates: 53,
                        fat: 24,
                        image: "https://code.s3.yandex.net/react/code/bun-02.png",
                        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                        name: "Краторная булка N-200i",
                        price: 1255,
                        proteins: 80,
                        type: "bun",
                        __v: 0,
                        _id: "60d3b41abdacab0026a733c6"
                    }]
                },
                error: null
            }
        };

        const received = axiosReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should handle SET_DATA when state is not empty', () => {
        const state = {
            '/some-url': {
                loading: false,
                data: {
                    success: true,
                    data: []
                },
                error: null
            }
        };
        
        const action = {
            type: SET_DATA, 
            url: INGREDIENTS_URL,
            data: {
                success: true,
                data: [{
                    calories: 420,
                    carbohydrates: 53,
                    fat: 24,
                    image: "https://code.s3.yandex.net/react/code/bun-02.png",
                    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                    name: "Краторная булка N-200i",
                    price: 1255,
                    proteins: 80,
                    type: "bun",
                    __v: 0,
                    _id: "60d3b41abdacab0026a733c6"
                }]
            }
        };

        const expected = {
            '/some-url': {
                loading: false,
                data: {
                    success: true,
                    data: []
                },
                error: null
            },
            [INGREDIENTS_URL]: {
                loading: false,
                data: {
                    success: true,
                    data: [{
                        calories: 420,
                        carbohydrates: 53,
                        fat: 24,
                        image: "https://code.s3.yandex.net/react/code/bun-02.png",
                        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                        name: "Краторная булка N-200i",
                        price: 1255,
                        proteins: 80,
                        type: "bun",
                        __v: 0,
                        _id: "60d3b41abdacab0026a733c6"
                    }]
                },
                error: null
            }
        };

        const received = axiosReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should handle SET_ERROR when state is empty', () => {
        const state = undefined;
        
        const action = {
            type: SET_ERROR, 
            url: INGREDIENTS_URL,
            error: {
                success: false,
                message: 'some error message'
            }
        };

        const expected = {
            [INGREDIENTS_URL]: {
                loading: false,
                data: null,
                error: {
                    success: false,
                    message: 'some error message'
                }
            }
        };

        const received = axiosReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should handle SET_ERROR when state is not empty', () => {
        const state = {
            '/some-url': {
                loading: false,
                data: null,
                error: {
                    success: false,
                    message: 'some error message'
                }
            }
        };
        
        const action = {
            type: SET_ERROR, 
            url: INGREDIENTS_URL,
            error: {
                success: false,
                message: 'some error message'
            }
        };

        const expected = {
            '/some-url': {
                loading: false,
                data: null,
                error: {
                    success: false,
                    message: 'some error message'
                }
            },
            [INGREDIENTS_URL]: {
                loading: false,
                data: null,
                error: {
                    success: false,
                    message: 'some error message'
                }
            }
        };

        const received = axiosReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should handle CLEAR_RESPONSE when state has only cleared url', () => {
        const state = {
            [INGREDIENTS_URL]: {
                loading: false,
                data: {
                    success: true,
                    data: [{
                        calories: 420,
                        carbohydrates: 53,
                        fat: 24,
                        image: "https://code.s3.yandex.net/react/code/bun-02.png",
                        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                        name: "Краторная булка N-200i",
                        price: 1255,
                        proteins: 80,
                        type: "bun",
                        __v: 0,
                        _id: "60d3b41abdacab0026a733c6"
                    }]
                },
                error: null
            }
        };
        
        const action = {
            type: CLEAR_RESPONSE, 
            url: INGREDIENTS_URL
        };

        const expected = {
            [INGREDIENTS_URL]: {
                loading: false,
                data: null,
                error: null
            }
        };

        const received = axiosReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should handle CLEAR_RESPONSE when state has other url', () => {
        const state = {
            '/some-url': {
                loading: false,
                data: null,
                error: {
                    success: false,
                    message: 'some error message'
                }
            },
            [INGREDIENTS_URL]: {
                loading: false,
                data: {
                    success: true,
                    data: [{
                        calories: 420,
                        carbohydrates: 53,
                        fat: 24,
                        image: "https://code.s3.yandex.net/react/code/bun-02.png",
                        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                        name: "Краторная булка N-200i",
                        price: 1255,
                        proteins: 80,
                        type: "bun",
                        __v: 0,
                        _id: "60d3b41abdacab0026a733c6"
                    }]
                },
                error: null
            }
        };
        
        const action = {
            type: CLEAR_RESPONSE, 
            url: INGREDIENTS_URL
        };

        const expected = {
            '/some-url': {
                loading: false,
                data: null,
                error: {
                    success: false,
                    message: 'some error message'
                }
            },
            [INGREDIENTS_URL]: {
                loading: false,
                data: null,
                error: null
            }
        };

        const received = axiosReducer(state, action);

        expect(received).toEqual(expected);
    });
});