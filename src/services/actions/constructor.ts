import { 
    ADD_INGREDIENT, 
    DEL_INGREDIENT, 
    SET_INGREDIENT, 
    SET_INGREDIENT_IS_DRAG, 
    CLEAR_CART 
} from "../constants";
import { TIngredient } from '../types';

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly ingredient: TIngredient;
    readonly index: number;
};

export interface IDelIngredientAction {
    readonly type: typeof DEL_INGREDIENT;
    readonly uuid: string;
};

export interface ISetIngredientAction {
    readonly type: typeof SET_INGREDIENT;
    readonly ingredient: TIngredient;
};

export interface ISetIngredientIsDragAction {
    readonly type: typeof SET_INGREDIENT_IS_DRAG;
    readonly isDrag: boolean;
};

export interface IClearCartAction {
    readonly type: typeof CLEAR_CART;
};

export type TConstructorActions = 
    | IAddIngredientAction
    | IDelIngredientAction
    | ISetIngredientAction
    | ISetIngredientIsDragAction
    | IClearCartAction;

export const addIngredient = (ingredient: TIngredient, index: number = 0): IAddIngredientAction => ({
    type: ADD_INGREDIENT,
    ingredient, 
    index
});

export const delIngredient = (uuid: string): IDelIngredientAction => ({
    type: DEL_INGREDIENT,
    uuid
});

export const setIngredient = (ingredient: TIngredient): ISetIngredientAction => ({
    type: SET_INGREDIENT,
    ingredient
});

export const setIngredientIsDrag = (isDrag: boolean): ISetIngredientIsDragAction => ({
    type: SET_INGREDIENT_IS_DRAG,
    isDrag
});

export const clearCart = (): IClearCartAction => ({
    type: CLEAR_CART
});