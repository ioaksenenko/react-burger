import React from 'react';
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

    const onSuccess = () => {
        history.push('/reset-password');
    }

    return (
        <Form 
            action={PASSWORD_RESET_URL} 
            title="Восстановление пароля" 
            buttonChildren="Восстановить" 
            links={links} 
            onSuccess={onSuccess}
        >
            <Input type="email" name="email" placeholder="Укажите e-mail" value='' />
        </Form>
    );
};

export default ForgotPasswordPage;