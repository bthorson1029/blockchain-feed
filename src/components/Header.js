import React, { Component } from 'react';

class Header extends Component {
  
  render(){
    return(
      <div className = "container-fluid" >
        <div className="row">
          <div className="intro col-lg-12 pt-5 pb-2">
            <h2>BlockChain News</h2>
          </div>
        </div >
      </div>
    )
  }
}

export default Header;