import React, { useMemo } from 'react';
import styles from './order-stats.module.css';
import { useSelector } from '../../services/hooks';
import { OrderList } from '../order-list/order-list';
import { StatMeasure } from '../stat-measure/stat-measure';

export const OrderStats = () => {
    const { wsMessage } = useSelector(store => store.ws);

    const doneOrders = useMemo(
        () => wsMessage?.orders.filter(order => order.status === 'done').map(order => order.number) || [],
        [wsMessage?.orders]
    );

    const pendingOrders = useMemo(
        () => wsMessage?.orders.filter(order => order.status === 'pending').map(order => order.number) || [],
        [wsMessage?.orders]
    );

    return (
        <div className={styles.root}>
            <div className={styles.orders}>
                <OrderList title="Готовы:" orderNumbers={doneOrders.slice(0, 30)} hightlight />
                <OrderList title="В работе:" orderNumbers={pendingOrders.slice(0, 30)} />
            </div>
            {wsMessage && (
                <>
                    <StatMeasure title="Выполнено за всё время:" value={wsMessage.total} />
                    <StatMeasure title="Выполнено за сегодня:" value={wsMessage.totalToday} />
                </>
            )}
        </div>
    );
}