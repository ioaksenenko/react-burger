import React, { FC } from 'react';
import styles from './order-list.module.css';
import classNames from 'classnames';

export type TOrderListProps = {
    readonly title: string;
    readonly orderNumbers: ReadonlyArray<number>;
    readonly hightlight?: boolean;
};

export const OrderList: FC<TOrderListProps> = ({title, orderNumbers, hightlight}) => (
    <div className={styles.root}>
        <p className={classNames("text text_type_main-medium", styles.title)}>{title}</p>
        <div className={styles.numbers}>
            {orderNumbers.map(
                number => <p key={number} className={classNames("text text_type_digits-default", hightlight && styles.hightlight)}>{number}</p>
            )}
        </div>
    </div>
);