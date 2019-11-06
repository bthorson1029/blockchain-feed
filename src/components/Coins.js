import React, { Component } from 'react';



export default class Coins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: props.price,
            lastPrice: props.lastPrice,
        }
      }

      render() {
        const { name, id, fullname } = this.props;
        const { price, lastPrice } = this.state;
        const gainloss = lastPrice > price ? 'loss' : 'gain';
        return (
              <div className="col" key={id}>
                <div className={`card coinPrice ${gainloss}`}>
                    <div>
                        <h5 className="pb-0 mb-0">
                            {name}
                        </h5>
                        <p className="pb-0 mb-0">
                            {fullname}
                        </p>
                    </div>
                    <div>
                        <h3 className="pb-0 mb-0">
                            ${price}
                        </h3>
                    </div>
                  </div>
              </div>
          )
      }

}