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
      },
      {
        address: '0x6ADaDdA09EA70f82Cf6BBC4c890fD040F6Fb3d4b',
        title: 'POLY/USD'
      }
    ],
    kovan: [
      {
        address: '0xa5aA4e07F5255E14F02B385b1f04b35cC50bdb66',
        title: 'ETH/USD'
      },
      {
        address: '0xeBaa5D5cfe7F1201bebC6fb88240bBef285b4Fee',
        title: 'MKR/USD'
      },
      {
        address: '0xFeB7d3aC74CB3c6d8E6Ae8882394F0C68363b944',
        title: 'REP/USD'
      },
      {
        address: '0x8323ddE7e886684923599De7B719C984b5Cbd75b',
        title: 'POLY/USD'
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

  componentDidMount() {
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
