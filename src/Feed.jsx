import React, { Component } from 'react';
import moment from 'moment';
import web3 from './web3';

class Feed extends Component {
  render() {
    const value = web3.toBigNumber(this.props.value).toFixed(3);
    const expires = moment.duration(this.props.expires, "seconds").humanize(true);
    const updated = this.props.updated ? moment.unix(this.props.updated).fromNow() : this.props.updated;
    return (
      <div>
        <p>
          <b>{this.props.idx}</b> {value} <b>{this.props.valid && this.props.expires > 0 ? 'valid' : 'expired'}</b> expires {expires}.{updated && `Updated ${updated}.`} (<a href={`https://etherscan.io/address/${this.props.address}`} target="_blank">Etherscan</a>)
        </p>
      </div>
    );
  }
}

export default Feed;
