import React, { cloneElement } from 'react';
import styles from './nav-link.module.css';
import { Link, useMatch } from "react-router-dom";
import classNames from 'classnames';
import PropTypes from 'prop-types';

const NavLink = ({to, icon, text}) => {
    const match = useMatch(to);

    return (
        <Link to={to} className={match ? classNames(styles.link, styles.active) : styles.link}>
            {cloneElement(icon, {type: match ? "primary" : "secondary"})}<span className={styles.text}>{text}</span>
        </Link>
    );
};

NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired
};

export default NavLink;