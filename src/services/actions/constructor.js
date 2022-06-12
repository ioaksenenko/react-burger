export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DEL_INGREDIENT = 'DEL_INGREDIENT';
export const SET_INGREDIENT_IS_DRAG = 'SET_INGREDIENT_IS_DRAG';

export const addIngredient = (ingredient, index = 0) => ({
    type: ADD_INGREDIENT,
    ingredient, index
});

export const delIngredient = uuid => ({
    type: DEL_INGREDIENT,
    uuid
});

export const setIngredientIsDrag = isDrag => ({
    type: SET_INGREDIENT_IS_DRAG,
    isDrag
});