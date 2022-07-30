import React, { useMemo } from 'react';
import styles from './order-history-page.module.css';
import { OrderFeed, TOrderFeedProps } from '../../components/order-feed/order-feed';
import { withSocket, withIngredients } from '../../components/hocs';
import { useParams } from 'react-router-dom';
import { IReactRouterDomParams } from '../../services/types';
import { useModal } from '../../hooks';
import { OrderInfo } from '../../components/order-info/order-info';
import { WS_ORDERS_USER_URL } from '../../utils/urls';
import { getCookie } from '../../utils/cookie';
import { useSelector } from '../../services/hooks';

const OrderHistoryPageContent = () => {
    const params = useParams<IReactRouterDomParams>();
    const wsMessage = useSelector(store => store.ws.wsMessage);
    const order = useMemo(
        () => wsMessage?.orders?.find(order => order._id === params.id),
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

    const WithIngredientsOrderFeed = withIngredients<TOrderFeedProps>(onSuccess)(OrderFeed);

    const orderFeedClasses = {
        root: styles.orderFeedRoot,
        title: styles.orderFeedTitle,
        feed: styles.orderFeedFeed
    };

    return (
        <WithIngredientsOrderFeed classes={orderFeedClasses} showStatus />
    );
};

const accessToken = getCookie('accessToken');

const WithSocketOrderHistoryPageContent = withSocket(WS_ORDERS_USER_URL, `token=${accessToken}`)(OrderHistoryPageContent);

const OrderHistoryPage = () => (
    <WithSocketOrderHistoryPageContent />
);

export default OrderHistoryPage;