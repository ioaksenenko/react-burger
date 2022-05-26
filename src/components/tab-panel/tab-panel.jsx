import React from 'react';
import styles from './tab-panel.module.css';
import PropTypes from 'prop-types';

const TabPanel = ({children, ...props}) => {
  return (
    <div className={styles.root} {...props}>
        {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default TabPanel;