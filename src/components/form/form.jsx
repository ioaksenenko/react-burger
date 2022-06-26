import React, { Children, cloneElement, useEffect, useMemo } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form.module.css';
import { QuestionLink, classesPropTypes } from '../question-link/question-link';
import { useSelector, useDispatch } from 'react-redux';
import { setValue } from '../../services/actions/form';
import PropTypes from 'prop-types';
import { withAxios } from '../hocs';
import classNames from 'classnames';
import { sendRequest } from '../../services/actions/axios';
import { clearForm } from '../../services/actions/form';

const Form = ({method, action, title, links, buttonChildren, children, onSuccess, onError, errorText}) => {
    const dispatch = useDispatch();
    const form = useSelector(store => store.form[action]?.data);

    const handleSuccess = (data) => {
        onSuccess && onSuccess(data);
        dispatch(clearForm(action));
    }

    const WithAxiosButton = withAxios({
        method: method,
        url: action,
        data: form
    }, handleSuccess, onError)(Button);

    const fields = useMemo(
        () => Array.isArray(children) ? children : [children],
        [children]
    );

    const onChange = e => {
        dispatch(setValue(action, e.target.name, e.target.value));
    }

    useEffect(
        () => {
            for (let field of fields) {
                if (field.props.initial) {
                    dispatch(setValue(action, field.props.name, field.props.initial));
                }
            }
        },
        [dispatch, fields, action]
    );

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(sendRequest(action));
    }

    return (
        <>
        {title && <p className={classNames("text text_type_main-medium", styles.title)}>{title}</p>}
        <form className={classNames(styles.form, errorText && styles.error)} onSubmit={handleSubmit}>
            {errorText && <p className={classNames("text text_type_main-default", styles.errorText)}>{errorText}</p>}
            {Children.map(
                fields, 
                field => cloneElement(
                    field, {
                        value: (form && form[field.props.name]) || '',
                        onChange,
                        url: action
                    }
                )
            )}
            <div className={classNames(styles.button, !buttonChildren && styles.hide)}>
                <WithAxiosButton type="primary" size="medium">{buttonChildren}</WithAxiosButton>
            </div>
        </form>
        {links && links.map((link, index) => <QuestionLink key={index} {...link} />)}
        </>
    );
};

Form.defaultProps = {
    method: 'post'
};

const linkPropTypes = PropTypes.shape({
    classes: classesPropTypes,
    question: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
});

Form.propTypes = {
    method: PropTypes.oneOf(['post', 'patch']),
    action: PropTypes.string.isRequired,
    title: PropTypes.string,
    links: PropTypes.arrayOf(linkPropTypes),
    buttonChildren: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string
    ]),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    errorText: PropTypes.string
}

export default Form;