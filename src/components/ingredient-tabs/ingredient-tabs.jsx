import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-tabs.module.css';
import TabPanel from '../tab-panel/tab-panel';
import IngredientList from '../ingredient-list/ingredient-list';
import data from '../../utils/data';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../ingredient/ingredient';

const IngredientTabs = ({cart, setСart}) => {
  const [current, setCurrent] = React.useState('buns');

  const scrollToCurrent = (value) => {
    setCurrent(value);
    const element = document.getElementById(value);
    element.scrollIntoView({ behavior: 'smooth' });
  } 

  return (
    <>
    <div className={styles.tabList}>
      <Tab value="buns" active={current === 'buns'} onClick={scrollToCurrent}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === 'sauces'} onClick={scrollToCurrent}>
        Соусы
      </Tab>
      <Tab value="toppings" active={current === 'toppings'} onClick={scrollToCurrent}>
        Начинки
      </Tab>
    </div>
    <TabPanel>
      <IngredientList id='buns' title="Булки" items={data.filter(item => item.type === 'bun')} cart={cart} setСart={setСart} />
      <IngredientList id='sauces' title="Соусы" items={data.filter(item => item.type === 'sauce')} cart={cart} setСart={setСart} />
      <IngredientList id='toppings' title="Начинки" items={data.filter(item => item.type === 'main')} cart={cart} setСart={setСart} />
    </TabPanel>
    </>
  );
}

IngredientTabs.propTypes = {
  cart: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  setСart: PropTypes.func.isRequired
};

export default IngredientTabs;