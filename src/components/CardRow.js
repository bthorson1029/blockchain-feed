import React, { Component, useState, useEffect } from 'react';
// import logo from '../logo.svg';
import Resource from './Resource';
import CoinDetails from './CoinDetails';
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
      price: null,
      lastPrice: null,
    }
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

  async componentDidMount() {
 
    try {
      const cryptoCompareKey = '416becedd549a2a36a04e374118496c536b7c12a320c33d55e04bcd02553b4cc';
      const cryptoCompareUrl = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD' + '&api_key=' + cryptoCompareKey;
      const cryptoCompareRequest = await fetch(cryptoCompareUrl);
      if (!cryptoCompareRequest.ok) {
        throw Error(cryptoCompareRequest.statusText);
      }
      const cryptoCompareResponse = await cryptoCompareRequest.json();
      const responseObj = cryptoCompareResponse.Data;
      console.log(responseObj);
      const cryptoCompareMap = responseObj.map(coin => (
          {
            name: `${coin.CoinInfo.Name}`,
            fullname: `${coin.CoinInfo.FullName}`,
            price: `${coin.RAW.USD.PRICE.toFixed(3)}`
          }
        ));
        console.log(responseObj[0].CoinInfo.Name)
      this.setState({
        coins: cryptoCompareMap,
        isLoading: false
      });
    } 
    catch(error) {
      console.log(error);
      console.log("error in compare");
    }

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
    } catch(error) {
      console.log("error in news fetch");
      console.log(error);
    }

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
    catch(error) {
      console.log("Error in coin news fetch");
      console.log(error);
    }
  }


  render() {
    const { isLoading, resources, coins } = this.state;
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
          <nav className="col-md-2 d-none d-flex sidebar">
            <div className="coinList">
              {
                coins.length > 0 ? coins.map(coin => {
                  const { name, price, id, fullname } = coin;
                  return (
                    <div className="row coinRow" key={id}>
                      <Coins
                        key={id}
                        name={name}
                        fullname={fullname}
                        price={price}
                       />
                    </div>
                  )
                }) : null
              }
            </div>
            
          </nav>
          <div className="col-lg-10 articleArea">
            <div className="row pt-4">
              {
                !isLoading && resources.length > 0 ? resources.map(resource => {
                  const { title, description, date, imageUrl, url, id, source, author } = resource;
                  return (
                    <div className="col-xl-3 col-lg-3 col-md-4 mb-4" key={id}>
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
                }) : <Loader />
              } {console.log(this.shuffle(resources))}
              {/* <button className="btn btn-secondary mt-0 ml-auto mr-auto mt-5" type="submit">Load more resources</button> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default CardRow;
