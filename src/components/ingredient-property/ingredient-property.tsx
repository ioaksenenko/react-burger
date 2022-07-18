import React, { FC } from 'react';
import styles from './ingredient-property.module.css';
import classNames from 'classnames';

interface IIngredientPropertyProps {
    name: string;
    value?: number;
};

const IngredientProperty : FC<IIngredientPropertyProps> = ({name, value}) => (
    <div className={styles.root}>
        <p className={classNames("text text_type_main-default text_color_inactive", styles.name)}>{name}</p>
        <p className={classNames("text text_type_main-default text_color_inactive", styles.value)}>{value}</p>
    </div>
);

export default IngredientProperty;