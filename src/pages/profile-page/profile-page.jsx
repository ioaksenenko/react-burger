import React, { forwardRef } from 'react';
import styles from './profile-page.module.css';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import OrderHistoryPage from '../order-history-page/order-history-page';
import NavLink from '../../components/nav-link/nav-link';
import classNames from 'classnames';
import ProfileForm from '../../components/profile-form/profile-form';
import { useAuth } from '../../hooks';
import { useHistory } from 'react-router-dom';

const ProfilePage = () => {
    const { path, url } = useRouteMatch();
    const { logout } = useAuth();
    const history = useHistory();

    const onLogoutSuccess = () => {
        history.replace('/');
    }
    
    const handleLogoutClick = (e) => {
        e.preventDefault();
        logout(onLogoutSuccess);
    };

    const LogoutLink = forwardRef(
        ({ navigate, ...props }, ref) => (
            <a ref={ref} {...props} onClick={handleLogoutClick}>{props.children}</a>
        )
    );

    return (
        <div className={styles.root}>
            <div className={styles.links}>
                <NavLink exact to={`${url}`} text="Профиль" classes={{ link: styles.link, text: 'text_type_main-medium' }} />
                <NavLink to={`${url}/orders`} text="История заказов" classes={{ link: styles.link, text: 'text_type_main-medium' }} />
                <NavLink exact to='/' text="Выход" classes={{ link: styles.link, text: 'text_type_main-medium' }} component={LogoutLink} />
                <p className={classNames("text text_type_main-default text_color_inactive", styles.hint)}>
                    В этом разделе вы можете <br /> изменить свои персональные данные
                </p>
            </div>
            <div className={styles.routes}>
                <Switch>
                    <Route exact path={path}>
                        <ProfileForm />
                    </Route>
                    <Route exact path={`${path}/orders`}>
                        <OrderHistoryPage />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default ProfilePage;