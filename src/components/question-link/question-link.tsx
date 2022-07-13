import React, { FC } from 'react';
import styles from './question-link.module.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface IQuestionLinkClasses {
    readonly root?: string;
    readonly link?: string;
};

export interface IQuestionLinkProps {
    readonly classes?: IQuestionLinkClasses;
    readonly question: string;
    readonly to: string;
    readonly text: string;
};

export const QuestionLink: FC<IQuestionLinkProps> = ({classes, question, to, text}) => (
    <div className={classNames(styles.root, classes && classes.root)}>
        <p className="text text_type_main-default text_color_inactive">{question}</p>
        <Link to={to} className={classNames(styles.link, classes && classes.link)}>{text}</Link>
    </div>
);