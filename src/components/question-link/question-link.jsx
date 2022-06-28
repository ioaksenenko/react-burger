import React from 'react';
import styles from './question-link.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const QuestionLink = ({classes, question, to, text}) => (
    <div className={classNames(styles.root, classes && classes.root)}>
        <p className="text text_type_main-default text_color_inactive">{question}</p>
        <Link to={to} className={classNames(styles.link, classes && classes.link)}>{text}</Link>
    </div>
);

export const classesPropTypes = PropTypes.shape({
    root: PropTypes.string,
    link: PropTypes.string
});

QuestionLink.propTypes = {
    classes: classesPropTypes,
    question: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}