import React, { Component } from 'react';
import logo from '../logo.svg';
import Resource from './Resource';
import Loader from './Loader';


class CardRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endpoint: 'top-headlines',
      category: '',
      isLoading: true,
      query: 'texas',
      resources: []
    }
  }

  componentWillMount() {
    this.fetchData();
  }


  fetchData() {
    const baseURL = 'https://newsapi.org/v2/' + this.state.endpoint + '?';
    const Query = this.state.query;
    // const Category = this.state.category;
    const searchQuery = 'q=' + Query + '&';
    const mainLanguage = "language=en&";
    const url = baseURL + 
                // searchQuery +
                'pageSize=24&' + // Number of results
                'sortBy=relevance&' +
                mainLanguage +
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
  
  // handleInputChange = () => {
  //   this.setState({
  //     query: this.search.value.trim()
  //   }, () => {
  //     if (this.state.query && this.state.query.length > 1) {
  //       if (this.state.query.length % 2 === 0) {
  //         this.fetchData()
  //       }
  //     } else if (!this.state.query) {
  //     }
  //   })
  // }

  render() {
    const { isLoading, resources } = this.state;
    return (
      <div className="pt-5 container">
        {/* <div className="row">
            <div className="col-lg-12 pb-4">
              <form className="form-group">
                <input
                  placeholder="Search keyword..."
                  ref={input => this.search = input}
                  onChange={this.handleInputChange}
                  className="form-control"
                />
              </form>
            </div>
        </div> */}
        <div className="row">
          {
            !isLoading && resources.length > 0 ? resources.map(resource => {
              const { title, description, date, imageUrl, url, id, source, author } = resource;
              return (
                <div className="col-md-4 col-lg-4 col-sm-6 mb-4">
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
            }) :  <Loader /> 
            }
        </div>
      </div>
    )
  }
}



export default CardRow;
