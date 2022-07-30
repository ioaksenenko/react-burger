import React, { FC } from 'react';
import styles from './stat-measure.module.css';
import classNames from 'classnames';

export type TStatMeasureProps = {
    readonly title: string;
    readonly value: number;
};

export const StatMeasure: FC<TStatMeasureProps> = ({title, value}) => (
    <div className={styles.root}>
        <p className={classNames("text text_type_main-medium", styles.title)}>{title}</p>
        <p className={classNames("text text_type_digits-large", styles.value)}>{value}</p>
    </div>
);