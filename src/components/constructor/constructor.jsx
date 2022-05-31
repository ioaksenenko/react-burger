import React, { useState } from 'react';
import styles from './constructor.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../ingredient/ingredient';

const Constructor = ({ingredients}) => {
    const [cart, setСart] = useState([]);

    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <BurgerIngredients ingredients={ingredients} cart={cart} setСart={setСart} />
            </div>
            <div className={styles.col}>
                <BurgerConstructor cart={cart} setСart={setСart} />
            </div>
        </div>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
};

export default Constructor;