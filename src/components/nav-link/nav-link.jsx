import React from 'react';
import styles from './nav-link.module.css';
import { Link, useMatch } from "react-router-dom";
import classNames from 'classnames';

const NavLink = ({to, icon, text, ...props}) => {
    const match = useMatch(to);

    return (
        <Link to={to} className={match ? classNames(styles.link, styles.active) : styles.link} {...props}>
            {React.cloneElement(icon, {type: match ? "primary" : "secondary"})}<span className={styles.text}>{text}</span>
        </Link>
    );
}

export default NavLink;