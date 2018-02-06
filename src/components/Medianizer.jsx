import React, { Component } from 'react';
import web3 from '../web3';

class Medianizer extends Component {
  state = {
    value: null,
    feeds: {}
  }
  render() {
    let title = "ETH/USD"
    if (this.props.address && this.props.address.toLowerCase() === '0x99041f808d598b782d5a3e498681c2452a31da08') {
      title = "MKR/USD"
    }
    const value = web3.toBigNumber(this.props.value).toFixed(3);
    return (
      <div>
        <h1>{title} {value}</h1>
        <h3>
        <a href={`https://etherscan.io/address/${this.props.address}`} target="_blank">{this.props.address}</a>
        </h3>
      </div>
    );
  }
}

export default Medianizer;
