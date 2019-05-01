import React, { Component } from 'react';
import logo from '../logo.svg';
import Resource from './Resource';
import Loader from './Loader';
import CryptoNewsApi from 'crypto-news-api'



// Crypto News API Key 172fe1fe3990c938aa46e5a814a853ea
// News API Key 6fb75bd662324da8ac93021ec495081e

class CardRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endpoint: 'everything',
      category: '',
      isLoading: true,
      query: 'Clowns',
      mainResources: []
    }
  }

  getCryptoAPI = () => {
    const cryptoAPIKey = '172fe1fe3990c938aa46e5a814a853ea';
    const Api = new CryptoNewsApi(cryptoAPIKey);
    
    Api.enableSentiment()

    Api.getLatestNews()
      .then(articles => articles.map(article => (
        {
          id: `${article._id}`,
          title: `${article.title}`,
          author: `${article.author}`,
          source: `${article.source.name}`,
          description: `${article.description}`,
          date: `${article.publishedAt}`,
          imageUrl: `${article.originalImageUrl}`,
          url: `${article.url}`
        }
      )))
      .catch(error => console.error(error))
      .then(mainResources => this.setState({ mainResources, isLoading: false }))
  }

  getNewsAPI = () => {
    const newsAPIKey = '6fb75bd662324da8ac93021ec495081e';
    const baseURL = 'https://newsapi.org/v2/' + this.state.endpoint + '?';
    const Query = this.state.query;
    const articleCount = 12;
    // const Category = this.state.category;
    const searchQuery = 'q=' + Query + '&';
    const mainLanguage = "language=en&";
    const url = baseURL +
                searchQuery +
                'pageSize=' +
                articleCount +
                '&' + // Number of results
                'sortBy=relevance&' +
                mainLanguage +
                'apiKey=' +
                newsAPIKey;

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
      .then(mainResources => this.setState({ mainResources, isLoading: false }))
      .catch(error => console.log('parsing failed', error))
    this.getCryptoAPI();
  }

  fetchData = () => {
    this.getNewsAPI();
  }

  componentWillMount() {
    this.fetchData();
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
    const { isLoading, mainResources } = this.state;
    return (
      <div className="pt-5 container-fluid articleContainer">
        {/* <div className="row">
            <div className="col-lg-12 mb-4">
            <form className="form-group" onSubmit={(e) => e.preventDefault()}>
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
          <div className="col-lg-6">
          </div>
          <div className="col-lg-6 row">
            {
              !isLoading && mainResources.length > 0 ? mainResources.map(resource => {
                const { title, description, date, imageUrl, url, id, source, author } = resource;
                return (
                  <div className="col-md-6 col-lg-6 col-sm-12 mb-4">
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
      </div>
    )
  }
}



export default CardRow;
