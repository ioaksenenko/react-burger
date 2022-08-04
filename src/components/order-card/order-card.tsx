import React, { FC, useMemo } from 'react';
import styles from './order-card.module.css';
import { TOrder, TIngredient, TIngredientsResponse } from '../../services/types';
import { useSelector } from '../../services/hooks';
import { INGREDIENTS_URL } from '../../utils/urls';
import classNames from 'classnames';
import { OrderDatetime } from '../order-datetime/order-datetime';
import { OrderPrice } from '../order-price/order-price';
import { RoundedImage } from '../rounded-image/rounded-image';
import { OrderInfo } from '../order-info/order-info';
import { useModal } from '../../hooks';
import { OrderStatus } from '../order-status/order-status';

type TOrderCardProps = {
    readonly order: TOrder;
    readonly showStatus?: boolean;
};

const OrderCard: FC<TOrderCardProps> = ({order, showStatus}) => {
    const ingredients = useSelector<ReadonlyArray<TIngredient>, TIngredientsResponse>(
        store => store.axios[INGREDIENTS_URL]?.data?.data || []
    );

    const orderIngredients = useMemo(
        () => order.ingredients.map(
            ingredientID => ingredients.find(
                ingredient => ingredientID === ingredient._id
            )
        ),
        [ingredients, order.ingredients]
    );

    const bun = useMemo(
        () => orderIngredients.find(ingredient => ingredient?.type === 'bun'),
        [orderIngredients]
    );

    const filling = useMemo(
        () => orderIngredients.filter(ingredient => ingredient?.type !== 'bun'),
        [orderIngredients]
    );

    const orderInfoClasses = {
        root: styles.orderInfoRoot,
        number: styles.orderInfoNumber,
    };

    const openModal = useModal(
        <OrderInfo orderId={order._id} classes={orderInfoClasses} />, 
        <p className="text text_type_digits-default">#{order.number}</p>
    );

    const handleCardClick = () => {
        openModal(order._id);
    };

    return (
        <div className={styles.root} onClick={handleCardClick}>
            <div className={styles.head}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <OrderDatetime serializedDatetime={order.createdAt} />
            </div>
            <div className={styles.nameStatus}>
                <p className={classNames("text text_type_main-medium", styles.name)}>{order.name}</p>
                {showStatus && <OrderStatus>{order.status}</OrderStatus>}
            </div>
            <div className={styles.order}>
                <div className={styles.ingredients}>
                    {bun && <RoundedImage src={bun.image} alt={bun.name} classes={{ root: styles.ingredient }} />}
                    {filling.map(
                        (ingredient, index) => ingredient && (
                            <RoundedImage 
                                key={index} 
                                src={ingredient.image} 
                                alt={ingredient.name} 
                                classes={{ root: classNames(styles.ingredient, index === 4 && filling.length > 5 && styles.muted) }} 
                            />
                        )
                    )}
                    {filling.length > 5 && (
                        <p className={classNames("text text_type_main-default", styles.ingredientsCount)}>
                            +{filling.length - 5}
                        </p>
                    )}
                </div>
                <OrderPrice ingredients={orderIngredients} />
            </div>
        </div>
    );
};

export default OrderCard;