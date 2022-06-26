import React, { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import Burger from '../burger/burger';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import OrderButton from '../order-button/order-button';

const BurgerConstructor = () => {
  const cart = useSelector(store => store.con.cart);

  const bun = useMemo(
    () => cart.find(
      ingredient => ingredient.type === 'bun'
    ), 
    [cart]
  );

  const total = useMemo(
    () => cart.reduce(
      (sum, ingredient) => 
        sum + ingredient.price, 
      bun ? bun.price : 0
    ), 
    [cart, bun]
  );
  
  return (
    <div className={styles.root}>
      <Burger />
      {total > 0 && (
        <div className={styles.order}>
          <p className={classNames("text text_type_digits-medium", styles.total)}>{total}</p>
          <span className={styles.currency}><CurrencyIcon type="primary" /></span>
          <OrderButton />
        </div>
      )}
    </div>
  );
};

export default BurgerConstructor;