import React from 'react';
import styles from './constructor.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from 'react-redux';
import { INGREDIENTS_URL } from '../../utils/urls';

const Constructor = () => {
    const data = useSelector(store => store.axios[INGREDIENTS_URL]?.data);

    return data && (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <BurgerIngredients />
                </div>
                <div className={styles.col}>
                    <BurgerConstructor />
                </div>
            </div>
        </DndProvider>
    );
};

export default Constructor;