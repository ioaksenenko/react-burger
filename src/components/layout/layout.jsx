import React from 'react';
import { Outlet } from "react-router-dom";
import AppHeader from '../app-header/app-header';
import styles from './layout.module.css';

const Layout = () => (
  <>
  <header className={styles.header}><AppHeader /></header>
  <main className={styles.main}><Outlet /></main>
  <footer className={styles.footer}></footer>
  </>
);

export default Layout;