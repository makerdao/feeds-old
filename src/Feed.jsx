import React, { Component } from 'react';
import moment from 'moment';

class Feed extends Component {
  render() {
    return (
      <div>
        <p>
          <b>{this.props.idx}</b> {this.props.value} <b>{this.props.valid ? 'valid' : 'expired'}</b>
           expires {this.props.expires}<br />
           <a href={`https://etherscan.io/address/${this.props.address}`}>Go to</a>
        </p>
      </div>
    );
  }
}

export default Feed;
