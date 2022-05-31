import React from 'react';
import styles from './order-details.module.css';
import classNames from 'classnames';
import data from '../../utils/data.js';
import doneImage from '../../images/done.svg'

const OrderDetails = () => {
    return (
        <div className={styles.root}>
            <p className={classNames("text text_type_digits-large", styles.orderNumber)}>{data.order_number}</p>
            <p className={classNames("text text_type_main-medium", styles.orderId)}>{data.order_id}</p>
            <img className={styles.doneImage} src={doneImage} alt='Готово'></img>
            <p className={classNames("text text_type_main-default", styles.startСookText)}>Ваш заказ начали готовить</p>
            <p className={classNames("text text_type_main-default text_color_inactive", styles.waitText)}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails;