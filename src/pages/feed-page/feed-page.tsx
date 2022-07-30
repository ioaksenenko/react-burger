import React, { useMemo } from 'react';
import styles from './feed-page.module.css';
import { OrderFeed } from '../../components/order-feed/order-feed';
import { OrderStats } from '../../components/order-stats/order-stats';
import { useParams } from 'react-router-dom';
import { IReactRouterDomParams } from '../../services/types';
import { OrderInfo } from '../../components/order-info/order-info';
import { withSocket, withIngredients } from '../../components/hocs';
import { useModal } from '../../hooks';
import { WS_ORDERS_ALL_URL } from '../../utils/urls';
import { useSelector } from '../../services/hooks';

const FeedPageContent = () => {
    const params = useParams<IReactRouterDomParams>();
    const wsMessage = useSelector(store => store.ws.wsMessage);
    const order = useMemo(
        () => wsMessage?.orders.find(order => order._id === params.id),
        [wsMessage?.orders, params.id]
    );
    const orderInfoClasses = {
        root: styles.orderInfoRoot,
        number: styles.orderInfoNumber,
    };
    const openModal = useModal(
        <OrderInfo orderId={params.id} classes={orderInfoClasses} />, 
        <p className="text text_type_digits-default">#{order?.number}</p>
    );

    const onSuccess = () => {
        openModal();
    };
    
    const WithIngredientsOrderFeed = withIngredients(onSuccess)(OrderFeed);

    return (
        <div className={styles.root}>
            <WithIngredientsOrderFeed />
            <OrderStats />
        </div>
    );
};

const WithSocketFeedPageContent = withSocket(WS_ORDERS_ALL_URL)(FeedPageContent);

const FeedPage = () => (
    <WithSocketFeedPageContent />
);

export default FeedPage;