import React from 'react';
import styles from './drag-filling.module.css';
import TargetFilling from '../target-filling/target-filling';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { ingredientPropTypes } from '../ingredient/ingredient';

const DragFilling = ({ingredient}) => {
    const [{ isDrag }, dragRef] = useDrag({
        type: "filling",
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        })
    });

    return !isDrag && (
        <div className={styles.draggable} ref={dragRef}>
            <div className={styles.dragIcon}>
                <DragIcon type="primary" />
            </div>
            <TargetFilling ingredient={ingredient} />
        </div>
    );
};

DragFilling.propTypes = {
    ingredient: ingredientPropTypes.isRequired
};

export default DragFilling;