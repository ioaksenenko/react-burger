import React from 'react';
import styles from './target-filling.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, delIngredient } from '../../services/actions/constructor';
import { useDrop } from "react-dnd";
import classNames from 'classnames';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../ingredient/ingredient';

const TargetFilling = ({ ingredient }) => {
    const dispatch = useDispatch();
    const cart = useSelector(store => store.con.cart);

    const [{ isOver, item }, targetRef] = useDrop({
        accept: "filling",
        drop(item) {
            const index = cart.indexOf(ingredient);
            dispatch(addIngredient(item, index));
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            item: monitor.getItem()
        })
    });

    const removeIngredient = (e) => {
        let target = e.target;
        while (target.dataset && !target.dataset.uuid) {
            target = target.parentNode;
        }
        if (target.dataset) {
            dispatch(delIngredient(target.dataset.uuid));
        }
    };

    return (ingredient || (item && item.type !== 'bun')) && (
        <div ref={targetRef} data-uuid={ingredient && ingredient.uuid} className={classNames(styles.ingredient, !ingredient && styles.nonDragable, isOver && styles.hover)}>
            {ingredient && <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={removeIngredient}
            />}
        </div>
    )
};

TargetFilling.propTypes = {
    ingredient: ingredientPropTypes
};

export default TargetFilling;