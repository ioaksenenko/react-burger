import React from 'react';
import styles from './ingredient-details.module.css';
import classNames from 'classnames';
import IngredientProperty from '../ingredient-property/ingredient-property';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
    const ingredient = useSelector<IConstructorStore, TIngredient | null>(store => store.con.ingredient);

    return ingredient && (
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
};

export default IngredientDetails;