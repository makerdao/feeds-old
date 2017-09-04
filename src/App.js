import React, { Component } from 'react';
import BigNumber from 'bignumber.js';
import web3, { initWeb3 } from './web3';
import Medianizer from './Medianizer';
import Feed from './Feed';
import './App.css';

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

  loadMedianizer = async (med) => {
    const values = [];
    this.updateMedianizer(med);
    web3.eth.filter({ address: med.address }, (error, result) => {
      if (!error) {
        this.updateMedianizer(med);
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
      this.updateFeed(address, false);
      web3.eth.filter({ address }, (error, result) => {
        if (!error) {
          this.updateFeed(result.address, true);
        }
      });
    });
  }

  updateMedianizer = async (med) => {
    const value = await read(med, 'peek');
    this.setState({
      value: web3.fromWei(value[0]),
      valid: value[1]
    });
  }

  updateFeed = async (address, fromEvent) => {
    const c = web3.eth.contract(readableAbi).at(address);
    const value = await read(c, 'peek');
    const zzz = await read(c, 'zzz');
    const owner = await read(c, 'owner');
    this.setState((prevState) => {
      prevState[address] && console.log(`${address} updated to ${web3.fromWei(value[0])} from ${prevState[address].value}`);
      return {
        [address]: {
          value: web3.fromWei(value[0]),
          zzz: web3.toDecimal(zzz),
          expires: web3.toDecimal(zzz) - (Math.floor(Date.now() / 1000)),
          owner: owner,
          valid: value[1],
          updated: fromEvent ? Math.floor(Date.now() / 1000) : null
        }
      }
    });
  }

  init = () => {
    initWeb3(web3);
    web3.version.getNetwork((error, network) => {
      if (!error) {
        const medianizerAddress = network === "1" ? '0x729D19f657BD0614b4985Cf1D82531c67569197B' : '0xa944bd4b25c9f186a846fd5668941aa3d3b8425f';
        const med = web3.eth.contract(medianizerAbi).at(medianizerAddress);
        window.med = med;
        this.setState({
          medianizer: medianizerAddress,
          noConnection: false
        });
        this.loadMedianizer(med);
      } else {
        this.setState({
          noConnection: true
        })
        this.loadFromEtherscan('0x729D19f657BD0614b4985Cf1D82531c67569197B');
      }
    });
  }

  loadFromEtherscan = (address) => {
    fetch(`https://api.etherscan.io/api?module=proxy&action=eth_call&to=${address}&data=0x57de26a4&apikey=YourApiKeyToken`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(json => {
        const value = web3.fromWei(json.result);
        this.setState({
          value
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateExpirations = () => {
    const feeds = this.state.feeds;
    this.setState(prevState => {
      const state = {...this.prevState};
      feeds.forEach(feed => {
        if (prevState[feed]) {
          state[feed] = {
            ...prevState[feed],
            expires: prevState[feed].expires - 1
          }
        }
      });
      return state;
    })
  }

  componentDidMount() {
    setTimeout(() => this.init(), 500);
    setInterval(() => this.updateExpirations(), 1000);
  }
  render() {
    const feeds = this.state.feeds;
    return (
      <div>
        <Medianizer medianizer={this.state.medianizer} value={this.state.value} valid={this.state.valid} />
        {this.state.noConnection === true &&
          <p>This data was loaded from Etherscan. Please use an Ethereum enabled browser like Mist, or install Metamask or Parity extensions to view this feed's details.</p>
        }
        {this.state.noConnection === false &&
          feeds.map((x, i) =>
            this.state[x] && <Feed key={i} idx={i + 1} address={x} {...this.state[x]} />
          )
        }
      </div>
    );
  }
}

export default App;
