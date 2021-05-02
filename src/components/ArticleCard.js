import React, { Component } from 'react';

class ArticleCard extends Component {
  render(){
    const { resourceUrl, title, imageUrl, source, description, publishedDate } = this.props
    return (
      <div className="card" onLoad={() => this.setState({ loaded: true })}>
        <a href={resourceUrl} onClick={this.incrementViewCount} target="_blank" rel="noopener noreferrer">
          <div className="card-img-top">
            <img
              className="sourceImage"
              alt={title}
              src={imageUrl}
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
    );
  }
}

export default ArticleCard;