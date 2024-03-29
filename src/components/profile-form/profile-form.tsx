import React, { useState } from 'react';
import styles from './profile-form.module.css'
import EditInput from '../../components/edit-input/edit-input';
import Form from '../../components/form/form';
import { USER_URL } from '../../utils/urls';
import { useSelector } from '../../services/hooks';
import { TUserData, TUserResponse, TResponseErrorDefault } from '../../services/types';

const ProfileForm = () => {
    const user = useSelector<TUserData | undefined, TUserResponse>(
        store => store.axios[USER_URL]?.data?.user
    );
    const [emailError, setEmailError] = useState<string | null>(null);
    const [generalError, setGeneralError] = useState<string | null>(null);

    const onSuccess = (data: TUserResponse | null | undefined) : void => {
        setEmailError(null);
        if (!data?.success) {
            setGeneralError(
                data?.message || 
                'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
            );   
        }
    }
    
    const onError = (error: TResponseErrorDefault) => {
        if (error.message === 'User with such email already exists') {
            setEmailError('Пользователь с таким E-mail уже существует');
        } else {
            setGeneralError(
                error.message || 
                'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
            );
        }
    }

    const emailErrorProps = emailError ? { error: true, errorText: emailError } : { };

    return (
        <Form action={USER_URL} method='patch' onError={onError} onSuccess={onSuccess} errorText={generalError} classes={{root: styles.root}}>
            <EditInput type="text" placeholder="Имя" name="name" initial={user?.name} />
            <EditInput type="email" placeholder="Логин" name="email" initial={user?.email} {...emailErrorProps} />
            <EditInput type="password" placeholder="Пароль" name="password" />
        </Form>
    )
}

export default ProfileForm;