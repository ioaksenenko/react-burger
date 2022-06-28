import React, { useEffect, useCallback } from "react";
import { Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";
import { useSelector, useDispatch } from 'react-redux';
import { PASSWORD_RESET_URL } from "../../utils/urls";
import { useHistory, useRouteMatch } from "react-router-dom";
import { allowRoute } from "../../services/actions/protected-route";

const ProtectedRoute = ({auth, ...params}) => {
    const { getUser } = useAuth();
    const location = useLocation();
    const passwordResetResponse = useSelector(store => store.axios[PASSWORD_RESET_URL]?.data);
    const history = useHistory();
    const isResetPassword = useRouteMatch('/reset-password');
    const allow = useSelector(store => store.route[params.path]);
    const dispatch = useDispatch();
    
    const onSuccess = useCallback(
        () => {
            if (!auth) {
                history.goBack();
            } else {
                dispatch(allowRoute(params.path));
            }
        },
        [auth, history, dispatch, params.path]
    );

    const onError = useCallback(
        () => {
            if (auth) {
                history.push({
                    pathname: '/login',
                    state: { from: location }
                });
            } else if (isResetPassword && !passwordResetResponse?.success) {
                history.goBack();
            } else {
                dispatch(allowRoute(params.path));
            }
        },
        [auth, history, location, passwordResetResponse?.success, isResetPassword, dispatch, params.path]
    );

    useEffect(
        () => {
            getUser(onSuccess, onError);
        },
        [getUser, onSuccess, onError]
    );

    return allow && <Route {...params} />;
}

export default ProtectedRoute;