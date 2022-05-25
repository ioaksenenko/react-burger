import React from 'react';
import styles from './ingredient.module.css';
import classNames from 'classnames';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const Ingredient = ({data, cart, setСart, ...props}) => {
    const [count, setCount] = React.useState(0);

    const addIngredient = () => {
        const bun = cart.find(ingredient => ingredient.type === 'bun');
        const timestamp = new Date().getTime();
        if (data.type !== 'bun' || !bun) {
            setСart([...cart, {...data, timestamp: timestamp}]);
        }
        if (data.type === 'bun' && bun && data._id !== bun._id) {
            const ingredients = cart.filter(ingredient => ingredient.type !== 'bun');
            setСart([...ingredients, {...data, timestamp: timestamp}]);
        }
    }

    React.useEffect(() => {
        const ingredients = cart.filter(ingredient => ingredient._id === data._id);
        if (data.type === 'bun') {
            setCount(2 * ingredients.length);
        } else {
            setCount(ingredients.length);
        }
    }, [cart, data._id, data.type]);

    return (
        <div className={styles.root} {...props} onClick={addIngredient}>
            <img className={styles.img} src={data.image} alt={data.name} />
            <div className={styles.priceBox}>
                <p className={classNames("text text_type_digits-default", styles.price)}>{data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={classNames("text text_type_main-default", styles.name)}>{data.name}</p>
            {count ? <Counter count={count} size="default" /> : null}
        </div>
    );
}

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
    data: ingredientPropTypes.isRequired,
    cart: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    setСart: PropTypes.func.isRequired
};

export {Ingredient, ingredientPropTypes};