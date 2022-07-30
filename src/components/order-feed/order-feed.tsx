import React, { FC } from 'react';
import styles from './order-feed.module.css';
import OrderCard from '../order-card/order-card';
import classNames from 'classnames';
import { useSelector } from '../../services/hooks';

export type TOrderFeedProps = {
    readonly showStatus?: boolean;
    readonly classes?: {
        readonly root?: string;
        readonly title?: string;
        readonly feed?: string;
    };
};

export const OrderFeed: FC<TOrderFeedProps> = ({showStatus = false, classes}) => {
    const wsMessage = useSelector(store => store.ws.wsMessage);

    return wsMessage?.orders ? (
        <section className={classNames(styles.root, classes?.root)}>
            <p className={classNames("text text_type_main-large", styles.title, classes?.title)}>Лента заказов</p>
            <div className={classNames(styles.feed, classes?.feed)}>
                {wsMessage?.orders.map(order => <OrderCard key={order._id} order={order} showStatus={showStatus} />)}
            </div>
        </section>
    ) : null;
};