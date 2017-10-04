import React, { Component } from 'react';
import web3 from '../web3';

class Medianizer extends Component {
  state = {
    value: null,
    feeds: {}
  }
  render() {
    const value = web3.toBigNumber(this.props.value).toFixed(3);
    return (
      <div>
        <h1>ETH/USD</h1>
        <h2>Current price: {value} (<a href={`https://etherscan.io/address/${this.props.address}`} target="_blank">Etherscan</a>)</h2>
      </div>
    );
  }
}

export default Medianizer;
