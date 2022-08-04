import React, { FC } from 'react';
import styles from './order-ingredient.module.css';
import { TIngredient } from '../../services/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { RoundedImage } from '../rounded-image/rounded-image';
import classNames from 'classnames';

export type TOrderIngredientProps = {
    readonly ingredient: TIngredient;
    readonly count: number;
};

export const OrderIngredient: FC<TOrderIngredientProps> = ({ingredient, count}) => {
    return (
        <div className={styles.root}>
            <RoundedImage src={ingredient.image} alt={ingredient.name} />
            <p className={classNames("text text_type_main-default", styles.name)}>{ingredient.name}</p>
            <div className={styles.price}>
                <p className="text text_type_digits-default">{count} x {ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    );
};