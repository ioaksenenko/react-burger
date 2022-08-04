import React from 'react';
import styles from './profile-page.module.css';
import { Switch, Route } from 'react-router-dom';
import OrderHistoryPage from '../order-history-page/order-history-page';
import NavLink from '../../components/nav-link/nav-link';
import classNames from 'classnames';
import ProfileForm from '../../components/profile-form/profile-form';
import { useAuth } from '../../hooks';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { MouseEventHandler } from 'react';
import { ILocationState } from '../../services/types';
import OrderPage from '../order-page/order-page';
import { WS_ORDERS_USER_URL } from '../../utils/urls';
import { withSocket } from '../../components/hocs';

const ProfilePageContent = () => {
    const { logout } = useAuth();
    const history = useHistory();
    const match = useRouteMatch('/profile/orders/:id');

    const onLogoutSuccess = () => {
        history.replace('/');
    }
    
    const handleLogoutClick : MouseEventHandler = e => {
        e.preventDefault();
        logout(onLogoutSuccess);
    };

    const location = useLocation<ILocationState>();

    const background = location.state?.background;

    return (
        <div className={styles.root}>
            {(background || !match?.isExact) && (
                <div className={styles.links}>
                    <NavLink exact to="/profile" text="Профиль" classes={{ link: styles.link, text: 'text_type_main-medium' }} />
                    <NavLink to="/profile/orders" text="История заказов" classes={{ link: styles.link, text: 'text_type_main-medium' }} />
                    <NavLink exact to='/' text="Выход" classes={{ link: styles.link, text: 'text_type_main-medium' }} onClick={handleLogoutClick} />
                    <p className={classNames("text text_type_main-default text_color_inactive", styles.hint)}>
                        В этом разделе вы можете <br /> изменить свои персональные данные
                    </p>
                </div>
            )}
            <div className={styles.routes}>
                <Switch>
                    <Route exact path="/profile">
                        <ProfileForm />
                    </Route>
                    <Route exact path="/profile/orders">
                        <OrderHistoryPage />
                    </Route>
                    <Route exact path="/profile/orders/:id">
                        {background ? <OrderHistoryPage /> : <OrderPage />}
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

const WithSocketProfilePageContent = withSocket(WS_ORDERS_USER_URL)(ProfilePageContent);

const ProfilePage = () => (
    <WithSocketProfilePageContent />
);

export default ProfilePage;