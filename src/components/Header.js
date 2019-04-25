import React, { Component } from 'react';
import CardRow from './CardRow.js';
import Clock from 'react-live-clock';

class Header extends Component {

  render(){
    const time = new Date();


    return(
      <div className="header">
        <div className="row">
          <div className="intro col-lg-12 pt-4 pb-4">
            <h2>Your News</h2>
            <div className="text-right">
              <h2>{time.toDateString()}</h2>
              <h2><Clock
                style={{ fontSize: '1.35em' }}
                format={'h:mm:ss'}
                ticking={true} /></h2>
            </div>
          </div>
        </div >
      </div>
    )
  }
}

export default Header;