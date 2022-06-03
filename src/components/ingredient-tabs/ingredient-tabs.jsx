import React, { useState, useMemo, useContext } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-tabs.module.css';
import TabPanel from '../tab-panel/tab-panel';
import IngredientList from '../ingredient-list/ingredient-list';
import { DataContext } from '../../services/withFetchContext';

const IngredientTabs = () => {
  const { data } = useContext(DataContext)
  const [activeTab, setActiveTab] = useState('buns');
  const buns = useMemo(
    () => data.filter(
      ingredient => ingredient.type === 'bun'
    ), 
    [data]
  );
  const sauces = useMemo(
    () => data.filter(
      ingredient => ingredient.type === 'sauce'
    ), 
    [data]
  );
  const toppings = useMemo(
    () => data.filter(
      ingredient => ingredient.type === 'main'
    ), 
    [data]
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
      <IngredientList id='buns' title="Булки" ingredients={buns} />
      <IngredientList id='sauces' title="Соусы" ingredients={sauces} />
      <IngredientList id='toppings' title="Начинки" ingredients={toppings} />
    </TabPanel>
    </>
  );
};

export default IngredientTabs;