import React, { useState, useEffect, useRef } from 'react';
import Resource from './Resource';
import Coins from './Coins';
import _ from 'lodash';

const CardRow = () => {
  const [endpoint, setEndpoint] = useState('everything');
  const [category, setCategory] = useState('publishedAt');
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('cryptocurrency');
  const [resources, setResources] = useState([]);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState([]);
  const [lastPrice, setLastPrice] = useState([]);
   // Declare a ref variable to store the lastPriceMap value using useRef
  const lastPriceMapRef = useRef([]);

  const coinDetails = async () => {
    try {
      const cryptoCompareKey = '416becedd549a2a36a04e374118496c536b7c12a320c33d55e04bcd02553b4cc';
      const cryptoCompareUrl = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&api_key=${cryptoCompareKey}`;
      const cryptoCompareRequest = await fetch(cryptoCompareUrl);
      if (!cryptoCompareRequest.ok) {
        throw Error(cryptoCompareRequest.statusText);
      }
      // Parse the JSON response and extract the data
      const cryptoCompareResponse = await cryptoCompareRequest.json();
      const responseObj = cryptoCompareResponse.Data;
      const mainURL = "https://www.cryptocompare.com";
      // Map the data to an array of objects with the relevant properties
      const cryptoCompareMap = responseObj.map((response) => {
        // Destructure the response object to get the coin info and raw data
        const { CoinInfo, RAW } = response;

        // Return an object with the name, logo, fullname, price, lastPrice and changePCT24hr properties
        return {
          name: CoinInfo.Name,
          logo: `${mainURL}${CoinInfo.ImageUrl}`,
          fullname: CoinInfo.FullName,
          price: `${RAW.USD.PRICE < 1 ? RAW.USD.PRICE.toFixed(3) : RAW.USD.PRICE.toFixed(2)}`,
          lastPrice: RAW.USD.PRICE,
          changePCT24hr: RAW.USD.CHANGEPCT24HOUR.toFixed(2),
        };
      }
    );
      // Map the price property to an array of numbers
      const priceMap = cryptoCompareMap.map((currentPrice) => parseFloat(currentPrice.price)
    );

    // Update the state with the price, lastPrice and coins properties
    setPrice(priceMap);
    setLastPrice(
      _.sum(lastPriceMapRef.current) !== _.sum(priceMap)
        ? lastPriceMapRef.current
        : lastPrice
    );
    setCoins(cryptoCompareMap);

    // Update the lastPriceMapRef value with the current priceMap value
    lastPriceMapRef.current = priceMap;

    // Update the lastPrice property of each coin object with the corresponding value from the lastPriceMapRef
    cryptoCompareMap.forEach((coin, index) => {
      coin.lastPrice = lastPriceMapRef.current[index];
    });

    // Update the state with the coins property
    setCoins(cryptoCompareMap);
  } catch (error) {
    // Log the error to the console
    console.log(error);
    console.log("error in compare");
  }
}

  const coinNews = async () => {
    try {
      const newsAPIKey = '6fb75bd662324da8ac93021ec495081e';
      const baseURL = `https://newsapi.org/v2/${endpoint}?`;
      const articleCount = 64;
      const searchQuery = `q=${query}&`;
      const mainLanguage = "language=en&";
      const url = `${baseURL}${searchQuery}pageSize=${articleCount}&sortBy=${category}&${mainLanguage}apiKey=${newsAPIKey}`;
      const req = new Request(url);
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
      setResources(data);
      setIsLoading(true);
    } catch (error) {
      console.log("error in news fetch");
      console.log(error);
    }
  }

  useEffect(() => {
    coinNews();
    coinDetails();
    const interval = setInterval(coinDetails, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (event) => {
    setCategory(event.target.value);
  }

  const handleSubmit = (event) => {
    coinNews();
    event.preventDefault();
  }

  return (
    <div className="container-fluid articleContainer">
      <div className="row">
        <div className="col-md-9 articleArea">
          <div className="row pb-0">
            <h5 className="col text-left  mb-1">
              Articles:
            </h5>
            <form className="form-inline" onSubmit={handleSubmit}>
              <label className="mr-2">Sort By:</label>
              <select className="form-control mx-2" value={category} onChange={handleChange}>
                <option value="publishedAt">Recent</option>
                <option value="relevancy">Relevancy</option>
                <option value="popularity">Popularity</option>
              </select>
              <input type="submit" value="Sort" className="form-control btn btn-secondary mr-4" />
            </form>
          </div>
          <div className="row mt-4 resourcesArea">
            {
              resources.length > 0
                ? resources.map(resource => {
                  const { title, description, date, imageUrl, url, id, source, author } = resource;
                  return (
                    <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 mb-4" key={id}>
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
        <nav className="col-md-3 d-none d-flex sidebar">
          <div className="row">
            <p className="col coinsTitle text-left ml-2 my-4 mb-1">
              Top 100 Cryptocurrenies by Market Cap
            </p>
          </div>
          <div className="coinList">
            <div className="row my-4 pb-5">
              {
                coins.map((coin) => {
                  const { name, price, id, fullname, lastPrice, logo, changePCT24hr } = coin;
                  return (
                    <div className="col-lg-12 mb-2" key={id}>
                      <Coins
                        key={id}
                        name={name}
                        logo={logo}
                        fullname={fullname}
                        price={price}
                        lastPrice={lastPrice}
                        changePCT24hr={changePCT24hr}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default CardRow;
