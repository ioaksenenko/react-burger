import React from 'react';
import styles from './burger-ingredients.module.css';
import classNames from 'classnames';
import IngredientTabs from '../ingredient-tabs/ingredient-tabs';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../ingredient/ingredient';

const BurgerIngredients = ({ingredients, cart, setСart}) => (
  <>
  <p className={classNames("text text_type_main-large", styles.title)}>Соберите бургер</p>
  <IngredientTabs ingredients={ingredients} cart={cart} setСart={setСart} />
  </>
);

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  cart: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  setСart: PropTypes.func.isRequired
};

export default BurgerIngredients;