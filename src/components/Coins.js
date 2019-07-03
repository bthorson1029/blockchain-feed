import React, { Component } from 'react';



export default class Coins extends Component {
    constructor(props) {
        super(props);
      }

      render() {
          const { name, price } = this.props;
          return (
              <div>
                  <h3>{name}</h3>
                  <p>{price}</p>
              </div>
          )
      }

}