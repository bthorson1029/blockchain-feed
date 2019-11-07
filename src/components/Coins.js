import React, { Component } from 'react';



export default class Coins extends Component {
    constructor(props) {
        super(props);
      }
      
      priceChange(lastPrice, price) {
        const diff = lastPrice - price
        const change = diff / lastPrice
        const percent = (change * -100)
        return (change === -Infinity
          ? 0
          : percent).toFixed(3)
      }

      render() {
        const { name, id, fullname, price, lastPrice } = this.props;
        const gainloss = lastPrice > price ? 'loss' : 'gain';
        return (
              <div key={id}>
                <div className={`card coinPrice ${gainloss}`}>
                    <div className="coinInfo">
                        <h5 className="pb-0 mb-0">
                            {name}
                        </h5>
                        <p className="pb-0 mb-0">
                            {fullname}
                        </p>
                    </div>
                    <div className="d-flex flex-column justify-content-end text-right">
                        <h3 className={`pb-0 mb-0 price`}>
                            ${price}
                        </h3>
                        <p className={`percentage mb-0 pb-0`}>
                            {lastPrice !== undefined ? this.priceChange(lastPrice, price) : 0}%
                        </p>
                    </div>
                  </div>
              </div>
          )
      }

}