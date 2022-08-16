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
    const buns = [{
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
    }, {
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
    }];

    const fillings = [{
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
    }, {
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
    }];

    const bunUUIDs = [
        '54f21fc9-f5f3-4f9a-ad66-c53f995a8551', 
        'd0b84585-f7c8-4d54-ba47-e423543737bf'
    ];

    const fillingUUUIDs = [
        'f19401fe-8086-46a6-b635-45d43807ef45',
        'ba280de7-a5bc-4bd9-9a3e-a32aad1b8bdb'
    ];

    const bunsWithUUIDs = buns.map((bun, i) => ({...bun, uuid: bunUUIDs[i]}));

    const fillingsWithUUIDs = fillings.map((filling, i) => ({...filling, uuid: fillingUUUIDs[i]}));

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should add ingredient when state is undefined', () => {
        mockedUUID.mockImplementation(() => bunUUIDs[0]);

        const state = undefined;

        const action = {
            type: ADD_INGREDIENT, 
            ingredient: buns[0],
            index: 0
        };

        const expected = {
            cart: [bunsWithUUIDs[0]],
            ingredientIsDrag: false,
            ingredient: null
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should add ingredient and not change existing data in the state', () => {
        mockedUUID.mockImplementation(() => fillingUUUIDs[0]);

        const state = {
            cart: [],
            ingredientIsDrag: true,
            ingredient: buns[0]
        };

        const action = {
            type: ADD_INGREDIENT, 
            ingredient: fillings[0],
            index: 0
        };

        const expected = {
            ...state,
            cart: [fillingsWithUUIDs[0]]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should replace the bun', () => {
        mockedUUID.mockImplementation(() => bunUUIDs[1]);

        const state = {
            cart: [bunsWithUUIDs[0]],
            ingredientIsDrag: false,
            ingredient: null
        };

        const action = {
            type: ADD_INGREDIENT, 
            ingredient: buns[1],
            index: 0
        };

        const expected = {
            ...state,
            cart: [bunsWithUUIDs[1]]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should add ingredient to cart before first one', () => {
        mockedUUID.mockImplementation(() => fillingUUUIDs[1]);

        const state = {
            cart: [fillingsWithUUIDs[0]],
            ingredientIsDrag: false,
            ingredient: null
        };

        const action = {
            type: ADD_INGREDIENT, 
            ingredient: fillings[1],
            index: 0
        };

        const expected = {
            ...state,
            cart: [
                fillingsWithUUIDs[1], 
                ...state.cart
            ]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should add ingredient to cart after first one', () => {
        mockedUUID.mockImplementation(() => fillingUUUIDs[1]);

        const state = {
            cart: [fillingsWithUUIDs[0]],
            ingredientIsDrag: false,
            ingredient: null
        };

        const action = {
            type: ADD_INGREDIENT, 
            ingredient: fillings[1],
            index: 1
        };

        const expected = {
            ...state,
            cart: [
                ...state.cart,
                fillingsWithUUIDs[1]
            ]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should not add a bun if it is already exist to cart with same id', () => {
        mockedUUID.mockImplementation(() => bunUUIDs[1]);

        const state = {
            cart: [
                bunsWithUUIDs[0], 
                fillingsWithUUIDs[0]
            ],
            ingredientIsDrag: false,
            ingredient: null
        };

        const action = {
            type: ADD_INGREDIENT, 
            ingredient: buns[0],
            index: 0
        };

        const expected = {
            ...state
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should add filling even if it is already exist to cart with same id', () => {
        mockedUUID.mockImplementation(() => fillingUUUIDs[1]);

        const state = {
            cart: [
                bunsWithUUIDs[0], 
                fillingsWithUUIDs[0]
            ],
            ingredientIsDrag: false,
            ingredient: null
        };

        const action = {
            type: ADD_INGREDIENT, 
            ingredient: fillings[0],
            index: 1
        };

        const expected = {
            ...state,
            cart: [
                bunsWithUUIDs[0], {
                    ...fillings[0],
                    uuid: fillingUUUIDs[1]
                },
                fillingsWithUUIDs[0]
            ]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should return init state when trying delete ingredient where state is undefined', () => {
        const state = undefined;

        const action = {
            type: DEL_INGREDIENT, 
            uuid: bunUUIDs[0]
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
        const state = {
            cart: [bunsWithUUIDs[0]],
            ingredientIsDrag: false,
            ingredient: null
        };

        const action = {
            type: DEL_INGREDIENT, 
            uuid: bunUUIDs[0]
        };

        const expected = {
            ...state,
            cart: []
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should delete ingredient by passed uuid and leave all other ingredients unchanged', () => {
        const state = {
            cart: [
                bunsWithUUIDs[0], 
                fillingsWithUUIDs[0]
            ],
            ingredientIsDrag: false,
            ingredient: null
        };

        const action = {
            type: DEL_INGREDIENT, 
            uuid: bunUUIDs[0]
        };

        const expected = {
            ...state,
            cart: [
                fillingsWithUUIDs[0]
            ]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should delete ingredient and leave other state data unchanged', () => {
        const state = {
            cart: [
                bunsWithUUIDs[0], 
                fillingsWithUUIDs[0]
            ],
            ingredientIsDrag: true,
            ingredient: fillings[1]
        };

        const action = {
            type: DEL_INGREDIENT, 
            uuid: bunUUIDs[0]
        };

        const expected = {
            ...state,
            cart: [
                fillingsWithUUIDs[0]
            ]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should not change state if uuid of the ingredient to be removed does not exists to cart', () => {
        const state = {
            cart: [bunsWithUUIDs[0]],
            ingredientIsDrag: true,
            ingredient: fillings[0]
        };

        const action = {
            type: DEL_INGREDIENT, 
            uuid: bunUUIDs[1]
        };

        const expected = {
            ...state
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set ingredient even if state is undefined', () => {
        const state = undefined;

        const action = {
            type: SET_INGREDIENT, 
            ingredient: fillings[0]
        };

        const expected = {
            cart: [],
            ingredientIsDrag: false,
            ingredient: fillings[0]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should replace ingredient if it is already set', () => {
        const state = {
            cart: [],
            ingredientIsDrag: false,
            ingredient: buns[0]
        };

        const action = {
            type: SET_INGREDIENT, 
            ingredient: buns[1]
        };

        const expected = {
            ...state,
            ingredient: buns[1]
        };

        const received = constructorReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should not change other state data when set ingredient', () => {
        const state = {
            cart: [bunsWithUUIDs[0]],
            ingredientIsDrag: true,
            ingredient: null
        };

        const action = {
            type: SET_INGREDIENT, 
            ingredient: fillings[0]
        };

        const expected = {
            ...state,
            ingredient: fillings[0]
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
            cart: [bunsWithUUIDs[0]],
            ingredientIsDrag: false,
            ingredient: fillings[0]
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
            cart: [bunsWithUUIDs[0]],
            ingredientIsDrag: true,
            ingredient: fillings[0]
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