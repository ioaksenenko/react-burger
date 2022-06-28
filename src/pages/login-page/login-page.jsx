import React, { useState } from 'react';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import Form from '../../components/form/form';
import { LOGIN_URL } from '../../utils/urls';
import { setCookie } from '../../utils/cookie';
import { useHistory, useLocation } from 'react-router-dom';

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

    const [generalError, setGeneralError] = useState(null);

    const history = useHistory();

    const location = useLocation();

    const onSuccess = (data) => {
        if (data?.success) {
            window.localStorage.setItem('refreshToken', data.refreshToken);
            setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
            history.replace(location.state?.from || '/');
        } else {
            setGeneralError(
                data?.message || 
                'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
            );
        }
    }

    const onError = (error) => {
        if (error === 'email or password are incorrect') {
            setGeneralError('Некорректный e-mail или пароль');
        } else {
            setGeneralError(
                error || 
                'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
            );
        }
    }

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
            <Input type="email" name="email" placeholder="E-mail" value='' />
            <PasswordInput name="password" />
        </Form>
    );
}

export default LoginPage;