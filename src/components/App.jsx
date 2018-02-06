import React, { Component } from 'react';
import web3, { initWeb3 } from '../web3';
import Medianizer from './Medianizer';
import './App.css';

class App extends Component {

  data = {
    mainnet: [
      {
        address: '0x729D19f657BD0614b4985Cf1D82531c67569197B',
        title: 'ETH/USD'
      },
      {
        address: '0x99041F808D598B782D5a3e498681C2452A31da08',
        title: 'MKR/USD'
      }
    ],
    kovan: [
      {
        address: '0xa944bd4b25c9f186a846fd5668941aa3d3b8425f',
        title: 'ETH/USD'
      },
      {
        address: '0x02998f73fabb52282664094b0ff87741a1ce9030',
        title: 'MKR/USD'
      }
    ]
  }

  state = {
    network: null,
  }

  componentWillMount() {
    initWeb3(web3);
    web3.version.getNetwork((error, network) => {
      if (!error) {
        web3.reset(true);
        if (network === "42") {
          this.setState({ network: 'kovan' })
        } else {
          this.setState({ network: 'mainnet' })
        }
      }
    });
  }

  render() {
    const network = this.state.network;
    return (
      <div>
        <p>
          Official Maker Feeds used for the Dai Stablecoin System. For more info visit <a href="https://chat.makerdao.com/channel/public-feeds">https://chat.makerdao.com/channel/public-feeds</a>
        </p>
        {
          this.state.network &&
          <div>
            <Medianizer address={this.data[network][0].address} title={this.data[network][0].title} />
            <Medianizer address={this.data[network][1].address} title={this.data[network][1].title} />
          </div>
        }
      </div>
    );
  }
}

export default App;
