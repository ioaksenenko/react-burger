import React, { useMemo } from 'react';
import styles from './burger.module.css';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import TargetFilling from '../target-filling/target-filling';
import TargetBun from '../target-bun/target-bun';
import DragFilling from '../drag-filling/drag-filling';

const Burger = () => {
    const { cart, ingredientIsDrag } = useSelector<IConstructorStore, IConstructorState>(store => store.con);

    const filling = useMemo(
        () => cart.filter(
            ingredient => ingredient.type !== 'bun'
        ),
        [cart]
    );

    return (
        <div className={classNames(styles.root, !cart.length && !ingredientIsDrag && styles.bordered)}>
            {!cart.length && !ingredientIsDrag ? (
                <p className={classNames('text text_type_main-default text_color_inactive', styles.stubText)}>Перетащите сюда ингредиенты</p>
            ) : (
                <>
                <TargetBun type="top" />
                {filling.length ? (
                    <div className={styles.scrollable}>
                        {filling.map(ingredient => <DragFilling key={ingredient.uuid} ingredient={ingredient} />)}
                    </div>
                ) : <TargetFilling />}
                <TargetBun type="bottom" />
                </>
            )}
        </div>
    );
};

export default Burger;