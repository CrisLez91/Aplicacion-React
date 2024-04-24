import React, { Component } from 'react';
import Portal from './Portal';

// Componente de clase
class Modal extends Component {

  
  render() {

    const {children , toggle , active} = this.props
    return (
      <Portal>
        {active && 
          (
          <div style={styles.wrapper}>
            <div style={styles.window}>
              <button style={styles.closeBtn} onClick={toggle}>X</button>
              <div>{children}</div>
            </div>
            <div onClick={toggle} style={styles.background}></div>
          </div>
          )
        }
      </Portal>
    );
  }
}

export default Modal;


const styles = {
  wrapper:{
    position: 'fixed',
    top : 0 ,
    left: 0 ,
    width: '100%' ,
    height: '100%' ,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  window:{
    position: 'fixed',
    background: '#f1f1f1',
    borderRadius: 5,
    padding: 15,
    boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
    top: '40%',
    left: '50%' ,
    width: '50%' ,
    height: '30%' ,
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    minWidth: '300px' ,
    zIndex: 10,

  },
  closeBtn:{
    position: 'absolute',
    top : 0 ,
    right: 0 ,
  },
  background:{
    position: 'fixed',
    width: '100%' ,
    height: '100%' ,
    top : 0 ,
    left: 0 ,
    background: '#000',
    opacity: 0.4 ,
  },


}