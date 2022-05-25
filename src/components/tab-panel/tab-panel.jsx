import React from 'react';
import styles from './tab-panel.module.css';
import classNames from 'classnames';

const TabPanel = ({children, active, ...props}) => {
  return (
    <div className={styles.root} {...props}>
        {children}
    </div>
  );
}

export default TabPanel;