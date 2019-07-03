import React, { Component } from 'react';
import ArticleCard from './ArticleCard.js';
import CardRow from './CardRow.js';

class Resource extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      loaded: false
     };
  }

  render() {
    const publishedDate = this.props.date;
    const {resourceUrl, title, imageUrl, source, description, id } = this.props;
    return (
      <div className="cardContainer">
        {this.state.loaded == false ? 
          <ArticleCard publishedDate={publishedDate} 
                       title={title} 
                       source={source} 
                       resourceUrl={resourceUrl} 
                       imageUrl={imageUrl} 
                       description={description}
                       key={id} 
            /> :
          <div className="card" onLoad={() => this.setState({ loaded: true })}>
            <a href={resourceUrl} target="_blank" rel="noopener noreferrer">
              <div className="card-img-top loading">
                <img
                  className="sourceImage loading"
                  alt="Loading"
                  src={imageUrl}
                />
              </div>
              <div className="card-body">
                <div className="projectType loading"><p></p></div>
                <div className="sourceTitle loading"><h3></h3></div>
                <div className="sourceDescription card-text loading mt-4"><small></small></div>
                <div className="sourceDescription card-text loading alt"><small></small></div>
                <div className="sourceDescription card-text loading alt-2"><small></small></div>
              </div>
            </a>
            <div className="card-footer">
              <div className="footerLeft">
                <div className="publishedDate loading">
                  {(new Date(publishedDate).toDateString())}
                </div>
              </div>
              <div className="footerRight"></div>
          </div>
        </div>
          }
      </div>
    );
  };
}



export default Resource;