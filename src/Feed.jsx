import React, { Component } from 'react';
import moment from 'moment';
import web3 from './web3';

class Feed extends Component {
  render() {
    const value = web3.toBigNumber(this.props.value).toFixed(3);
    const expires = moment.duration(this.props.expires, "seconds").humanize(true);
    return (
      <div>
        <p>
          <b>{this.props.idx}</b> {value} <b>{this.props.valid ? 'valid' : 'expired'}</b> expires {expires}. <a href={`https://etherscan.io/address/${this.props.address}`} target="_blank">(Etherscan)</a>
        </p>
      </div>
    );
  }
}

export default Feed;
