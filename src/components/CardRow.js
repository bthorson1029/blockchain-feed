import React, { Component } from 'react';
import logo from '../logo.svg';
import Resource from './Resource';


class CardRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      resources: []
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const url = 'https://newsapi.org/v2/everything?' +
      'q=blockchain&' +
      'pageSize=24&' +
      'sortBy=popularity&' +
      'apiKey=6fb75bd662324da8ac93021ec495081e';
    const req = new Request(url);
    fetch(req)
      .then(res => res.json())
      .then(data => data.articles.map(article => (
        {
          id: `${article.source.id}`,
          title: `${article.title}`,
          author: `${article.author}`,
          source: `${article.source.name}`,
          description: `${article.description}`,
          date: `${article.publishedAt}`,
          imageUrl: `${article.urlToImage}`,
          url: `${article.url}`
        }
      )))
      .then(resources => this.setState({ resources, isLoading: false }))
      .catch(error => console.log('parsing failed', error))
  }

  render() {
    const { isLoading, resources } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          {
            !isLoading && resources.length > 0 ? resources.map(resource => {
              const { title, description, date, imageUrl, url, id, source, author } = resource;
              return (
                <div className="col-md-4 col-lg-3 col-sm-6 mb-4">
                  <Resource
                    id={id}
                    title={title}
                    author={author}
                    source={source}
                    description={description}
                    date={date}
                    imageUrl={imageUrl}
                    resourceUrl={url}
                    key={id+title}
                  />
                </div>
              )
            }) : null
          }
        </div>
      </div>
    )
  }
}



export default CardRow;
