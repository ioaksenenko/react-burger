import { constructorReducer } from '../reducers';

import { 
    ADD_INGREDIENT, 
    DEL_INGREDIENT, 
    SET_INGREDIENT, 
    SET_INGREDIENT_IS_DRAG, 
    CLEAR_CART 
} from '../constants';

import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid');

const mockedUUID = uuidv4 as jest.Mock<ReturnType<typeof uuidv4>>;

describe('test contructor resucer', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should add ingredient when state is undefined', () => {
        mockedUUID.mockImplementation(() => '54f21fc9-f5f3-4f9a-ad66-c53f995a8551');

        const state = undefined;

        const ingredient = {
            _id: "60d3b41abdacab0026a733c6",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80, 
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0
        };

        const action = {
            type: ADD_INGREDIENT, 
            ingredient: ingredient,
            index: 0
        };

        const expected = {
            cart: [{
                ...ingredient,
                uuid: '54f21fc9-f5f3-4f9a-ad66-c53f995a8551'
            }],
            ingredientIsDrag: false,
            ingredient: null
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should add ingredient and not change existing data in the state', () => {
        mockedUUID.mockImplementation(() => '54f21fc9-f5f3-4f9a-ad66-c53f995a8551');

        const state = {
            cart: [],
            ingredientIsDrag: true,
            ingredient: {
                _id: "60d3b41abdacab0026a733c9",
                name: "Мясо бессмертных моллюсков Protostomia",
                type: "main",
                proteins: 433,
                fat: 244,
                carbohydrates: 33,
                calories: 420,
                price: 1337,
                image: "https://code.s3.yandex.net/react/code/meat-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
                __v: 0
            }
        };

        const ingredient = {
            _id: "60d3b41abdacab0026a733c6",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80, 
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0
        };

        const action = {
            type: ADD_INGREDIENT, 
            ingredient: ingredient,
            index: 0
        };

        const expected = {
            ...state,
            cart: [{
                ...ingredient,
                uuid: '54f21fc9-f5f3-4f9a-ad66-c53f995a8551'
            }]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should replace the bun', () => {
        mockedUUID.mockImplementation(() => 'd0b84585-f7c8-4d54-ba47-e423543737bf');

        const state = {
            cart: [{
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80, 
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0,
                uuid: '54f21fc9-f5f3-4f9a-ad66-c53f995a8551'
            }],
            ingredientIsDrag: false,
            ingredient: null
        };

        const ingredient = {
            _id: "60d3b41abdacab0026a733c7",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0
        };

        const action = {
            type: ADD_INGREDIENT, 
            ingredient: ingredient,
            index: 0
        };

        const expected = {
            ...state,
            cart: [{
                ...ingredient,
                uuid: 'd0b84585-f7c8-4d54-ba47-e423543737bf'
            }]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should add ingredient to cart before first one', () => {
        mockedUUID.mockImplementation(() => 'd0b84585-f7c8-4d54-ba47-e423543737bf');

        const state = {
            cart: [{
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80, 
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0,
                uuid: '54f21fc9-f5f3-4f9a-ad66-c53f995a8551'
            }],
            ingredientIsDrag: false,
            ingredient: null
        };

        const ingredient = {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0
        };

        const action = {
            type: ADD_INGREDIENT, 
            ingredient: ingredient,
            index: 0
        };

        const expected = {
            ...state,
            cart: [{
                ...ingredient,
                uuid: 'd0b84585-f7c8-4d54-ba47-e423543737bf'
            }, ...state.cart]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should add ingredient to cart after first one', () => {
        mockedUUID.mockImplementation(() => 'd0b84585-f7c8-4d54-ba47-e423543737bf');

        const state = {
            cart: [{
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80, 
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0,
                uuid: '54f21fc9-f5f3-4f9a-ad66-c53f995a8551'
            }],
            ingredientIsDrag: false,
            ingredient: null
        };

        const ingredient = {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0
        };

        const action = {
            type: ADD_INGREDIENT, 
            ingredient: ingredient,
            index: 1
        };

        const expected = {
            ...state,
            cart: [...state.cart, {
                ...ingredient,
                uuid: 'd0b84585-f7c8-4d54-ba47-e423543737bf'
            }]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should not add a bun if it is already exist to cart with same id', () => {
        mockedUUID.mockImplementation(() => 'b30446b5-6f95-4a6f-b066-2e7abf47ac39');

        const ingredient = {
            _id: "60d3b41abdacab0026a733c6",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80, 
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0
        };

        const state = {
            cart: [{
                ...ingredient,
                uuid: '54f21fc9-f5f3-4f9a-ad66-c53f995a8551'
            }, {
                _id: "60d3b41abdacab0026a733c8",
                name: "Филе Люминесцентного тетраодонтимформа",
                type: "main",
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: "https://code.s3.yandex.net/react/code/meat-03.png",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
                __v: 0,
                uuid: 'd0b84585-f7c8-4d54-ba47-e423543737bf'
            }],
            ingredientIsDrag: false,
            ingredient: null
        };

        const action = {
            type: ADD_INGREDIENT, 
            ingredient: ingredient,
            index: 0
        };

        const expected = {
            ...state
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should add filling even if it is already exist to cart with same id', () => {
        mockedUUID.mockImplementation(() => 'b30446b5-6f95-4a6f-b066-2e7abf47ac39');

        const ingredient = {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0
        };

        const state = {
            cart: [{
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80, 
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0,
                uuid: '54f21fc9-f5f3-4f9a-ad66-c53f995a8551'
            }, {
                ...ingredient,
                uuid: 'd0b84585-f7c8-4d54-ba47-e423543737bf'
            }],
            ingredientIsDrag: false,
            ingredient: null
        };

        const action = {
            type: ADD_INGREDIENT, 
            ingredient: ingredient,
            index: 1
        };

        const expected = {
            ...state,
            cart: [{
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80, 
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0,
                uuid: '54f21fc9-f5f3-4f9a-ad66-c53f995a8551'
            }, {
                ...ingredient,
                uuid: 'b30446b5-6f95-4a6f-b066-2e7abf47ac39'
            }, {
                ...ingredient,
                uuid: 'd0b84585-f7c8-4d54-ba47-e423543737bf'
            }]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should return init state when trying delete ingredient where state is undefined', () => {
        const state = undefined;

        const action = {
            type: DEL_INGREDIENT, 
            uuid: '54f21fc9-f5f3-4f9a-ad66-c53f995a8551'
        };

        const expected = {
            cart: [],
            ingredientIsDrag: false,
            ingredient: null
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should delete ingredient and set empty cart if there was only one ingredient', () => {
        const uuid = '54f21fc9-f5f3-4f9a-ad66-c53f995a8551';

        const state = {
            cart: [{
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80, 
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0,
                uuid: uuid
            }],
            ingredientIsDrag: false,
            ingredient: null
        };

        const action = {
            type: DEL_INGREDIENT, 
            uuid: uuid
        };

        const expected = {
            ...state,
            cart: []
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should delete ingredient by passed uuid and leave all other ingredients unchanged', () => {
        const uuid = '54f21fc9-f5f3-4f9a-ad66-c53f995a8551';

        const ingredient = {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0,
            uuid: 'd0b84585-f7c8-4d54-ba47-e423543737bf'
        };

        const state = {
            cart: [{
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80, 
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0,
                uuid: uuid
            }, ingredient],
            ingredientIsDrag: false,
            ingredient: null
        };

        const action = {
            type: DEL_INGREDIENT, 
            uuid: uuid
        };

        const expected = {
            ...state,
            cart: [ingredient]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should delete ingredient and leave other state data unchanged', () => {
        const uuid = '54f21fc9-f5f3-4f9a-ad66-c53f995a8551';

        const ingredient = {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0,
            uuid: 'd0b84585-f7c8-4d54-ba47-e423543737bf'
        };

        const state = {
            cart: [{
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80, 
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0,
                uuid: uuid
            }, ingredient],
            ingredientIsDrag: true,
            ingredient: {
                _id: "60d3b41abdacab0026a733c9",
                name: "Мясо бессмертных моллюсков Protostomia",
                type: "main",
                proteins: 433,
                fat: 244,
                carbohydrates: 33,
                calories: 420,
                price: 1337,
                image: "https://code.s3.yandex.net/react/code/meat-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
                __v: 0
            }
        };

        const action = {
            type: DEL_INGREDIENT, 
            uuid: uuid
        };

        const expected = {
            ...state,
            cart: [ingredient]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should not change state if uuid of the ingredient to be removed does not exists to cart', () => {
        const state = {
            cart: [{
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80, 
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0,
                uuid: '54f21fc9-f5f3-4f9a-ad66-c53f995a8551'
            }],
            ingredientIsDrag: true,
            ingredient: {
                _id: "60d3b41abdacab0026a733c9",
                name: "Мясо бессмертных моллюсков Protostomia",
                type: "main",
                proteins: 433,
                fat: 244,
                carbohydrates: 33,
                calories: 420,
                price: 1337,
                image: "https://code.s3.yandex.net/react/code/meat-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
                __v: 0
            }
        };

        const action = {
            type: DEL_INGREDIENT, 
            uuid: 'd0b84585-f7c8-4d54-ba47-e423543737bf'
        };

        const expected = {
            ...state
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set ingredient even if state is undefined', () => {
        const state = undefined;

        const ingredient = {
            _id: "60d3b41abdacab0026a733c9",
            name: "Мясо бессмертных моллюсков Protostomia",
            type: "main",
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: "https://code.s3.yandex.net/react/code/meat-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
            __v: 0
        };

        const action = {
            type: SET_INGREDIENT, 
            ingredient: ingredient
        };

        const expected = {
            cart: [],
            ingredientIsDrag: false,
            ingredient: ingredient
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should replace ingredient if it is already set', () => {
        const state = {
            cart: [],
            ingredientIsDrag: false,
            ingredient: {
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0
            }
        };

        const ingredient = {
            _id: "60d3b41abdacab0026a733c9",
            name: "Мясо бессмертных моллюсков Protostomia",
            type: "main",
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: "https://code.s3.yandex.net/react/code/meat-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
            __v: 0
        };

        const action = {
            type: SET_INGREDIENT, 
            ingredient: ingredient
        };

        const expected = {
            ...state,
            ingredient: ingredient
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should not change other state data when set ingredient', () => {
        const state = {
            cart: [{
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0,
                uuid: '54f21fc9-f5f3-4f9a-ad66-c53f995a8551'
            }],
            ingredientIsDrag: true,
            ingredient: null
        };

        const ingredient = {
            _id: "60d3b41abdacab0026a733c9",
            name: "Мясо бессмертных моллюсков Protostomia",
            type: "main",
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: "https://code.s3.yandex.net/react/code/meat-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
            __v: 0
        };

        const action = {
            type: SET_INGREDIENT, 
            ingredient: ingredient
        };

        const expected = {
            ...state,
            ingredient: ingredient
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set setIngredientIsDrag even if state is undefined', () => {
        const state = undefined;

        const action = {
            type: SET_INGREDIENT_IS_DRAG, 
            isDrag: true
        };

        const expected = {
            cart: [],
            ingredientIsDrag: true,
            ingredient: null
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should change setIngredientIsDrag if it already exists', () => {
        const state = {
            cart: [],
            ingredientIsDrag: true,
            ingredient: null
        };

        const action = {
            type: SET_INGREDIENT_IS_DRAG, 
            isDrag: false
        };

        const expected = {
            ...state,
            ingredientIsDrag: false
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should not change other state data when setting ingredientIsDrag', () => {
        const state = {
            cart: [{
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0,
                uuid: '54f21fc9-f5f3-4f9a-ad66-c53f995a8551'
            }],
            ingredientIsDrag: false,
            ingredient: {
                _id: "60d3b41abdacab0026a733c9",
                name: "Мясо бессмертных моллюсков Protostomia",
                type: "main",
                proteins: 433,
                fat: 244,
                carbohydrates: 33,
                calories: 420,
                price: 1337,
                image: "https://code.s3.yandex.net/react/code/meat-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
                __v: 0
            }
        };

        const action = {
            type: SET_INGREDIENT_IS_DRAG, 
            isDrag: true
        };

        const expected = {
            ...state,
            ingredientIsDrag: true
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should return init state if trying crear cart when state is undefined', () => {
        const state = undefined;

        const action = {
            type: CLEAR_CART
        };

        const expected = {
            cart: [],
            ingredientIsDrag: false,
            ingredient: null
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should clear cart and does not change any other state data', () => {
        const state = {
            cart: [{
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0,
                uuid: '54f21fc9-f5f3-4f9a-ad66-c53f995a8551'
            }],
            ingredientIsDrag: true,
            ingredient: {
                _id: "60d3b41abdacab0026a733c9",
                name: "Мясо бессмертных моллюсков Protostomia",
                type: "main",
                proteins: 433,
                fat: 244,
                carbohydrates: 33,
                calories: 420,
                price: 1337,
                image: "https://code.s3.yandex.net/react/code/meat-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
                __v: 0
            }
        };

        const action = {
            type: CLEAR_CART
        };

        const expected = {
            ...state,
            cart: []
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });
});