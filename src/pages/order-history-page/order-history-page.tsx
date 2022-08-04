import React, { useEffect, useMemo } from 'react';
import styles from './order-history-page.module.css';
import { OrderFeed, TOrderFeedProps } from '../../components/order-feed/order-feed';
import { withIngredients } from '../../components/hocs';
import { useParams } from 'react-router-dom';
import { IReactRouterDomParams } from '../../services/types';
import { useModal } from '../../hooks';
import { OrderInfo } from '../../components/order-info/order-info';
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
    const modalIsOpen = useSelector(store => store.modal.modalIsOpen);

    useEffect(
        () => {
            if (!modalIsOpen && order) {
                openModal();
            }
        },
        [order, openModal, modalIsOpen]
    )

    const WithIngredientsOrderFeed = withIngredients<TOrderFeedProps>()(OrderFeed);

    const orderFeedClasses = {
        root: styles.orderFeedRoot,
        title: styles.orderFeedTitle,
        feed: styles.orderFeedFeed
    };

    return (
        <WithIngredientsOrderFeed classes={orderFeedClasses} showStatus />
    );
};

const OrderHistoryPage = React.memo(() => (
    <OrderHistoryPageContent />
));

export default OrderHistoryPage;