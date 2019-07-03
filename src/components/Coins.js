import React, { Component } from 'react';



export default class Coins extends Component {
    constructor(props) {
        super(props);
      }

      render() {
          const { name, price, id } = this.props;
          return (
              <div className="col" key={id}>
                <div className="card coinPrice">
                    <p className="pb-0 mb-0">{name}</p>
                    <h3>${price}</h3>
                  </div>
              </div>
          )
      }

}