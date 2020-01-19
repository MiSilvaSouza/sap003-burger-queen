import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

export default function Nav() {
  return (
    <nav>
      <ul className={css(styles.nav)}>
        <li className={css(styles.li)}>
          <Link to='/saloon' className={css(styles.link, styles.hover)}>Salão</Link>
        </li>
        <li className={css(styles.li)}>
          <Link to='/kitchen' className={css(styles.link, styles.hover)}>Cozinha</Link>
        </li>          
      </ul>
    </nav>
  )
};

const styles = StyleSheet.create({
  
  nav: {  
    margin: '0px',
    padding: '0px',
    listStyle: 'none',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',       
  },
  
  li: {        
    padding: '10px',        
  },

  link: {
    width: '100px',
    display: 'block',
    color: '#3B1910',
    textAlign: 'center',
    padding: '16px',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    border: '2px solid #408603'    
  },

  hover: {
    ':hover': {
      opacity: 0.7,
      background: '#408603',
      color: '#EEECE6',
    }
  }  
 
});