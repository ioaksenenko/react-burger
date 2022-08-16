import React, { cloneElement, FC, MouseEventHandler, ReactElement } from 'react';
import styles from './nav-link.module.css';
import { Link, useRouteMatch } from "react-router-dom";
import classNames from 'classnames';

interface INavLinkProps {
    readonly to: string,
    readonly icon?: ReactElement,
    readonly text: string,
    readonly exact?: boolean,
    readonly classes?: {
        link: string,
        text: string
    },
    readonly onClick?: MouseEventHandler
};

const NavLink : FC<INavLinkProps> = ({to, icon, text, exact, classes, onClick}) => {
    const match = useRouteMatch(to);
    const active = match && (!exact || match.isExact);

    return (
        <Link to={to} className={classNames(styles.link, classes && classes.link)} onClick={onClick}>
            {icon && cloneElement(icon, {type: active ? "primary" : "secondary"})}
            <p data-testid="nav-link" className={classNames(
                "text", 
                classes && classes.text ? classes.text : " text_type_main-default",
                active ? styles.active : "text_color_inactive"
            )}>{text}</p>
        </Link>
    );
};

export default NavLink;