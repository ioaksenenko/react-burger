import React, { useState } from 'react';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import Form from '../../components/form/form';
import { LOGIN_URL } from '../../utils/urls';
import { setCookie } from '../../utils/cookie';
import { useHistory, useLocation } from 'react-router-dom';
import { ILocationState, TLoginResponse, TResponseErrorDefault } from '../../services/types';

const LoginPage = () => {
    const links = [{
        classes: { root: styles.register },
        question: 'Вы - новый пользователь?',
        to: '/register',
        text: 'Зарегистрироваться'
    },{
        classes: { root: styles.forgotPassword },
        question: 'Забыли пароль?',
        to: '/forgot-password',
        text: 'Восстановить пароль'
    }];

    const [generalError, setGeneralError] = useState<string | null>(null);

    const history = useHistory();

    const location = useLocation<ILocationState>();

    const onSuccess = (data: TLoginResponse | null | undefined) => {
        if (data?.success) {
            window.localStorage.setItem('refreshToken', data.refreshToken);
            setCookie('accessToken', data.accessToken.split('Bearer ')[1], {path: '/'});
            history.replace(location.state?.from || '/');
        } else {
            setGeneralError(
                data?.message || 
                'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
            );
        }
    }

    const onError = (error: TResponseErrorDefault) => {
        if (error.message === 'email or password are incorrect') {
            setGeneralError('Некорректный e-mail или пароль');
        } else {
            setGeneralError(
                error.message || 
                'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
            );
        }
    }

    const handleInputChange = () => { };

    return (
        <Form 
            action={LOGIN_URL}
            title="Вход"
            buttonChildren="Войти"
            links={links}
            onSuccess={onSuccess}
            onError = {onError}
            errorText={generalError}
        >
            <Input type="email" name="email" placeholder="E-mail" value='' onChange={handleInputChange} />
            <PasswordInput name="password" value='' onChange={handleInputChange} />
        </Form>
    );
}

export default LoginPage;