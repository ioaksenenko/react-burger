import React, { FC, ReactNode } from 'react';
import AppHeader from '../app-header/app-header';
import styles from './layout.module.css';

interface ILayoutProps {
  children: ReactNode;
}

const Layout : FC<ILayoutProps> = ({children}) => (
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

export default Layout;