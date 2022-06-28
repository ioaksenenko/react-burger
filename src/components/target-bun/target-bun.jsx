import React, { useMemo, useEffect } from 'react';
import styles from './target-bun.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient } from '../../services/actions/constructor';
import { useDrop } from "react-dnd";
import classNames from 'classnames';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { setBunState } from '../../services/actions/target-bun';
import PropTypes from 'prop-types';

const TargetBun = ({ type }) => {
    const dispatch = useDispatch();
    const { cart } = useSelector(store => store.con);
    const bunState = useSelector(store => store.bun);

    const [{ canDrop, isOver, item }, targetRef] = useDrop({
        accept: "bun",
        drop(ingredient) {
            dispatch(addIngredient(ingredient));
        },
        collect: monitor => {
            return {
                canDrop: monitor.canDrop(),
                isOver: monitor.isOver(),
                item: monitor.getItem()
            };
        }
    });

    useEffect(
        () => {
            dispatch(setBunState({
                isOver: isOver,
                canDrop: canDrop
            }));
        }, 
        [dispatch, canDrop, isOver]
    );

    const bun = useMemo(
        () => cart.find(
            ingredient => ingredient.type === 'bun'
        ),
        [cart]
    );

    const name = `${bun?.name} (${type === 'top' ? 'верх' : 'низ'})`;

    return (
        (bun || (item && item.type === 'bun')) && (
            <div ref={targetRef} className={classNames(
                styles.ingredient, 
                styles.nonDragable, 
                bunState.canDrop && !bunState.isOver && styles.hilight, 
                bunState.isOver && styles.hover
            )}>
                {bun && <ConstructorElement type={type} isLocked text={name} price={bun.price} thumbnail={bun.image} />}
            </div>
        )
    )
};

TargetBun.propTypes = {
    type: PropTypes.string.isRequired
}

export default TargetBun;