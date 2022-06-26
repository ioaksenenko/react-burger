import React, { useEffect, useState, useCallback } from "react";
import { Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";
import { useSelector } from 'react-redux';
import { PASSWORD_RESET_URL } from "../../utils/urls";
import { useHistory, useRouteMatch } from "react-router-dom";

const ProtectedRoute = ({auth, ...params}) => {
    const { getUser } = useAuth();
    const location = useLocation();
    const passwordResetResponse = useSelector(store => store.axios[PASSWORD_RESET_URL]?.data);
    const history = useHistory();
    const [renderRoute, setRenderRoute] = useState(false);
    const isResetPassword = useRouteMatch('/reset-password');
    
    const onSuccess = useCallback(
        () => {
            if (!auth) {
                history.push({
                    pathname: '/',
                    state: { from: location }
                });
                return;
            }
            setRenderRoute(true);
        },
        [auth, history, location]
    );

    const onError = useCallback(
        () => {
            if (auth) {
                history.push({
                    pathname: '/login',
                    state: { from: location }
                });
                return;
            }
            if (isResetPassword && !passwordResetResponse?.success) {
                history.goBack();
                return;
            }
            setRenderRoute(true);
        },
        [auth, history, location, passwordResetResponse?.success, isResetPassword]
    );

    useEffect(
        () => {
            getUser(onSuccess, onError);
        },
        [getUser, onSuccess, onError]
    );

    return (
        renderRoute && <Route {...params} />
    );
}

export default ProtectedRoute;