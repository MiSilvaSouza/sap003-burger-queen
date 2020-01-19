import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';

export default function NavKitchen() {

  return (
    <div>
      <h1 className={css(styles.h1)}>PEDIDOS</h1>
      <nav className={css(styles.nav)}>
        <Link to='/kitchen' className={css(styles.link, styles.hover)}>PENDENTES</Link>
        <Link to='/ready' className={css(styles.link, styles.hover)}>PRONTOS</Link>
        <Link to='/delivered' className={css(styles.link, styles.hover)}>ENTREGUES</Link>
      </nav>
      <span className={css(styles.pagesOrder, styles.hover)}></span>      
    </div>
  )
};

const styles = StyleSheet.create({
  h1: {
    textAlign: 'center',
    background: '#3B1910',
    color: '#EEECE6',
    padding: '10px',
  },

  nav: {
    display: 'flex',
    justifyContent:'space-between',
    marginRight: '120px',
    marginLeft: '120px', 
  },

  pagesOrder: {    
    display: 'flex',
    justifyContent: 'space-between',    
    marginTop: '15px',
    marginLeft: '150px',
    marginRight: '150px',
  },

  link: {
    marginTop: '10px',            
    padding: '20px',     
    textAlign: 'center',    
    border: 'none',  
    borderRadius: '5px',
    cursor: 'pointer',
    background: '#3B1910',
    color: '#EEECE6',
    fontSize: '20px',
    fontWeight: 'bold',
    textDecoration: 'none',
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)' 
  },

  hover: {
    ':hover': {
        opacity: 0.7,
    }
},   
 
});
