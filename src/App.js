import React, { Component } from 'react';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import './App.css';
import Feed from './Feed';

const readableAbi = require('./abi/readable.json');
const medianizerAbi = require('./abi/medianizer.json');

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
    value: null,
    valid: null,
    feeds: []
  }

  web3 = null;

  loadMedianizer = async (web3, med) => {
    const values = [];
    this.updateMedianizer(web3, med);
    web3.eth.filter({ address: med.address }, (error, result) => {
      if (!error) {
        this.updateMedianizer(web3, med);
      }
    });
    const res = await read(med, 'next');
    const next = web3.toDecimal(res);
    for (let i = 1; i < next; i++) {
      values.push(read(med, 'values', toBytes12(i)));
    };
    const feeds = await Promise.all(values);
    this.setState({ feeds });
    window.feeds = feeds;
    feeds.forEach(address => {
      this.updateFeed(web3, address);
      web3.eth.filter({ address }, (error, result) => {
        if (!error) {
          this.updateFeed(web3, result.address);
        }
      });
    });
  }

  updateMedianizer = async (web3, med) => {
    const value = await read(med, 'peek');
    this.setState({
      value: web3.fromWei(value[0]),
      valid: value[1]
    })
  }

  updateFeed = async (web3, address) => {
    const c = web3.eth.contract(readableAbi).at(address);
    const value = await read(c, 'peek');
    const zzz = await read(c, 'zzz');
    const owner = await read(c, 'owner');
    this.setState({
      [address]: {
        value: web3.fromWei(value[0]),
        zzz: web3.toDecimal(zzz),
        owner: owner,
        valid: value[1]
      }
    });
  }

  init = () => {
    this.web3 = new Web3();
    this.web3.setProvider(window.web3.currentProvider);
    window.web3 = this.web3;
    
    this.web3.version.getNetwork((error, network) => {
      if (!error) {
        const medianizerAddress = network === "1" ? '0x729D19f657BD0614b4985Cf1D82531c67569197B' : '0xa944bd4b25c9f186a846fd5668941aa3d3b8425f';        
        const med = this.web3.eth.contract(medianizerAbi).at(medianizerAddress);
        window.med = med;
        this.setState({
          medianizer: medianizerAddress
        });
        this.loadMedianizer(this.web3, med);
      }
    });
  }
  componentDidMount() {
    setTimeout(() => this.init(), 500);
  }
  render() {
    const feeds = this.state.feeds;
    return (
      <div>
        <h1>Feeds</h1>
        <h2>{this.state.medianizer}</h2>
        <h3>{this.state.value} {this.state.valid ? 'valid' : ''}</h3>
        {feeds.map((x, i) => 
          this.state[x] && <Feed key={i} idx={i+1} address={x} {...this.state[x]} />
        )}
      </div>
    );
  }
}

export default App;
