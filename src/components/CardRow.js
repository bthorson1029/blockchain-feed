import React, { Component } from 'react';

// import logo from '../logo.svg';
import Resource from './Resource';
import Loader from './Loader';
import Coins from './Coins';



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
      coins: [],
      price: [],
      lastPrice: []
    }
    this.coinDetails = this.coinDetails.bind(this);
    this.coinNews = this.coinNews.bind(this);
    this.cryptoNews = this.cryptoNews.bind(this);
  }

  componentDidMount() {
    this.coinNews();
    this.cryptoNews();
    this.coinDetails();
    setInterval(this.coinDetails, 30000);
  }

  async coinDetails() {
    try {
      const cryptoCompareKey = '416becedd549a2a36a04e374118496c536b7c12a320c33d55e04bcd02553b4cc';
      const cryptoCompareUrl = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD' + '&api_key=' + cryptoCompareKey;
      const cryptoCompareRequest = await fetch(cryptoCompareUrl);
      if (!cryptoCompareRequest.ok) {
        throw Error(cryptoCompareRequest.statusText);
      }
      const cryptoCompareResponse = await cryptoCompareRequest.json();
      const responseObj = cryptoCompareResponse.Data;
      // console.log(responseObj);
      const cryptoCompareMap = responseObj.map(response => (
        {
          name: `${response.CoinInfo.Name}`,
          fullname: `${response.CoinInfo.FullName}`,
          price: `${response.RAW.USD.PRICE.toFixed(3)}`,
          lastPrice: `${response.price}`
        }
      ));
      // console.log(cryptoCompareMap);
      const priceMap = cryptoCompareMap.map(currentPrice =>  parseFloat(currentPrice.price));
      // console.log(priceMap);
      
      this.setState((prevState) => ({
        price: priceMap,
        lastPrice:  prevState.price !== priceMap ? prevState.price : prevState.lastPrice.map(price => {return price}),
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



  render() {
    const { resources, coins } = this.state;
    return (
      <div className="container-fluid articleContainer">
        <div className="row">
          <nav className="col-md-2 d-none d-flex sidebar">
            <div className="coinList">
              {
                coins.map(coin => {
                const { name, price, id, fullname, lastPrice } = coin;
                return (
                  <div className="row coinRow" key={id}>
                    <Coins
                      key={id}
                      name={name}
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
            <div className="card adSpace">
              <div className="card-header">
                <h3>AD Title Here</h3>
              </div>
              <div className="card-body">
                <p>lorem ipsum</p>
              </div>
            </div>
          </nav>
          <div className="col-md-10 articleArea">
            <div className="row pt-4">
              {
                resources.length > 0
                  ? resources.map(resource => {
                    const { title, description, date, imageUrl, url, id, source, author } = resource;
                    return (
                      <div className="col-xl-3 col-md-6 col-sm-12 mb-4" key={id}>
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
