import React, { Component } from 'react';
import Clock from 'react-live-clock';

class Header extends Component {

  render(){
    const time = new Date();


    return(
      <div className="header">
        <div className="row">
          <div className="intro d-flex align-items-center">
            <h2 className="headerTitle">Cryptoplex</h2>
            <div className="text-right d-flex flex-column align-items-end">
              <h5 className="mb-0" style={{ fontWeight: '300'}}>{time.toDateString()}</h5>
              <h2>
                <Clock
                style={{ fontSize: '1.25em', fontWeight: '500' }}
                format={'h:mm a'}
                ticking={true} />
              </h2>
            </div>
          </div>
        </div >
      </div>
    )
  }
}

export default Header;