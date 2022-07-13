import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found-page.module.css';
import nfoIcon from '../../images/nfo.svg';

const NotFoundPage = () => (
    <div className={styles.root}>
        <img src={nfoIcon} alt="page not found" />
        <p className="text text_type_digits-large">404</p>
        <p className="text text_type_main-large">Страница не найдена</p>
        <Link to='/' className={styles.link}>Перейти на главную страницу</Link>
    </div>
);

export default NotFoundPage;