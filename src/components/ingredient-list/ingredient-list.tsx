import React, { FC } from 'react';
import styles from './ingredient-list.module.css';
import Ingredient from '../ingredient/ingredient';
import { TIngredient } from '../../services/types';

interface IIngredientListProps {
  id: string;
  title: string;
  ingredients: ReadonlyArray<TIngredient>;
};

const IngredientList : FC<IIngredientListProps> = ({id, title, ingredients}) => (
  <section className={styles.root} id={id}>
    <p className="text text_type_main-medium">{title}</p>
    <div className={styles.list}>
      {ingredients.map(ingredient => (
        <Ingredient 
          key={ingredient._id} 
          ingredient={ingredient}
        />
      ))}
    </div>
  </section>
);

export default IngredientList;