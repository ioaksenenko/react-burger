import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-tabs.module.css';
import TabPanel from '../tab-panel/tab-panel';
import IngredientList from '../ingredient-list/ingredient-list';
import data from '../../utils/data';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../ingredient/ingredient';

const IngredientTabs = ({cart, setСart}) => {
  const [activeTab, setActiveTab] = useState('buns');

  const scrollToActiveTab = (value) => {
    setActiveTab(value);
    const element = document.getElementById(value);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <div className={styles.tabList}>
      <Tab value="buns" active={activeTab === 'buns'} onClick={scrollToActiveTab}>
        Булки
      </Tab>
      <Tab value="sauces" active={activeTab === 'sauces'} onClick={scrollToActiveTab}>
        Соусы
      </Tab>
      <Tab value="toppings" active={activeTab === 'toppings'} onClick={scrollToActiveTab}>
        Начинки
      </Tab>
    </div>
    <TabPanel setActiveTab={setActiveTab}>
      <IngredientList id='buns' title="Булки" ingredients={data.filter(item => item.type === 'bun')} cart={cart} setСart={setСart} />
      <IngredientList id='sauces' title="Соусы" ingredients={data.filter(item => item.type === 'sauce')} cart={cart} setСart={setСart} />
      <IngredientList id='toppings' title="Начинки" ingredients={data.filter(item => item.type === 'main')} cart={cart} setСart={setСart} />
    </TabPanel>
    </>
  );
};

IngredientTabs.propTypes = {
  cart: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  setСart: PropTypes.func.isRequired
};

export default IngredientTabs;