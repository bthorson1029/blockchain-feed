import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class Resource extends Component {

  constructor() {
    super();
    this.state = { loaded: false };
  }

  render() {
    const publishedDate = this.props.date;
    const {resourceUrl, title, imageUrl, source, description } = this.props;
    return (
      <div className="cardContainer">
        <div className="card">
          <a href={resourceUrl} onClick={this.incrementViewCount} target="_blank" rel="noopener noreferrer">
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
                alt={title}
                style={this.state.loaded ? {} : { display: 'none' }}
                src={imageUrl}
                onLoad={() => this.setState({ loaded: true })}
              />
            </div>
            <div className="card-body">
              <div className="projectType pb-2"><p>{source}</p></div>
              <div className="sourceTitle"><h3>{title}</h3></div>
              <div className="sourceDescription card-text"><small>{description}</small></div>
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