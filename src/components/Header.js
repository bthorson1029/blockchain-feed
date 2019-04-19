import React, { Component } from 'react';
import CardRow from './CardRow.js';

class Header extends Component {
  
  render(){
    return(
      <div className = "container" >
        <div className="row">
          <div className="intro col-lg-12 pt-5 pb-2">
            <h2>Your News</h2>
          </div>
        </div >
      </div>
    )
  }
}

export default Header;