import React, { useMemo, useEffect, FC } from 'react';
import styles from './target-bun.module.css';
import { useSelector, useDispatch } from '../../services/hooks';
import { addIngredient } from '../../services/actions';
import { useDrop } from "react-dnd";
import classNames from 'classnames';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { setBunState } from '../../services/actions/target-bun';
import { TIngredient } from '../../services/types';

interface ITargetBunProps {
    readonly type: "top" | "bottom" | undefined
};

interface IDropState {
    readonly canDrop: boolean;
    readonly isOver: boolean;
    readonly item: TIngredient;
};

const TargetBun: FC<ITargetBunProps> = ({ type }) => {
    const dispatch = useDispatch();
    const cart = useSelector(store => store.con.cart);
    const bunState = useSelector(store => store.bun);

    const [{ canDrop, isOver, item }, targetRef] = useDrop<TIngredient, void, IDropState>({
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

    return (bun || (item && item.type === 'bun')) ? (
        <div data-testid="target-bun" ref={targetRef} className={classNames(
            styles.ingredient, 
            styles.nonDragable, 
            bunState.canDrop && !bunState.isOver && styles.hilight, 
            bunState.isOver && styles.hover
        )}>
            {bun && <ConstructorElement type={type} isLocked text={name} price={bun.price} thumbnail={bun.image} />}
        </div>
    ) : null
};

export default TargetBun;