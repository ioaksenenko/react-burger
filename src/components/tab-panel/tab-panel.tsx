import React, { FC, Dispatch, SetStateAction, ReactElement, UIEvent } from 'react';
import styles from './tab-panel.module.css';

interface ITabPanelProps {
  children: ReadonlyArray<ReactElement>;
  setActiveTab: Dispatch<SetStateAction<string>>;
};

const TabPanel: FC<ITabPanelProps> = ({children, setActiveTab}) => {
  const setClosestActiveTab = (e: UIEvent<HTMLDivElement>) => {
    const scrollTop = (e.target as HTMLElement).scrollTop;
    let minDifference = NaN;
    let closestElementId = null;
    for (let child of children) {
      const element = document.getElementById(child?.props.id);
      if (element) {
        const positionTop = element.offsetTop - (e.target as HTMLElement).offsetTop;
        const difference = Math.abs(scrollTop - positionTop);
        if (isNaN(minDifference) || difference < minDifference) {
          minDifference = difference;
          closestElementId = child.props.id;
        }
      }
    };
    if (closestElementId) {
      setActiveTab(closestElementId);
    }
  }

  return (
    <div className={styles.root} onScroll={setClosestActiveTab}>
      {children}
    </div>
  )
};

export default TabPanel;