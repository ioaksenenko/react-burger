import React, { useState } from 'react';
import styles from './constructor.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { CartContext } from '../../services/constructorContext';

const Constructor = () => {
    const [cart, setСart] = useState([]);

    return (
        <div className={styles.row}>
            <CartContext.Provider value={{cart, setСart}}>
                <div className={styles.col}>
                    <BurgerIngredients />
                </div>
                <div className={styles.col}>
                    <BurgerConstructor />
                </div>
            </CartContext.Provider>
        </div>
    );
};

export default Constructor;