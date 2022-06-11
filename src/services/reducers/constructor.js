import { ADD_INGREDIENT, DEL_INGREDIENT } from '../actions/constructor';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    cart: [],
    dragType: 'default'
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            const bun = state.cart.find(ingredient => ingredient.type === 'bun');
            const uuid = uuidv4();
            return {
                ...state,
                cart: action.ingredient.type !== 'bun' || !bun
                        ? state.cart.length 
                        ? action.index !== -1 
                        ? [...[...state.cart].splice(0, action.index).filter(ingredient => ingredient.uuid !== action.ingredient.uuid), {...action.ingredient, uuid: uuid}, ...[...state.cart].splice(action.index).filter(ingredient => ingredient.uuid !== action.ingredient.uuid)] 
                        : [...state.cart, {...action.ingredient, uuid: uuid}]
                        : [{...action.ingredient, uuid: uuid}]
                        : action.ingredient._id !== bun._id
                        ? state.cart.map(ingredient => ingredient.type !== 'bun' ? ingredient : {...action.ingredient, uuid: uuid})
                        : [...state.cart]
            };
        }
        case DEL_INGREDIENT: {
            return {
                ...state,
                cart: state.cart.filter(ingredient => ingredient.uuid !== action.uuid)
            };
        }
        default: {
            return state;
        }
    }
};