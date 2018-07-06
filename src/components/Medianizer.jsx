import React, { Component } from 'react';
import Feed from './Feed';
import Link from './Link';
import web3 from '../web3';

const readableAbi = require('../abi/readable.json');
const medianizerAbi = require('../abi/medianizer.json');

const repeat = (x, n) => n > 0 ? new Array(n + 1).join(x) : ""
//const rpad = (x, y, n) => x + repeat(y, n - x.length)
const lpad = (x, y, n) => repeat(y, n - x.length) + x
const toHex = wad => new web3.BigNumber(wad.replace(".", "")).toString(16)
const toBytes12 = (wad) => `0x${lpad(toHex(`${wad}`), "0", 24)}`

const read = (contract, func, ...args) => {
  return new Promise((resolve, reject) => {
    contract[func](...args, (error, result) => {
      error ? reject(error) : resolve(result);
    });
  });
}

class Medianizer extends Component {
  state = {
    value: null,
    valid: null,
    show: 'hide',
    feeds: {}
  }

  componentDidMount() {
    // setInterval(() => this.updateExpirations(), 60000);
    const med = web3.eth.contract(medianizerAbi).at(this.props.address);
    this.loadMedianizer(med);
  }

  loadMedianizer = async (med) => {
    this.updateMedianizer(med);
    const res = await read(med, 'next');
    const next = web3.toDecimal(res);
    const values = [];
    for (let i = 1; i < next; i++) {
      values.push(read(med, 'values', toBytes12(i)));
    };
    const feeds = await Promise.all(values);
    Object.values(feeds).forEach((x, i) => {
      if (x !== "0x0000000000000000000000000000000000000000") {
        feeds[x] = {
          idx: i
        };
      }
    });
    this.setState({ feeds });
    feeds.forEach(address => {
      if (address !== "0x0000000000000000000000000000000000000000") {
        this.updateFeed(address, false);
        if (!web3.infura) {
          web3.eth.filter({ address, fromBlock: 'latest' }, (error, result) => {
            if (!error) {
              this.updateFeed(result.address, true);
              this.updateMedianizer(med);
            }
          });
        }
      }
    });
  }

  updateMedianizer = async (med) => {
    const result = await read(med, 'peek');
    const value = web3.fromWei(result[0]);
    const valid = result[1];
    //const speech = web3.toBigNumber(medianizer.value).toFixed(3);
    //window.speechSynthesis.speak(new SpeechSynthesisUtterance(`New price is ${speech}`));
    this.setState({ value, valid });
  }

  updateFeed = async (address, fromEvent) => {
    const fab = web3.eth.contract(readableAbi);
    window.fab = fab;
    const c = fab.at(address);
    const value = await read(c, 'peek');
    const zzz = await read(c, 'zzz');
    const owner = await read(c, 'owner');

    const feeds = { ...this.state.feeds };
    feeds[address] = {
      value: web3.fromWei(value[0]),
      zzz: web3.toDecimal(zzz),
      expires: web3.toDecimal(zzz) - (Math.floor(Date.now() / 1000)),
      owner: owner,
      valid: value[1],
      updated: fromEvent ? Math.floor(Date.now() / 1000) : null,
      //balance: await getBalance(web3, owner),
      idx: feeds[address].idx
    }
    this.setState({ feeds });
  }

  updateExpirations = () => {
    const feeds = this.state.feeds;
    Object.keys(feeds).forEach(x => {
      feeds[x].expires = web3.toDecimal(feeds[x].zzz) - (Math.floor(Date.now() / 1000))
    });
    this.setState({ feeds });
  }

  // const getBalance = (web3, account) => {
//   return new Promise((resolve, reject) => {
//     web3.eth.getBalance(account, (error, result) => {
//       error ? reject(error) : resolve(result);
//     });
//   })
// }

  toggle = () => {
    let show = this.state.show;
    show = show === 'show' ? 'hide' : 'show';
    this.setState({ show });
  }

  render() {
    const value = web3.toBigNumber(this.state.value).toFixed(3);
    const feeds = this.state.feeds;
    const api = this.props.network === 'mainnet' ? '' : `${this.props.network}.`;
    if (!this.state.value) {
      return (
        <h1>Loading...</h1>
      )
    } else {
      return (
        <div>
          <h1>{this.props.title} {value}</h1>
          <h3>
            <Link href={`https://${api}etherscan.io/address/${this.props.address}`} text={this.props.address} />
          </h3>
          <p>
            <button onClick={this.toggle}>
              Click to {this.state.show === 'show' ? 'hide' : 'show'} details
            </button>
          </p>
          <div className={this.state.show}>
            {
              Object.keys(feeds).map((x, i) =>
                feeds[x].value && <Feed network={this.props.network} key={i} address={x} {...feeds[x]} />
              )
            }
          </div>
        </div>
      );
    }
  }
}

export default Medianizer;
