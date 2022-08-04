import React from 'react';
import { OrderInfo, TOrderInfoProps } from '../../components/order-info/order-info';
import { useParams } from 'react-router-dom';
import { IReactRouterDomParams } from '../../services/types';
import { withIngredients } from '../../components/hocs';

const OrderPageContent = () => {
    const params = useParams<IReactRouterDomParams>();
    const WithIngredientsOrderInfo = withIngredients<TOrderInfoProps>()(OrderInfo);

    return (
        <WithIngredientsOrderInfo orderId={params.id} />
    );
};

const OrderPage = () => (
    <OrderPageContent />
);

export default OrderPage;