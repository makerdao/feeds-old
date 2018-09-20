import React, { Component } from 'react';
import Link from './Link';
import moment from 'moment';
import web3 from '../web3';

class Feed extends Component {
  render() {
    const value = web3.toBigNumber(this.props.value).toFixed(3);
    const expires = moment.duration(this.props.expires, "seconds").humanize(true);
    const updated = this.props.updated ? moment.unix(this.props.updated).fromNow() : this.props.updated;
    const color = this.props.expires < 0 ? 'red' : ( this.props.expires < 2700 ? 'orange' : '#444');
    const api = this.props.network === 'mainnet' ? '' : `${this.props.network}.`;
    //const balance = web3.fromWei(this.props.balance).toFixed(3);
    return (
      <div>
        <p style={{color}}>
          <b>{this.props.idx + 1}</b> {value} {this.props.valid && this.props.expires > 0 ? 'expires' : 'expired'} {expires}.{updated && `Updated ${updated}.`} <Link href={`https://${api}etherscan.io/address/${this.props.address}`} text={this.props.address} />
        </p>
      </div>
    );
  }
}

export default Feed;
