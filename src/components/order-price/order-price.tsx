import React, { FC, useMemo } from 'react';
import styles from './order-price.module.css';
import classNames from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../services/types';

export type TOrderPriceProps = {
    readonly ingredients: ReadonlyArray<TIngredient | undefined>;
};

export const OrderPrice: FC<TOrderPriceProps> = ({ingredients}) => {
    const total = useMemo(
        () => ingredients.reduce(
            (sum, ingredient) => sum + (ingredient?.price || 0), 0
        ), 
        [ingredients]
    );

    return (
        <div className={styles.root}>
            <p className={classNames("text text_type_digits-default", styles.number)}>{total}</p>
            <CurrencyIcon type="primary" />
        </div>
    );
};