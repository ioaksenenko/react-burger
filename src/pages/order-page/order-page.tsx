import React, { FC } from 'react';
import { OrderInfo, TOrderInfoProps } from '../../components/order-info/order-info';
import { useParams } from 'react-router-dom';
import { IReactRouterDomParams } from '../../services/types';
import { withSocket, withIngredients } from '../../components/hocs';

const OrderPageContent = () => {
    const params = useParams<IReactRouterDomParams>();

    const WithIngredientsOrderInfo = withIngredients<TOrderInfoProps>()(OrderInfo);

    return (
        <WithIngredientsOrderInfo orderId={params.id} />
    );
};

export type TOrderPageProps = {
    readonly url: string;
    readonly query?: string;
};

const OrderPage: FC<TOrderPageProps> = ({url, query = ''}) => {
    const WithSocketOrderPageContent = withSocket(url, query)(OrderPageContent);
    return (
        <WithSocketOrderPageContent />
    );
};

export default OrderPage;