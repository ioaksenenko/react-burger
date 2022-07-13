import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { request, clearResponse } from "../services/actions/axios";
import { USER_URL, LOGIN_URL, LOGOUT_URL } from "../utils/urls";
import { setCookie, deleteCookie } from "../utils/cookie";
import { setModalTitle, setModalContent, openModal } from "../services/actions/modal";
import { forbidAll } from "../services/actions/protected-route";
import ErrorMessage from "../components/error-message/error-message";

const useAuth = () => {
    const dispatch = useDispatch();

    const handleError = (message: string | null) => {
        dispatch(setModalTitle('Ошибка'));
        dispatch(setModalContent(
            <ErrorMessage>
                {message ? (
                    <p className="text text_type_main-medium mt-5">{message}</p>
                ) : (
                    <>
                        <p className="text text_type_main-medium mt-5">Во время запроса произошла ошибка.</p>
                        <p className="text text_type_main-medium mt-5">Попробуйте повторить запрос позже.</p>
                    </>
                )}
            </ErrorMessage>
        ));
        dispatch(openModal());
    }

    const getUser = useCallback((
        onSuccess: TSuccessCallback<TUserResponse> | null = null, 
        onError: TErrorCallback<TErrorDefault> | null = null
    ) => {
        request({
            method: 'get',
            url: USER_URL
        }, (data: TUserResponse) => {
            onSuccess && onSuccess(data);
        }, (error: TErrorDefault) => {
            onError && onError(error);
        })(dispatch);
    }, [dispatch]);

    const onLoginSuccess = (data: TLoginResponse) => {
        window.localStorage.setItem('refreshToken', data.refreshToken);
        setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
    }

    const onLoginError = (error: TErrorDefault) => {
        let message = null;
        if (error.message === 'email or password are incorrect') {
            message = 'Некорректный e-mail или пароль';
        }
        handleError(message);
    }

    type TLogin = (
        email: string,
        password: string,
        onSuccess: TSuccessCallback<TLoginResponse>,
        onError: TErrorCallback<TErrorDefault>,
    ) => void;
    
    const login: TLogin = (email, password, onSuccess, onError) => {
        request({
            method: 'post',
            url: LOGIN_URL,
            data: {
                email,
                password
            }
        }, (data: TLoginResponse) => {
            onLoginSuccess(data);
            onSuccess && onSuccess(data);
        }, (error: TErrorDefault) => {
            onLoginError(error);
            onError && onError(error);
        })(dispatch);
    }

    const onLogoutSuccess = (data: TLogoutResponse) => {
        if (data?.success) {
            deleteCookie('accessToken');
            window.localStorage.removeItem('refreshToken');
            dispatch(clearResponse(USER_URL));
            dispatch(forbidAll());
        }
    }

    const onLogoutError = (error: TErrorDefault) => {
        handleError('Не удалось выйти.');
    }

    type TLogout = (
        onSuccess?: TSuccessCallback<TLogoutResponse> | null, 
        onError?: TErrorCallback<TErrorDefault> | null
    ) => void;

    const logout: TLogout = (onSuccess = null, onError = null) => {
        const refreshToken = window.localStorage.getItem('refreshToken');
        request({
            method: 'post',
            url: LOGOUT_URL,
            data: { token: refreshToken }
        }, (data: TLogoutResponse) => {
            onLogoutSuccess(data);
            onSuccess && onSuccess(data);
        }, (error: TErrorDefault) => {
            onLogoutError(error);
            onError && onError(error);
        })(dispatch);
    }

    return { getUser, login, logout };
}

export default useAuth;