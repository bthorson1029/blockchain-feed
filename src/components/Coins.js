import React, { Component } from 'react';



export default class Coins extends Component {
    constructor(props) {
        super(props);
      }

      render() {
          const { name, price, id, fullname } = this.props;
          return (
              <div className="col" key={id}>
                <div className="card coinPrice">
                    <div>
                        <h5 className="pb-0 mb-0">{name}</h5>
                        <p className="pb-0 mb-0">{fullname}</p>
                    </div>
                    <div>
                        <h3 className="pb-0 mb-0">${price}</h3>
                    </div>
                  </div>
              </div>
          )
      }

}