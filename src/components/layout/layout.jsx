import React from 'react';
import AppHeader from '../app-header/app-header';
import styles from './layout.module.css';
import PropTypes from 'prop-types';

const Layout = ({children}) => (
  <>
    <header className={styles.header}>
      <AppHeader />
    </header>
    <main className={styles.main}>
      {children}
    </main>
    <footer className={styles.footer}></footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Layout;