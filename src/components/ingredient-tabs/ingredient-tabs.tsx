import React, { useState, useMemo, FC, ReactNode } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-tabs.module.css';
import TabPanel from '../tab-panel/tab-panel';
import IngredientList from '../ingredient-list/ingredient-list';
import { useSelector } from '../../services/hooks';
import { INGREDIENTS_URL } from '../../utils/urls';
import { TIngredientsResponse, TIngredient } from '../../services/types';

const IngredientTab: FC<{
  active: boolean;
  value: string;
  onClick: (value: string) => void;
  children: ReactNode;
}> = Tab;

const IngredientTabs = () => {
  const ingredients = useSelector<ReadonlyArray<TIngredient>, TIngredientsResponse>(
    store => store.axios[INGREDIENTS_URL]?.data?.data || []
  );
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

  const scrollToActiveTab = (value : string) => {
    setActiveTab(value);
    const element = document.getElementById(value);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className={styles.tabList}>
        <IngredientTab value="buns" active={activeTab === 'buns'} onClick={scrollToActiveTab}>
          Булки
        </IngredientTab>
        <IngredientTab value="sauces" active={activeTab === 'sauces'} onClick={scrollToActiveTab}>
          Соусы
        </IngredientTab>
        <IngredientTab value="toppings" active={activeTab === 'toppings'} onClick={scrollToActiveTab}>
          Начинки
        </IngredientTab>
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