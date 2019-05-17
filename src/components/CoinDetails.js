import React, { Component } from 'react';

class CoinDetails extends Component {
  
  constructor() {
    super();
    this.state = { loaded: false };
  }

  render() {
    const { description, links, subreddits, twitterUsernames } = this.props;
    return (
      <div>
        <h3>Ethereum</h3>
        <p>{description}</p>
        <ul>
          <li>{subreddits}</li>
        </ul>
      </div>
    )
  }
}

export default CoinDetails;