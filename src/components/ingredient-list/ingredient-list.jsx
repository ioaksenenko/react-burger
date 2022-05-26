import React from 'react';
import styles from './ingredient-list.module.css';
import { Ingredient, ingredientPropTypes } from '../ingredient/ingredient';
import PropTypes from 'prop-types';

const IngredientList = ({title, ingredients, cart, setСart, ...props}) => {
  return (
    <div className={styles.root} {...props}>
        <p className="text text_type_main-medium">{title}</p>
        <div className={styles.list}>
            {ingredients.map(ingredient => (
              <Ingredient 
                key={ingredient._id} 
                ingredient={ingredient} 
                cart={cart} 
                setСart={setСart} 
              />
            ))}
        </div>
    </div>
  );
}

IngredientList.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  cart: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  setСart: PropTypes.func.isRequired
};

export default IngredientList;