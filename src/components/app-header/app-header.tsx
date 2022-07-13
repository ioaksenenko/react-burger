import React, { useEffect } from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavLink from '../nav-link/nav-link';
import { useSelector } from 'react-redux';
import { USER_URL } from '../../utils/urls';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';

const AppHeader = () => {
    const { getUser } = useAuth();
    const user = useSelector<IAxiosStore<TUserResponse>, TUserData>(store => store.axios[USER_URL]?.data?.user);

    useEffect(
        () => {
            getUser();
        },
        [getUser]
    );

    return (
        <nav className={styles.nav}>
            <NavLink exact to="/" icon={<BurgerIcon type="primary" />} text="Конструктор" />
            <NavLink to="/order-feed" icon={<ListIcon type="primary" />} text="Лента заказов" />
            <Link to="/" className={styles.logo}><Logo /></Link>
            <NavLink to="/profile" icon={<ProfileIcon type="primary" />} text={user ? user.name : "Личный кабинет"} />
        </nav>
    );
};

export default AppHeader;