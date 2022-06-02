import React, { useState } from 'react';
import styles from './burger-constructor.module.css';
import Burger from '../burger/burger';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../ingredient/ingredient';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = ({cart, setСart}) => {
  const bun = cart.find(ingredient => ingredient.type === 'bun');
  const total = cart.reduce((sum, ingredient) => sum + ingredient.price, bun ? bun.price : 0);
  const [showModal, setShowModal] = useState(false);

  const handleOrderClick = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }
  
  return (
    <div className={styles.root}>
      <Burger cart={cart} setСart={setСart} />
      {total > 0 && (
        <div className={styles.order}>
          <p className={classNames("text text_type_digits-medium", styles.total)}>{total}</p>
          <span className={styles.currency}><CurrencyIcon type="primary" /></span>
          <Button type="primary" size="large" onClick={handleOrderClick}>Оформить заказ</Button>
          <Modal show={showModal} handleClose={handleCloseModal}>
            <OrderDetails />
          </Modal>
        </div>
      )}
    </div>
  );
};

BurgerConstructor.propTypes = {
  cart: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  setСart: PropTypes.func.isRequired
};

export default BurgerConstructor;