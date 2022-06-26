import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { request } from "../services/actions/axios";
import { USER_URL, LOGIN_URL, LOGOUT_URL } from "../utils/urls";
import { setCookie, deleteCookie } from "../utils/cookie";
import { setModalTitle, setModalContent, openModal } from "../services/actions/modal";
import ErrorMessage from "../components/error-message/error-message";

const useAuth = () => {
    const dispatch = useDispatch();

    const handleError = (message) => {
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

    const getUser = useCallback(
        (onSuccess, onError) => {
            dispatch(request({
                method: 'get',
                url: USER_URL
            }, (data) => {
                onSuccess && onSuccess(data);
            }, (error) => {
                onError && onError(error);
            }));
        },
        [dispatch]
    );

    const onLoginSuccess = (data) => {
        window.localStorage.setItem('refreshToken', data.refreshToken);
        setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
    }

    const onLoginError = (error) => {
        let message = null;
        if (error === 'email or password are incorrect') {
            message = 'Некорректный e-mail или пароль';
        }
        handleError(message);
    }
    
    const login = (email, password, onSuccess, onError) => {
        dispatch(request({
            method: 'post',
            url: LOGIN_URL,
            data: {
                email,
                password
            }
        }, (data) => {
            onLoginSuccess(data);
            onSuccess && onSuccess(data);
        }, (error) => {
            onLoginError(error);
            onError && onError(error);
        }));
    }

    const onLogoutSuccess = (data) => {
        if (data?.success) {
            deleteCookie('accessToken');
            window.localStorage.removeItem('refreshToken');
        }
    }

    const onLogoutError = (error) => {
        handleError('Не удалось выйти.');
    }

    const logout = (onSuccess, onError) => {
        const refreshToken = window.localStorage.getItem('refreshToken');
        dispatch(request({
            method: 'post',
            url: LOGOUT_URL,
            data: { token: refreshToken }
        }, (data) => {
            onLogoutSuccess(data);
            onSuccess && onSuccess(data);
        }, (error) => {
            onLogoutError(error);
            onError && onError(error);
        }));
    }

    return { getUser, login, logout };
}

export default useAuth;