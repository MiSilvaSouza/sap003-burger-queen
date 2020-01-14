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
}

const styles = StyleSheet.create({
  
  nav: {  
    margin: '0',
    padding: '0',
    listStyle: 'none',
    overflow: 'hidden',     
  },
  
  li: {  
    float: 'left',     
  },

  link: {
    display: 'block',
    color: '#3B1910',
    textAlign: 'center',
    padding: '16px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },

  hover: {
    ':hover': {
      opacity: 0.7,
    }
  }  
 
});