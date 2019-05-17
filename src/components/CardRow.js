import React, { Component } from 'react';
import logo from '../logo.svg';
import Resource from './Resource';
import CoinDetails from './CoinDetails';
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
      query: 'cryptocurrency',
      resources: [],
      coinDetails: [],
      coinSelection: 'bitcoin'
    }
  }


  fetchData = () => {
    const newsAPIKey = '6fb75bd662324da8ac93021ec495081e';
    const baseURL = 'https://newsapi.org/v2/' + this.state.endpoint + '?';
    const Query = this.state.query;
    const articleCount = 24;
    // const Category = this.state.category;
    const searchQuery = 'q=' + Query + '&';
    const mainLanguage = "language=en&";
    const url = baseURL +
                searchQuery +
                'pageSize=' +
                articleCount +
                '&' + // Number of results
                'sortBy=popularity&' +
                mainLanguage +
                'apiKey=' +
                newsAPIKey;

    const req = new Request(url);
    fetch(req)
      .then(res => res.json())
      .then(data => data.articles.map(article => (
        {
          id: `${window.btoa(Math.random())}`,
          title: `${article.title}`,
          author: `${article.author}`,
          source: `${article.source.name}`,
          description: `${article.description}`,
          date: `${article.publishedAt}`,
          imageUrl: `${article.urlToImage}`,
          url: `${article.url}`
        }
      )))
      .then(resources => this.setState({ resources, isLoading: true }))
      .catch(error => console.log('parsing failed', error))

    const cryptoAPIKey = '172fe1fe3990c938aa46e5a814a853ea';
    const Api = new CryptoNewsApi(cryptoAPIKey);

      Api.enableSentiment()

      Api.getTopNews()
        .then(articles => articles.map(article => (
          {
            id: `${window.btoa(Math.random())}`,
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
        .then(cryptoResources => this.setState({ resources: [...this.state.resources.concat(cryptoResources)], isLoading: false }))
        
        Api.getCoinDetails(this.state.coinSelection)
        .then(details =>  this.setState({ coinDetails: details}))
        .catch(err => console.error(err))
    }

  fetchCoinData = () => {
    const cryptoAPIKey = '172fe1fe3990c938aa46e5a814a853ea';
    const Api = new CryptoNewsApi(cryptoAPIKey);
    
    Api.getCoinDetails(this.state.coinSelection)
      .then(details => this.setState({ coinDetails: details }))
      .catch(err => console.error(err))
  }
  
  selectCoin = () => {
    this.setState({ coinSelection: 'ethereum' });
  }


  componentWillMount() {
    this.fetchData();
  }
  
  componentWillUpdate() {
    this.fetchCoinData();
  }


  shuffle = (array) => {
    let m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
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
    const { isLoading, resources, coinDetails } = this.state;
    return (
      <div className="container-fluid articleContainer">
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
          <div className="col-lg-6 leftColumn">
          <div className="row">
            <div className="col-lg-12 rowTop"></div>
            <div className="col-lg-12 rowBottom">
              <CoinDetails 
                description={coinDetails.description}
                links={coinDetails.links}
                twitterUsernames={coinDetails.twitterUsernames}
                subreddits={coinDetails.subreddits}
              />
              <button className="btn btn-primary" onClick={this.selectCoin}>Ethereum</button>
            </div>
          </div>
          </div>
          <div className="col-lg-6 ml-0 mr-0 rightColumn">
          <h3 className="pl-3">Article Feed</h3>
            <div className="articleArea row">
            {
              !isLoading && resources.length > 0 ? resources.map(resource => {
                const { title, description, date, imageUrl, url, id, source, author } = resource;
                return (
                  <div className="col-lg-6 mb-4">
                    <Resource
                      id={id}
                      title={title}
                      author={author}
                      source={source}
                      description={description}
                      date={date}
                      imageUrl={imageUrl}
                      resourceUrl={url}
                      key={id}
                    />
                  </div>
                )
              }) :  <Loader /> 
              }
              </div>
          </div>
        </div>
        {/* {console.log(this.shuffle(this.state.resources))} */}
      </div>
    )
  }
}



export default CardRow;
