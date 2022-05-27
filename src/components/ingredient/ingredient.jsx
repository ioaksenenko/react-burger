import React, { useEffect, useState } from 'react';
import styles from './ingredient.module.css';
import classNames from 'classnames';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Ingredient = ({ingredient, cart, setСart}) => {
    const [count, setCount] = useState(0);

    const addIngredient = () => {
        const bun = cart.find(ingredient => ingredient.type === 'bun');
        const uuid = uuidv4();
        if (ingredient.type !== 'bun' || !bun) {
            setСart([...cart, {...ingredient, uuid: uuid}]);
        }
        if (ingredient.type === 'bun' && bun && ingredient._id !== bun._id) {
            const ingredients = cart.filter(ingredient => ingredient.type !== 'bun');
            setСart([...ingredients, {...ingredient, uuid: uuid}]);
        }
    };

    useEffect(() => {
        const ingredients = cart.filter(cartIngredient => cartIngredient._id === ingredient._id);
        setCount(ingredients.length * (ingredient.type === 'bun' ? 2 : 1));
    }, [cart, ingredient._id, ingredient.type]);

    return (
        <div className={styles.root} onClick={addIngredient}>
            <img className={styles.img} src={ingredient.image} alt={ingredient.name} />
            <div className={styles.priceBox}>
                <p className={classNames("text text_type_digits-default", styles.price)}>{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={classNames("text text_type_main-default", styles.name)}>{ingredient.name}</p>
            {count ? <Counter count={count} size="default" /> : null}
        </div>
    );
};

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

Ingredient.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
    cart: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    setСart: PropTypes.func.isRequired
};

export {Ingredient, ingredientPropTypes};