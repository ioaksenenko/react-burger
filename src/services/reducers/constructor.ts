import { 
    ADD_INGREDIENT, DEL_INGREDIENT, SET_INGREDIENT,
    SET_INGREDIENT_IS_DRAG, CLEAR_CART, IConstructorAction
} from '../actions/constructor';
import { v4 as uuidv4 } from 'uuid';
import { addByIndexOrChangePosition } from '../../utils/constructor';

const initialState : IConstructorState = {
    cart: [],
    ingredientIsDrag: false,
    ingredient: null
};

interface IConstructorReducer {
    (state: IConstructorState, action: IConstructorAction): void;
};

export const constructorReducer : IConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            const bun = state.cart.find(ingredient => ingredient.type === 'bun');
            const uuid = uuidv4();
            const newIngredient = {...action.ingredient, uuid: uuid};
            return {
                ...state,
                cart: action.ingredient.type !== 'bun' || !bun ? addByIndexOrChangePosition(
                    state.cart, newIngredient, action.index, 'uuid', action.ingredient.uuid
                ) : action.ingredient._id !== bun._id ? state.cart.map(
                    ingredient => ingredient.type !== 'bun' ? ingredient : newIngredient
                ) : [...state.cart]
            };
        }
        case DEL_INGREDIENT: {
            return {
                ...state,
                cart: state.cart.filter(ingredient => ingredient.uuid !== action.uuid)
            };
        }
        case SET_INGREDIENT: {
            return {
                ...state,
                ingredient: action.ingredient ? {...action.ingredient} : null
            };
        }
        case SET_INGREDIENT_IS_DRAG: {
            return {
                ...state,
                ingredientIsDrag: action.isDrag
            }
        }
        case CLEAR_CART: {
            return {
                ...state,
                cart: []
            }
        }
        default: {
            return state;
        }
    }
};