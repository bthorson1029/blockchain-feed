import React, { Component } from 'react';



class Loader extends Component {
  render() {
    return(
      <div className="loading-container">
        <div className="loading"></div>
        <div id="loading-text" className="text-center">Loading...</div>
      </div>
    )
  }
}

export default Loader;