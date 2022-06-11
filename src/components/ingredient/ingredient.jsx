import React, { useEffect, useState } from 'react';
import styles from './ingredient.module.css';
import classNames from 'classnames';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { openModal, setModalTitle, setModalContent } from '../../services/actions/modal';

export const Ingredient = ({ ingredient }) => {
    const [count, setCount] = useState(0);
    const cart = useSelector(store => store.con.cart);
    const dispatch = useDispatch();

    const [{ isDrag }, dragRef] = useDrag({
        type: ingredient.type === 'bun' ? 'bun' : 'filling',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const handleIngredientClick = () => {
        dispatch(setModalTitle('Детали ингредиента'));
        dispatch(setModalContent(<IngredientDetails ingredient={ingredient} />));
        dispatch(openModal());
    }

    useEffect(
        () => {
            const ingredients = cart.filter(cartIngredient => cartIngredient._id === ingredient._id);
            setCount(ingredients.length * (ingredient.type === 'bun' ? 2 : 1));
        },
        [cart, ingredient._id, ingredient.type]
    );

    return (
        <>
            <div ref={dragRef} className={classNames(styles.root, isDrag && styles.dragging)} onClick={handleIngredientClick}>
                <img src={ingredient.image} alt={ingredient.name} />
                <div className={styles.priceBox}>
                    <p className={classNames("text text_type_digits-default", styles.price)}>{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={classNames("text text_type_main-default", styles.name)}>{ingredient.name}</p>
                {count !== 0 && <Counter count={count} size="default" />}
            </div>
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