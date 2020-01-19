import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default function Header (props) {
  return (
    <header className={css(styles.header)}>
      <img src={props.img} className={props.className || css(styles.logo)} alt={props.alt} />
      <h1>{props.title}</h1>
      <img src={props.img} className={props.className || css(styles.logo)} alt={props.alt} />
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

});

