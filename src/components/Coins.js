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

      gainLoss(lastPrice, price) {
        if(lastPrice > price) {
            return 'loss'
        } 
        if (lastPrice < price) {
            return 'gain'
        }
        else {
            return 'neutral'
        }
      }

      render() {
        const { name, id, fullname, price, lastPrice, logo } = this.props;
        const gainloss = this.gainLoss(lastPrice, price);
        return (
              <div className="mx-3" key={id}>
                <div className={`card coinPrice ${gainloss}`}>
                    <div className="coinInfo">
                        <img src={logo} className="logoImage"/>
                        <div className="d-block">
                            <h5 className="pb-0 mb-0">
                                {name}
                            </h5>
                            <p className="pb-0 mb-0">
                                {fullname}
                            </p>
                        </div>
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