import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';

const portalRoot = document.getElementById('portal');

// Componente de clase
class Portal extends Component {

  constructor(){
    super();
    this.el = document.createElement('div')
  }

  componentDidMount = () => {
    portalRoot.appendChild(this.el)
  }

  componentWillUnmount = () => {
    portalRoot.removeChild(this.el)
  }
 
  render() {
    const {children} = this.props
    return ReactDOM.createPortal(children , this.el);
  }
}

export default Portal;