import React, { FC, useMemo } from 'react';
import styles from './order-info.module.css';
import { useSelector } from '../../services/hooks';
import { TIngredient, TIngredientsResponse } from '../../services/types';
import { INGREDIENTS_URL } from '../../utils/urls';
import classNames from 'classnames';
import { OrderIngredient } from '../order-ingredient/order-ingredient';
import { OrderDatetime } from '../order-datetime/order-datetime';
import { OrderPrice } from '../order-price/order-price';
import { OrderStatus } from '../order-status/order-status';

export type TOrderInfoProps = {
    readonly orderId: string;
    readonly classes?: {
        readonly root?: string;
        readonly number?: string;
    };
};

export const OrderInfo: FC<TOrderInfoProps> = ({orderId, classes}) => {
    const wsMessage = useSelector(store => store.ws.wsMessage);

    const order = useMemo(
        () => wsMessage?.orders.find(order => order._id === orderId),
        [wsMessage?.orders, orderId]
    );

    const ingredients = useSelector<ReadonlyArray<TIngredient>, TIngredientsResponse>(
        store => store.axios[INGREDIENTS_URL]?.data?.data || []
    );

    type TIngredientsAmount = { 
        [id: string]: {
            ingredient: TIngredient;
            count: number;
            order: number;
        };
    };

    const ingredientsAmount = useMemo(
        () => {
            let res: TIngredientsAmount = {};
            if (order?.ingredients) {
                for (let id of order?.ingredients) {
                    if (!res.hasOwnProperty(id)) {
                        const ingredient = ingredients.find(ingredient => ingredient._id === id);
                        if (ingredient) {
                            res[id] = {
                                ingredient: ingredient,
                                count: 0,
                                order: ingredient.type === 'bun' ? 1 : 0
                            };
                        }
                    }
                    if (res.hasOwnProperty(id)) {
                        res[id].count++;
                    }
                }
            }
            return Object.values(res).sort(
                (lhs, rhs) => lhs.order < rhs.order ? 1 : lhs.order > rhs.order ? -1 : 0
            );
        },
        [ingredients, order?.ingredients]
    );

    return order ? (
        <div className={classNames(styles.root, classes?.root)}>
            <p className={classNames("text text_type_digits-default", styles.number, classes?.number)}>#{order.number}</p>
            <p className={classNames("text text_type_main-medium", styles.name)}>{order.name}</p>
            <OrderStatus classes={{status: styles.status}}>{order.status}</OrderStatus>
            <p className={classNames("text text_type_main-medium", styles.composition)}>Состав:</p>
            <div className={classNames(styles.ingredients, ingredientsAmount.length > 4 && styles.paddingRight)}>
                {ingredientsAmount.map(
                    data => <OrderIngredient key={data.ingredient._id} ingredient={data.ingredient} count={data.count} />
                )}
            </div>
            <div className={styles.footer}>
                <OrderDatetime serializedDatetime={order.createdAt} />
                <OrderPrice ingredients={ingredientsAmount.map(
                    data => ({...data.ingredient, price: data.count * data.ingredient.price})
                )} />
            </div>
        </div>
    ) : null;
};