import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';

const repeat = (x, n) => n > 0 ? new Array(n + 1).join(x) : ""
//const rpad = (x, y, n) => x + repeat(y, n - x.length)
const lpad = (x, y, n) => repeat(y, n - x.length) + x
const toHex = wad => new BigNumber(wad.replace(".", "")).toString(16)
const toBytes12 = (wad) => `0x${lpad(toHex(`${wad}`), "0", 24)}`

const read = (contract, func, ...args) => {
  return new Promise((resolve, reject) => {
    contract[func](...args, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}


class App extends Component {
  state = {
    medianizer: null,
    feeds: []
  }

  web3 = null;

  loadMedianizer = async (web3, med) => {
    const values = [];
    const res = await read(med, 'next');
    const next = web3.toDecimal(res);
    for (let i = 1; i < next; i++) {
      values.push(read(med, 'values', toBytes12(i)));
    };
    const feeds = await Promise.all(values);
    this.setState({ feeds });
    window.feeds = feeds;
    feeds.forEach(address => {
      web3.eth.filter({ address }, (error, result) => console.log(result));
    });
  }

  init = () => {
    this.web3 = new Web3();
    this.web3.setProvider(window.web3.currentProvider);
    window.web3 = this.web3;

    const readableAbi = require('./abi/readable.json');
    const medianizerAbi = require('./abi/medianizer.json');
    const med = this.web3.eth.contract(medianizerAbi).at('0x729D19f657BD0614b4985Cf1D82531c67569197B');
    window.med = med;
    this.setState({
      medianizer: '0x729D19f657BD0614b4985Cf1D82531c67569197B'
    });
    this.loadMedianizer(this.web3, med);
  }
  componentDidMount() {
    setTimeout(() => this.init(), 500);
  }
  render() {
    const feeds = this.state.feeds;
    return (
      <div>
        <h2>Feeds</h2>
        <p>{this.state.medianizer}</p>
        <ul>
          {feeds.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
