import React, { Component } from 'react';
import BigNumber from 'bignumber.js';
import web3, { initWeb3 } from '../web3';
import Medianizer from './Medianizer';
import Feed from './Feed';
import './App.css';

const readableAbi = require('../abi/readable.json');
const medianizerAbi = require('../abi/medianizer.json');

const repeat = (x, n) => n > 0 ? new Array(n + 1).join(x) : ""
//const rpad = (x, y, n) => x + repeat(y, n - x.length)
const lpad = (x, y, n) => repeat(y, n - x.length) + x
const toHex = wad => new BigNumber(wad.replace(".", "")).toString(16)
const toBytes12 = (wad) => `0x${lpad(toHex(`${wad}`), "0", 24)}`

const read = (contract, func, ...args) => {
  return new Promise((resolve, reject) => {
    contract[func](...args, (error, result) => {
      error ? reject(error) : resolve(result);
    });
  });
}

const getBalance = (web3, account) => {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(account, (error, result) => {
      error ? reject(error) : resolve(result);
    });
  })
}

class App extends Component {
  state = {
    medianizer: {
      address: null,
      value: null,
      valid: null,
      feeds: {},
    }
  }

  loadMedianizer = async (med) => {
    this.updateMedianizer(med);
    web3.eth.filter({ address: med.address, fromBlock: 'latest' }, (error, result) => {
      if (!error) {
        this.updateMedianizer(med);
      }
    });
    const res = await read(med, 'next');
    const next = web3.toDecimal(res);
    const values = [];
    for (let i = 1; i < next; i++) {
      values.push(read(med, 'values', toBytes12(i)));
    };
    const feeds = await Promise.all(values);
    const medianizer = { ...this.state.medianizer };
    Object.values(feeds).forEach((x, i) => {
      medianizer.feeds[x] = {
        idx: i
      };
    });
    this.setState({ medianizer });
    window.feeds = feeds;
    feeds.forEach(address => {
      this.updateFeed(address, false);
      web3.eth.filter({ address, fromBlock: 'latest' }, (error, result) => {
        if (!error) {
          this.updateFeed(result.address, true);
        }
      });
    });
  }

  updateMedianizer = async (med) => {
    const value = await read(med, 'peek');
    const medianizer = { ...this.state.medianizer };
    medianizer.value = web3.fromWei(value[0]);
    medianizer.valid = value[1];
    //const speech = web3.toBigNumber(medianizer.value).toFixed(3);
    //window.speechSynthesis.speak(new SpeechSynthesisUtterance(`New price is ${speech}`));
    this.setState({ medianizer });
  }

  updateFeed = async (address, fromEvent) => {
    const fab = web3.eth.contract(readableAbi);
    window.fab = fab;
    const c = fab.at(address);
    const value = await read(c, 'peek');
    const zzz = await read(c, 'zzz');
    const owner = await read(c, 'owner');

    const medianizer = { ...this.state.medianizer };
    medianizer.feeds[address] = {
      value: web3.fromWei(value[0]),
      zzz: web3.toDecimal(zzz),
      expires: web3.toDecimal(zzz) - (Math.floor(Date.now() / 1000)),
      owner: owner,
      valid: value[1],
      updated: fromEvent ? Math.floor(Date.now() / 1000) : null,
      balance: await getBalance(web3, owner),
      idx: medianizer.feeds[address].idx
    }
    this.setState({ medianizer });
  }

  init = () => {
    initWeb3(web3);
    web3.version.getNetwork((error, network) => {
      if (!error) {
        web3.reset(true);
        const medianizerAddress = network === "1" ? '0x729D19f657BD0614b4985Cf1D82531c67569197B' : '0xa944bd4b25c9f186a846fd5668941aa3d3b8425f';
        const med = web3.eth.contract(medianizerAbi).at(medianizerAddress);
        window.med = med;
        const medianizer = { ...this.state.medianizer };
        medianizer.address = medianizerAddress;
        this.setState({
          medianizer,
          noConnection: false
        });
        this.loadMedianizer(med);
      } else {
        this.setState({
          medianizer: {
            address: '0x729D19f657BD0614b4985Cf1D82531c67569197B'
          },
          noConnection: true,
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
        const medianizer = { ...this.state.medianizer };
        medianizer.value = web3.fromWei(json.result);
        this.setState({ medianizer });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateExpirations = () => {
    const medianizer = this.state.medianizer;
    Object.keys(medianizer.feeds).forEach(x => {
      medianizer.feeds[x].expires = web3.toDecimal(medianizer.feeds[x].zzz) - (Math.floor(Date.now() / 1000))
    });
    this.setState({ medianizer });
  }

  componentDidMount() {
    setTimeout(() => this.init(), 500);
    setInterval(() => this.updateExpirations(), 60000);
  }
  render() {
    const feeds = this.state.medianizer.feeds;
    return (
      <div>
        <Medianizer {...this.state.medianizer} />
        {this.state.noConnection === true &&
          <p>This data was loaded from Etherscan. Please use an Ethereum enabled browser like Mist, or install Metamask or Parity extensions to view this feed's details.</p>
        }
        {this.state.noConnection === false &&
          Object.keys(feeds).map((x, i) =>
            feeds[x].value && <Feed key={i} address={x} {...feeds[x]} />
          )
        }
      </div>
    );
  }
}

export default App;
