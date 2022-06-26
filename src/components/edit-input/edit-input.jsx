import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './edit-input.module.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { sendRequest } from '../../services/actions/axios';
import { USER_URL } from '../../utils/urls';
import PropTypes from 'prop-types';

const EditInput = ({type, placeholder, name, value, onChange, url}) => {
    const inputRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const form = useSelector(store => store.form[url]?.data);
    const user = useSelector(store => store.axios[USER_URL]?.data?.user);

    const onIconClick = () => {
        inputRef.current.removeAttribute('disabled');
        inputRef.current.focus();
        setDisabled(false);
    }

    const disableInput = useCallback(
        () => {
            inputRef.current.setAttribute('disabled', true);
            setDisabled(true);
        },
        []
    );

    useEffect(
        () => {
            if (disabled && user && form && form[name] !== user[name]) {
                dispatch(sendRequest(url));
            }
        },
        [disabled, dispatch, form, name, url, user]
    );

    useEffect(
        () => {
            disableInput();
            let ref = inputRef.current;
            ref.addEventListener("blur", disableInput, false);
            return () => {
                ref.removeEventListener("blur", disableInput, false);
            }
        }, 
        [disableInput]
    );

    return (
        <div className={classNames(styles.root, disabled && styles.disabled)}>
            <Input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value || ''}
                icon="EditIcon"
                name={name}
                ref={inputRef}
                onIconClick={onIconClick}
                size="default"
            />
        </div>
    );
};

EditInput.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    url: PropTypes.string
};

export default EditInput;