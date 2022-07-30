import React, { FC } from 'react';
import styles from './order-status.module.css';
import classNames from 'classnames';

export type TOrderStatusProps = {
    readonly children: string;
    readonly classes?: {
        readonly status?: string;
    };
};

export type TStatus = {
    [status: string]: string;
};

export const statusMap: TStatus = {
    created: 'Создан',
    pending: 'Готовится',
    done: 'Выполнен'
}

export const stylesMap: TStatus = {
    created: styles.created,
    pending: styles.pending,
    done: styles.done
}

export const OrderStatus: FC<TOrderStatusProps> = ({children, classes}) => (
    <p className={classNames(
        "text text_type_main-default", 
        stylesMap[children], 
        classes?.status
    )}>
        {statusMap[children]}
    </p>
);