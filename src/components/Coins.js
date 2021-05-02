import React, { Component } from 'react';



export default class Coins extends Component {
    constructor(props) {
        super(props);
      }
      
      priceChange(lastPrice, price) {
        const diff = lastPrice - price
        const change = diff / lastPrice
        const percent = (change * -100)
        return (change === -Infinity ? 0 : percent).toFixed(3)
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

      pctChange(changePCT24hr) {
        if(changePCT24hr < 0) {
            return 'loss'
        } 
        if (changePCT24hr > 0) {
            return 'gain'
        }
        else {
            return 'neutral'
        }
      }

      iconChange(lastPrice, price) {
        if(lastPrice > price) {
            return 'fa-arrow-down'
        } 
        if (lastPrice < price) {
            return 'fa-arrow-up'
        }
        else {
            return
        }
      }

      render() {
        const { name, id, fullname, price, lastPrice, logo, changePCT24hr } = this.props;
        const gainloss = this.gainLoss(lastPrice, price);
        const pctChange = this.pctChange(changePCT24hr);
        const iconChange = this.iconChange(lastPrice, price);
        return (
              <div className="mx-2" key={id}>
                <div className={`card coinPrice ${gainloss}`}>
                    <div className="iconArea">
                        <i className={`fas ${iconChange}`}></i>
                    </div>
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
                        <p className={`percentage mb-0 pb-0 ${pctChange}`}>
                            {changePCT24hr}%
                        </p>
                    </div>
                  </div>
              </div>
          )
      }

}