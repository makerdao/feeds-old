import React, { Component } from 'react';
import moment from 'moment';

class Feed extends Component {
  zzz = this.props.zzz - Math.round(Date.now() / 1000);

  render() {
    return (
      <div>
        <p>
          <b>{this.props.idx}</b> {this.props.value} {this.props.valid ? 'valid' : 'expired'} 
           expires {moment.duration(this.zzz, 'seconds').humanize(true)}
          <a href={`https://etherscan.io/address/${this.props.address}`}>Go to</a>
        </p>
      </div>
    );
  }
}

export default Feed;
