import React from 'react';
import styles from './Header.module.scss';
const Header = () => {
  return (
    <div>
      <div className={styles.space}></div>
      <div className={styles.headerContent}>
        <h1>BOGO</h1>
        <button>알람</button>
      </div>
    </div>
  );
};

export default Header;
