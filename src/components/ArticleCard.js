import React, { Component } from 'react';
import Resource from './Resource.js';

class ArticleCard extends Component {
  render(){
    return (
      <div className="card" onLoad={() => this.setState({ loaded: true })}>
        <a href={this.props.resourceUrl} onClick={this.incrementViewCount} target="_blank" rel="noopener noreferrer">
          <div className="card-img-top">
            <img
              className="sourceImage"
              alt={this.props.title}
              src={this.props.imageUrl}
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
              {(new Date(this.props.publishedDate).toDateString())}
            </div>
          </div>
          <div className="footerRight">
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleCard;