import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default function Button(props) {

  return (
    <button 
      onClick={props.onClick}
      value={props.value} 
      id={props.id}    
      className={props.className || css(styles.button, styles.hover)} 
      >
      {props.title}
    </button>
  ) 
};

const styles = StyleSheet.create({ 

  button: {
    display: 'flex',
    justifyContent: 'space-between',    
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
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'      
  },

  hover: {
    ':hover': {
        opacity: 0.7,
    }
},
});
