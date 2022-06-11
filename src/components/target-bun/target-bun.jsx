import React, { useEffect, useMemo } from 'react';
import styles from './target-bun.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient } from '../../services/actions/constructor';
import { useDrop } from "react-dnd";
import classNames from 'classnames';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { setBunHover } from '../../services/actions/target-bun';
import PropTypes from 'prop-types';

const TargetBun = ({ type }) => {
    const dispatch = useDispatch();
    const { cart } = useSelector(store => store.con);
    const { bunHover } = useSelector(store => store.bun);

    const [{ isOver, item }, targetRef] = useDrop({
        accept: "bun",
        drop(ingredient) {
            dispatch(addIngredient(ingredient));
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            item: monitor.getItem()
        })
    });

    const bun = useMemo(
        () => cart.find(
            ingredient => ingredient.type === 'bun'
        ),
        [cart]
    );

    useEffect(
        () => {
            dispatch(setBunHover(isOver));
        },
        [dispatch, isOver]
    );

    return (
        (bun || (item && item.type === 'bun')) && (
            <div ref={targetRef} className={classNames(styles.ingredient, styles.nonDragable, bunHover && styles.hover)}>
                {bun && <ConstructorElement type={type} isLocked text={bun.name} price={bun.price} thumbnail={bun.image} />}
            </div>
        )
    )
};

TargetBun.propTypes = {
    type: PropTypes.string.isRequired
}

export default TargetBun;