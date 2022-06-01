import React, { useState, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-tabs.module.css';
import TabPanel from '../tab-panel/tab-panel';
import IngredientList from '../ingredient-list/ingredient-list';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../ingredient/ingredient';

const IngredientTabs = ({ingredients, cart, setСart}) => {
  const [activeTab, setActiveTab] = useState('buns');
  const buns = useMemo(
    () => ingredients.filter(
      ingredient => ingredient.type === 'bun'
    ), 
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter(
      ingredient => ingredient.type === 'sauce'
    ), 
    [ingredients]
  );
  const toppings = useMemo(
    () => ingredients.filter(
      ingredient => ingredient.type === 'main'
    ), 
    [ingredients]
  );

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
      <IngredientList id='buns' title="Булки" ingredients={buns} cart={cart} setСart={setСart} />
      <IngredientList id='sauces' title="Соусы" ingredients={sauces} cart={cart} setСart={setСart} />
      <IngredientList id='toppings' title="Начинки" ingredients={toppings} cart={cart} setСart={setСart} />
    </TabPanel>
    </>
  );
};

IngredientTabs.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  cart: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  setСart: PropTypes.func.isRequired
};

export default IngredientTabs;