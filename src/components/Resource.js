import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class Resource extends Component {

  state = {count: 0};
  incrementViewCount = () => {
    this.setState({ count: this.state.count + 1})
  }

  render() {
    return (
      <div className="cardContainer">
        <div className="card">
          <a href={this.props.resourceUrl} onClick={this.incrementViewCount} target="_blank">
            <div className="card-img-top">
              <img className="sourceImage img-fluid"
                src={this.props.imageUrl}
                alt={this.props.title}
              />
            </div>
            <div className="card-body">
              <div className="projectType"><p>{this.props.source}</p></div>
              <div className="sourceTitle"><h3>{this.props.title}</h3></div>
              <div className="sourceDescription card-text"><small>{this.props.description}</small></div>
            </div>
          </a>
          <div className="card-footer">
            <div className="footerLeft">
              <div className="viewCount">{this.state.count}</div>
              <i className="fas fa-eye"></i>
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