import React from 'react';
import styles from './burger.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../ingredient/ingredient';

const Burger = ({cart, setСart}) => {
    const bun = cart.find(ingredient => ingredient.type === 'bun');
    const ingredients = cart.filter(ingredient => ingredient.type !== 'bun');

    const removeIngredient = (ingredient) => {
        setСart([...cart.filter(e => e.timestamp !== ingredient.timestamp)])
    }

    return (
        <div className={styles.root}>
            {bun && (
                <div className={classNames(styles.ingredient, styles.nonDragable)}>
                    <ConstructorElement type="top" isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />
                </div>
            )}
            {ingredients.length > 0 && (
                <div className={styles.scrollable}>
                {ingredients.map(ingredient => {
                    return (
                        <div key={ingredient.timestamp} className={styles.draggable}>
                            <div className={styles.dragIcon}>
                                <DragIcon type="primary" />
                            </div>
                            <div className={styles.ingredient}>
                                <ConstructorElement 
                                    text={ingredient.name} 
                                    price={ingredient.price} 
                                    thumbnail={ingredient.image} 
                                    handleClose={() => { removeIngredient(ingredient) }}
                                />
                            </div>
                        </div>
                    )
                })}
                </div>
            )}
            {bun && (
                <div className={classNames(styles.ingredient, styles.nonDragable)}>
                    <ConstructorElement type="bottom" isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />
                </div>
            )}
        </div>
    );
}

Burger.propTypes = {
    cart: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    setСart: PropTypes.func.isRequired
};

export default Burger;