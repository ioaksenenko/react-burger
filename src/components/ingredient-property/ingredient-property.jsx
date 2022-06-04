import React from 'react';
import styles from './ingredient-property.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IngredientProperty = ({name, value}) => (
    <div className={styles.root}>
        <p className={classNames("text text_type_main-default text_color_inactive", styles.name)}>{name}</p>
        <p className={classNames("text text_type_main-default text_color_inactive", styles.value)}>{value}</p>
    </div>
);

IngredientProperty.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
};

export default IngredientProperty;