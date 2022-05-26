import React from 'react';
import styles from './burger.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../ingredient/ingredient';

const Burger = ({cart, setСart}) => {
    const bun = cart.find(ingredient => ingredient.type === 'bun');
    const ingredients = cart.filter(ingredient => ingredient.type !== 'bun');

    const removeIngredient = (e) => {
        var target = e.target;
        while (target.dataset && !target.dataset.uuid) {
            target = target.parentNode;
        }
        if (target.dataset) {
            const uuid = target.dataset.uuid;
            setСart([...cart.filter(e => e.uuid !== uuid)]);
        }
    }

    return (
        <div className={styles.root}>
            {bun && (
                <div className={classNames(styles.ingredient, styles.nonDragable)}>
                    <ConstructorElement type="top" isLocked text={bun.name} price={bun.price} thumbnail={bun.image} />
                </div>
            )}
            {ingredients.length > 0 && (
                <div className={styles.scrollable}>
                {ingredients.map(ingredient => {
                    return (
                        <div key={ingredient.uuid} className={styles.draggable}>
                            <div className={styles.dragIcon}>
                                <DragIcon type="primary" />
                            </div>
                            <div data-uuid={ingredient.uuid} className={styles.ingredient}>
                                <ConstructorElement 
                                    text={ingredient.name} 
                                    price={ingredient.price} 
                                    thumbnail={ingredient.image} 
                                    handleClose={removeIngredient}
                                />
                            </div>
                        </div>
                    )
                })}
                </div>
            )}
            {bun && (
                <div className={classNames(styles.ingredient, styles.nonDragable)}>
                    <ConstructorElement type="bottom" isLocked text={bun.name} price={bun.price} thumbnail={bun.image} />
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