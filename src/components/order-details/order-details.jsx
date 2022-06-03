import React, { useContext } from 'react';
import styles from './order-details.module.css';
import classNames from 'classnames';
import doneImage from '../../images/done.svg'
import { DataContext } from '../../services/withPostContext';

const OrderDetails = () => {
    const {data} = useContext(DataContext);

    return (
        <div className={styles.root}>
            <p className={classNames("text text_type_digits-large", styles.orderId)}>{data.order.number}</p>
            <p className={classNames("text text_type_main-medium", styles.orderName)}>{data.name}</p>
            <img className={styles.doneImage} src={doneImage} alt='Готово'></img>
            <p className={classNames("text text_type_main-default", styles.startСookText)}>Ваш заказ начали готовить</p>
            <p className={classNames("text text_type_main-default text_color_inactive", styles.waitText)}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails;