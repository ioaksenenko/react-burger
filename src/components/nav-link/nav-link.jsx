import React, { cloneElement } from 'react';
import styles from './nav-link.module.css';
import { Link, useRouteMatch } from "react-router-dom";
import classNames from 'classnames';
import PropTypes from 'prop-types';

const NavLink = ({to, icon, text, exact, classes, component}) => {
    const match = useRouteMatch(to);
    const active = match && (!exact || match.isExact);

    return (
        <Link to={to} className={classNames(styles.link, classes && classes.link)} component={component}>
            {icon && cloneElement(icon, {type: active ? "primary" : "secondary"})}
            <p className={classNames(
                "text", 
                classes && classes.text ? classes.text : " text_type_main-default",
                active ? styles.active : "text_color_inactive"
            )}>{text}</p>
        </Link>
    );
};

export const classesPropTypes = PropTypes.shape({
    link: PropTypes.string,
    text: PropTypes.string
});

NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.element,
    text: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    classes: classesPropTypes,
    component: PropTypes.object
};

export default NavLink;