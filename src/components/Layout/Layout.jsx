import React from 'react';
import styles from './Layout.module.css'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />

      <Footer />
    </>
  );
}

export default Layout;
