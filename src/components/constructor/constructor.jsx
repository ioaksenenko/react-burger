import React from 'react';
import styles from './constructor.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

const Constructor = (props) => {
    const [cart, setСart] = React.useState([]);

    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <BurgerIngredients cart={cart} setСart={setСart} />
            </div>
            <div className={styles.col}>
                <BurgerConstructor cart={cart} setСart={setСart} />
            </div>
        </div>
    );
}

export default Constructor;