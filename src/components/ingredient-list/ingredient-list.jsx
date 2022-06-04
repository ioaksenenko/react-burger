import React from 'react';
import styles from './ingredient-list.module.css';
import { Ingredient, ingredientPropTypes } from '../ingredient/ingredient';
import PropTypes from 'prop-types';

const IngredientList = ({id, title, ingredients}) => (
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

IngredientList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
};

export default IngredientList;