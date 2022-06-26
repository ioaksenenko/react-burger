import React from "react";
import EditInput from '../../components/edit-input/edit-input';
import Form from '../../components/form/form';
import { USER_URL } from '../../utils/urls';
import { useSelector } from "react-redux";

const ProfileForm = () => {
    const user = useSelector(store => store.axios[USER_URL]?.data?.user);

    return (
        <Form action={USER_URL} method='patch'>
            <EditInput type="text" placeholder="Имя" name="name" initial={user?.name} />
            <EditInput type="email" placeholder="Логин" name="email" initial={user?.email} />
            <EditInput type="password" placeholder="Пароль" name="password" />
        </Form>
    )
}

export default ProfileForm;