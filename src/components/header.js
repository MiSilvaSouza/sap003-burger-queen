import React from 'react';
import logo from './logo.png';
import { StyleSheet, css } from 'aphrodite';

export default function Header () {
  return (
    <header className={css(styles.header)}>
      <img src={logo} className={css(styles.logo)} alt='logo'/>
      <h1>Burger Queen</h1>
      <img src={logo} className={css(styles.logo)} alt='logo'/>
    </header>
  )
};

const styles = StyleSheet.create({
  header: {
    width: '100%' ,
    height: '100%',
    background: '#D0A991',
    color: '#3B1910',
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    padding: '20px',
  },

})

