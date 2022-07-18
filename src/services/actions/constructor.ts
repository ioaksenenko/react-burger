export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DEL_INGREDIENT = 'DEL_INGREDIENT';
export const SET_INGREDIENT = 'SET_INGREDIENT';
export const SET_INGREDIENT_IS_DRAG = 'SET_INGREDIENT_IS_DRAG';
export const CLEAR_CART = 'CLEAR_CART';

export interface IConstructorAction {
    type: 'ADD_INGREDIENT' | 'DEL_INGREDIENT' | 'SET_INGREDIENT' | 'SET_INGREDIENT_IS_DRAG' | 'CLEAR_CART';
    ingredient: TIngredient;
    index: number;
    uuid: string;
    isDrag: boolean;
}

export const addIngredient = (ingredient: TIngredient, index: number = 0) => ({
    type: ADD_INGREDIENT,
    ingredient, index
});

export const delIngredient = (uuid: string) => ({
    type: DEL_INGREDIENT,
    uuid
});

export const setIngredientIsDrag = (isDrag: boolean) => ({
    type: SET_INGREDIENT_IS_DRAG,
    isDrag
});

export const setIngredient = (ingredient: TIngredient) => ({
    type: SET_INGREDIENT,
    ingredient
});

export const clearCart = () => ({
    type: CLEAR_CART
});