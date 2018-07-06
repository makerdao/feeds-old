import React, { Component } from 'react';
import web3, { initWeb3 } from '../web3';
import Medianizer from './Medianizer';
import Link from './Link';
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
    ],
    rinkeby: [
      {
        address: '0xE39451e34f8FB108a8F6d4cA6C68dd38f37d26E3',
        title: 'REP/USD'
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
        } else if (network === "4") {
          this.setState({ network: 'rinkeby' })
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
          Official {network} Maker Feeds used for the Dai Stablecoin System. For more info visit <Link href="https://chat.makerdao.com/channel/feeds" />
        </p>
        {
          this.state.network &&
          <div>
            <React.StrictMode>
              {this.data[network].map((med, i) => {
                return <Medianizer key={i} network={network} address={med.address} title={med.title} />
              })}
            </React.StrictMode>
          </div>
        }
      </div>
    );
  }
}

export default App;
