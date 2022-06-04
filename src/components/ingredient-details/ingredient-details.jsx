import React from 'react';
import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IngredientProperty from '../ingredient-property/ingredient-property';

const IngredientDetails = ({ingredient}) => (
    <div className={styles.root}>
        <img className={styles.img} src={ingredient.image_large} alt={ingredient.name} />
        <p className={classNames('text text_type_main-medium', styles.name)}>{ingredient.name}</p>
        <div className={styles.propertyList}>
            <IngredientProperty name='Калории, ккал' value={ingredient.calories} />
            <IngredientProperty name='Белки, г' value={ingredient.proteins} />
            <IngredientProperty name='Жиры, г' value={ingredient.fat} />
            <IngredientProperty name='Углеводы, г' value={ingredient.carbohydrates} />
        </div>
    </div>
);

const ingredientPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
});

IngredientDetails.propTypes = {
    ingredient: ingredientPropTypes.isRequired
};

export default IngredientDetails;