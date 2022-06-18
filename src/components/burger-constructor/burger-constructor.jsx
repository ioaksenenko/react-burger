import React, { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import Burger from '../burger/burger';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import withPost from '../hocs/with-post';
import { ordersUrl } from '../../utils/data';
import { useSelector } from 'react-redux';
import ModalButton from '../modal-button/modal-button';

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

  const ingredients = useMemo(
    () => cart.map(
      ingredient => ingredient._id
    ), 
    [cart]
  );

  const WithPostModalButton= withPost(
    ordersUrl, 
    { ingredients }
  )(ModalButton);
  
  return (
    <div className={styles.root}>
      <Burger />
      {total > 0 && (
        <div className={styles.order}>
          <p className={classNames("text text_type_digits-medium", styles.total)}>{total}</p>
          <span className={styles.currency}><CurrencyIcon type="primary" /></span>
          <WithPostModalButton>Оформить заказ</WithPostModalButton>
        </div>
      )}
    </div>
  );
};

export default BurgerConstructor;