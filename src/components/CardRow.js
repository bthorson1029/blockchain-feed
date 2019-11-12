import React, { Component } from 'react';

// import logo from '../logo.svg';
import Resource from './Resource';
import Loader from './Loader';
import Coins from './Coins';
import _ from 'lodash';



// Crypto News API Key 172fe1fe3990c938aa46e5a814a853ea
// News API Key 6fb75bd662324da8ac93021ec495081e

class CardRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endpoint: 'everything',
      category: 'publishedAt',
      isLoading: true,
      query: 'cryptocurrency',
      resources: [],
      coins: [],
      price: [],
      lastPrice: []
    }
    this.coinDetails = this.coinDetails.bind(this);
    this.coinNews = this.coinNews.bind(this);
    this.cryptoNews = this.cryptoNews.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.coinNews();
    this.cryptoNews();
    this.coinDetails();
    setInterval(this.coinDetails, 10000);
  }

  async coinDetails() {
    try {
      const cryptoCompareKey = '416becedd549a2a36a04e374118496c536b7c12a320c33d55e04bcd02553b4cc';
      const cryptoCompareUrl = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=12&tsym=USD' + '&api_key=' + cryptoCompareKey;
      const cryptoCompareRequest = await fetch(cryptoCompareUrl);
      if (!cryptoCompareRequest.ok) {
        throw Error(cryptoCompareRequest.statusText);
      }
      const cryptoCompareResponse = await cryptoCompareRequest.json();
      const responseObj = cryptoCompareResponse.Data;
      const cryptoCompareMap = responseObj.map(response => (
        {
          name: `${response.CoinInfo.Name}`,
          logo: `${'https://www.cryptocompare.com' + response.CoinInfo.ImageUrl}`,
          fullname: `${response.CoinInfo.FullName}`,
          price: `${response.RAW.USD.PRICE.toFixed(3)}`,
          lastPrice: `${response.price}`
        }
      ));
      const priceMap = cryptoCompareMap.map(currentPrice =>  parseFloat(currentPrice.price));
   
      this.setState((prevState) => ({
        price: priceMap,
        lastPrice: _.sum(prevState.price) !== _.sum(priceMap) ? prevState.price : prevState.lastPrice,
        coins: cryptoCompareMap
      }))
      const lastPriceMap = this.state.lastPrice.map(prevPrice => {
        return prevPrice;
      });
      cryptoCompareMap.forEach((coin, index) => {
        coin.lastPrice = lastPriceMap[index];
      })
      this.setState({
        coins: cryptoCompareMap
      })
    }
    catch (error) {
      console.log(error);
      console.log("error in compare");
    }
  }

  async coinNews() {
    try {
      const newsAPIKey = '6fb75bd662324da8ac93021ec495081e';
      const baseURL = 'https://newsapi.org/v2/' + this.state.endpoint + '?';
      const Query = this.state.query;
      const articleCount = 64;
      // const Category = this.state.category;
      const searchQuery = 'q=' + Query + '&';
      const mainLanguage = "language=en&";
      const category = this.state.category; // filter / sort category
      const url = baseURL +
        searchQuery +
        'pageSize=' +
        articleCount +
        '&' + // Number of results
        `sortBy=${category}&` + // popularity, publishedAt, relevancy
        mainLanguage +
        'apiKey=' +
        newsAPIKey;
      const req = await new Request(url);
      const newsAPIResponse = await fetch(req);
      if (!newsAPIResponse.ok) {
        throw Error(newsAPIResponse.statusText);
      }
      const newsJson = await newsAPIResponse.json();
      const data = newsJson.articles.map(article => (
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
      ));
      this.setState({
        resources: data,
        isLoading: true
      });
    } catch (error) {
      console.log("error in news fetch");
      console.log(error);
    }
  }

  async cryptoNews() {
    try {
      const cryptoAPIKey = '172fe1fe3990c938aa46e5a814a853ea';
      const coinURL = 'https://cryptocontrol.io/api/v1/public/news' + '?key=' + cryptoAPIKey;
      const coinReq = await fetch(coinURL);
      if (!coinReq.ok) {
        throw Error(coinReq.statusText);
      }
      const coinNews = await coinReq.json();
      const coinNewsResponse = coinNews.map(article => (
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
      ));
      this.setState({
        resources: [...this.state.resources.concat(coinNewsResponse)],
        isLoading: false
      })
    }
    catch (error) {
      console.log("Error in coin news fetch");
      console.log(error);
    }
  }


  handleChange(event) {
    this.setState({category: event.target.value});
  }

  handleSubmit(event) {
    this.coinNews();
    event.preventDefault();
  }




  render() {
    const { resources, coins } = this.state;
    return (
      <div className="container-fluid articleContainer">
        <div className="row">
          <nav className="col-md-2 d-none d-flex sidebar">
            <div className="coinList">
              <div className="row">
                <p className="col coinsTitle text-center my-3">
                  Top 10 Cryptocurrenies by Market Cap
                </p>
              </div>
                <div className="row">
                    {
                      coins.map(coin => {
                      const { name, price, id, fullname, lastPrice, logo } = coin;
                      return (
                        <div className="col-lg-12 mb-2" key={id}>
                          <Coins
                            key={id}
                            name={name}
                            logo={logo}
                            fullname={fullname}
                            price={price}
                            lastPrice={lastPrice}
                          />
                        </div>
                      )
                    }
                  )
                }
            </div>
            </div>
          </nav>
          <div className="col-md-10 articleArea">
          <div className="row pb-0">
                <h5 className="col text-left  mb-1">
                  Articles:
                </h5>
                <form className="form-inline" onSubmit={this.handleSubmit}>
                  <label className="mr-2">Sort By:</label>
                  <select className="form-control mx-2" value={this.state.category} onChange={this.handleChange}>
                      <option value="publishedAt">Recent</option>
                      <option value="relevancy">Relevancy</option>
                      <option value="popularity">Popularity</option>
                    </select>
                  <input type="submit" value="Sort" className="form-control btn btn-secondary mr-4" />
                </form>
              </div>
            <div className="row pt-4">
              {
                resources.length > 0
                  ? resources.map(resource => {
                    const { title, description, date, imageUrl, url, id, source, author } = resource;
                    return (
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4" key={id}>
                        <Resource
                          id={id}
                          title={title}
                          author={author}
                          source={source}
                          description={description}
                          date={date}
                          imageUrl={imageUrl}
                          resourceUrl={url}
                        />
                      </div>
                    )
                  })
                  : null
              }
            </div>
            <div className="row">
            <button className="btn btn-secondary mt-0 ml-auto mr-auto mt-5" type="submit">Load more resources</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default CardRow;
