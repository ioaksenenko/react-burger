import { TIngredient } from './data';

export interface IConstructorState {
    readonly cart: ReadonlyArray<TIngredient>;
    readonly ingredientIsDrag: boolean;
    readonly ingredient: TIngredient | null;
};

export interface IConstructorStore {
    readonly con: IConstructorState
};