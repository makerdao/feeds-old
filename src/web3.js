import Web3 from 'web3';

const web3 = new Web3();

export default web3;

export const initWeb3 = (web3) => {
  // new Web3.providers.HttpProvider('http://localhost:8545')
  web3.setProvider(window.web3.currentProvider);
  window.web3 = web3;
}
