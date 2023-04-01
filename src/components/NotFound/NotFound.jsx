import React from 'react';
import styles from './NotFound.module.css'
import Error from '../../assets/images/page-not-found.png'

const NotFound = () => {
  return (
    <>
    <div className="container">
      <div className="w-50 mx-auto my-2">
        <img src={Error} className=' w-100' alt="" />
      </div>
    </div>
    </>
  );
}

export default NotFound;
