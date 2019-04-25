import React, { Component } from 'react';
import CardRow from './CardRow.js';
import Clock from 'react-live-clock';

class Header extends Component {

  render(){
    const time = new Date();


    return(
      <div className="header">
        <div className="row">
          <div className="intro col-lg-12">
            <h2 className="headerTitle">Your News</h2>
            <div className="text-right">
              <h2>{time.toDateString()}</h2>
              <h2><Clock
                style={{ fontSize: '1.35em', fontWeight: '300' }}
                format={'h:mm a'}
                ticking={true} /></h2>
            </div>
          </div>
        </div >
      </div>
    )
  }
}

export default Header;