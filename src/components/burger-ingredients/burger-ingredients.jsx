import React from 'react';
import styles from './burger-ingredients.module.css';
import classNames from 'classnames';
import IngredientTabs from '../ingredient-tabs/ingredient-tabs';

const BurgerIngredients = () => (
  <>
  <p className={classNames("text text_type_main-large", styles.title)}>Соберите бургер</p>
  <IngredientTabs />
  </>
);

export default BurgerIngredients;