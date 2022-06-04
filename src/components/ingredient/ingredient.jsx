import React, { useEffect, useState, useContext } from 'react';
import styles from './ingredient.module.css';
import classNames from 'classnames';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { CartContext } from '../../services/constructorContext';

export const Ingredient = ({ingredient}) => {
    const [count, setCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const {cart, setСart} = useContext(CartContext);

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

    const handleIngredientClick = () => {
        setShowModal(true);
        addIngredient();
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        const ingredients = cart.filter(cartIngredient => cartIngredient._id === ingredient._id);
        setCount(ingredients.length * (ingredient.type === 'bun' ? 2 : 1));
    }, [cart, ingredient._id, ingredient.type]);

    return (
        <>
        <div className={styles.root} onClick={handleIngredientClick}>
            <img className={styles.img} src={ingredient.image} alt={ingredient.name} />
            <div className={styles.priceBox}>
                <p className={classNames("text text_type_digits-default", styles.price)}>{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={classNames("text text_type_main-default", styles.name)}>{ingredient.name}</p>
            {count ? <Counter count={count} size="default" /> : null}
        </div>
        <Modal title='Детали ингредиента' show={showModal} handleClose={handleCloseModal}>
            <IngredientDetails ingredient={ingredient} />
        </Modal>
        </>
    );
};

export const ingredientPropTypes = PropTypes.shape({
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
    ingredient: ingredientPropTypes.isRequired
};