import React, { FC } from 'react';
import styles from './target-filling.module.css';
import { useSelector, useDispatch } from '../../services/hooks';
import { addIngredient, delIngredient } from '../../services/actions/constructor';
import { useDrop } from "react-dnd";
import classNames from 'classnames';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../services/types';

interface IDragFillingProps {
    readonly ingredient?: TIngredient;
};

interface IDropState {
    readonly canDrop: boolean;
    readonly isOver: boolean;
    readonly item: TIngredient;
};

type TTarget = EventTarget & {
    readonly dataset?: {
        uuid: string 
    }, 
    readonly parentNode?: undefined | null 
} | undefined | null;

const TargetFilling: FC<IDragFillingProps> = ({ ingredient }) => {
    const dispatch = useDispatch();
    const cart = useSelector(store => store.con.cart);

    const [{ canDrop, isOver, item }, targetRef] = useDrop<TIngredient, void, IDropState>({
        accept: "filling",
        drop(item) {
            const index = ingredient ? cart.indexOf(ingredient) : -1;
            dispatch(addIngredient(item, index));
        },
        collect: monitor => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
            item: monitor.getItem()
        })
    });

    const removeIngredient = (e: MouseEvent | undefined = undefined) => {
        let target : TTarget = e?.target;
        while (target?.dataset && !target.dataset.uuid) {
            target = target.parentNode;
        }
        if (target?.dataset) {
            dispatch(delIngredient(target.dataset.uuid));
        }
    };

    return (ingredient || (item && item.type !== 'bun')) ? (
        <div ref={targetRef} data-uuid={ingredient && ingredient.uuid} className={classNames(
            styles.ingredient, 
            !ingredient && styles.nonDragable, 
            canDrop && !isOver && styles.hilight,
            isOver && styles.hover
        )}>
            {ingredient && <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={removeIngredient}
            />}
        </div>
    ) : null
};

export default TargetFilling;