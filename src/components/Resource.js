import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class Resource extends Component {

  constructor() {
    super();
    this.state = { loaded: false };
  }
  
  

  render() {
    const publishedDate = this.props.date;
    return (
      <div className="cardContainer">
        <div className="card">
          <a href={this.props.resourceUrl} onClick={this.incrementViewCount} target="_blank">
            <div className="card-img-top">
              { this.state.loaded ? null :
                <div className="image-loading-container">
                  <div className="image-loading"></div>
                  <div id="loading-text" className="text-center">
                    <i className="fas fa-eye pl-2"></i> <br/>Oops. Image Error.
                  </div>
                </div>
              }
              <img
                className="sourceImage"
                alt={this.props.title}
                style={this.state.loaded ? {} : { display: 'none' }}
                src={this.props.imageUrl}
                onLoad={() => this.setState({ loaded: true })}
              />
            </div>
            <div className="card-body">
              <div className="projectType pb-2"><p>{this.props.source}</p></div>
              <div className="sourceTitle"><h3>{this.props.title}</h3></div>
              <div className="sourceDescription card-text"><small>{this.props.description}</small></div>
            </div>
          </a>
          <div className="card-footer">
            <div className="footerLeft">
              
              <div className="publishedDate">
                {(new Date(publishedDate).toDateString())}
              </div>
            </div>
            <div className="footerRight">
            </div>
          </div>
        </div>
      </div>
    );
  };
}



export default Resource;