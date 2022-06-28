import React, { useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password-page.module.css';
import Form from '../../components/form/form';
import { PASSWORD_RESET_URL } from '../../utils/urls';
import { useHistory } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const links = [{
        classes: { root: styles.login },
        question: 'Вспомнили пароль?',
        to: '/login',
        text: 'Войти'
    }];

    const history = useHistory();

    const [generalError, setGeneralError] = useState(null);

    const onSuccess = (data) => {
        if (data?.success) {
            history.push('/reset-password');
        } else {
            setGeneralError(
                data?.message || 
                'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
            );
        }
    }

    const onError = (error) => {
        setGeneralError(
            error || 
            'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
        );
    }

    return (
        <Form 
            action={PASSWORD_RESET_URL} 
            title="Восстановление пароля" 
            buttonChildren="Восстановить" 
            links={links} 
            onSuccess={onSuccess}
            onError={onError}
            errorText={generalError}
        >
            <Input type="email" name="email" placeholder="Укажите e-mail" value='' />
        </Form>
    );
};

export default ForgotPasswordPage;