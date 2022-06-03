import React, { useContext } from 'react';
import styles from './burger-constructor.module.css';
import Burger from '../burger/burger';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { CartContext } from '../../services/constructorContext';
import withPost from '../hocs/with-post';
import OrderDetails from '../order-details/order-details';
import { ordersUrl } from '../../utils/data';

const BurgerConstructor = () => {
  const { cart } = useContext(CartContext);
  const bun = cart.find(ingredient => ingredient.type === 'bun');
  const total = cart.reduce((sum, ingredient) => sum + ingredient.price, bun ? bun.price : 0);
  const requestData = {ingredients: cart.map(ingredient => ingredient._id)};
  const WithPostOrderDetails = withPost(ordersUrl, requestData, 'Оформить заказ')(OrderDetails);
  
  return (
    <div className={styles.root}>
      <Burger />
      {total > 0 && (
        <div className={styles.order}>
          <p className={classNames("text text_type_digits-medium", styles.total)}>{total}</p>
          <span className={styles.currency}><CurrencyIcon type="primary" /></span>
          <WithPostOrderDetails />
        </div>
      )}
    </div>
  );
};

export default BurgerConstructor;