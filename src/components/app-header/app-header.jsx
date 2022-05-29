import React from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavLink from '../nav-link/nav-link';

const AppHeader = () => (
    <nav className={styles.nav}>
        <NavLink to="/" icon={<BurgerIcon />} text="Конструктор" />
        <NavLink to="orders" icon={<ListIcon />} text="Лента заказов" />
        <div className={styles.logo}><Logo /></div>
        <NavLink to="profile" icon={<ProfileIcon />} text="Личный кабинет" />
    </nav>
);

export default AppHeader;