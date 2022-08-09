import {
    addIngredient,
    delIngredient,
    setIngredient,
    setIngredientIsDrag,
    clearCart
} from '../actions';

import {
    ADD_INGREDIENT,
    DEL_INGREDIENT,
    SET_INGREDIENT,
    SET_INGREDIENT_IS_DRAG,
    CLEAR_CART
} from '../constants';

import { TIngredient } from '../types';

describe('test constructor action creators', () => {
    it('should create an action with type ADD_INGREDIENT and params ingredient and index', () => {
        const ingredient: TIngredient = {
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
        };
        const index = 1;
      
        const expectedAction = {
            type: ADD_INGREDIENT,
            ingredient,
            index
        };
      
        expect(addIngredient(ingredient, index)).toEqual(expectedAction);
    });

    it('should create an action with type DEL_INGREDIENT and param uuid', () => {
        const uuid = '54f21fc9-f5f3-4f9a-ad66-c53f995a8551';
      
        const expectedAction = {
            type: DEL_INGREDIENT,
            uuid
        };
      
        expect(delIngredient(uuid)).toEqual(expectedAction);
    });

    it('should create an action with type SET_INGREDIENT and param ingredient', () => {
        const ingredient: TIngredient = {
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
        };
      
        const expectedAction = {
            type: SET_INGREDIENT,
            ingredient
        };
      
        expect(setIngredient(ingredient)).toEqual(expectedAction);
    });

    it('should create an action with type SET_INGREDIENT_IS_DRAG and param isDrag', () => {
        const isDrag = true;
      
        const expectedAction = {
            type: SET_INGREDIENT_IS_DRAG,
            isDrag
        };
      
        expect(setIngredientIsDrag(isDrag)).toEqual(expectedAction);
    });

    it('should create an action with type CLEAR_CART', () => {
        const expectedAction = {
            type: CLEAR_CART
        };
      
        expect(clearCart()).toEqual(expectedAction);
    });
});