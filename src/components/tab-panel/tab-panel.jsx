import React from 'react';
import styles from './tab-panel.module.css';
import PropTypes from 'prop-types';

const TabPanel = ({children, setActiveTab}) => {
  const setClosestActiveTab = (e) => {
    const scrollTop = e.target.scrollTop;
    let minDifference = NaN;
    let closestElementId = null;
    for (const child of children) {
      const element = document.getElementById(child.props.id);
      const positionTop = element.offsetTop - e.target.offsetTop;
      const difference = Math.abs(scrollTop - positionTop);
      if (isNaN(minDifference) || difference < minDifference) {
        minDifference = difference;
        closestElementId = child.props.id;
      }
    }
    setActiveTab(closestElementId);
  }

  return (
    <div className={styles.root} onScroll={setClosestActiveTab}>
      {children}
    </div>
  )
};

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  setActiveTab: PropTypes.func.isRequired
};

export default TabPanel;