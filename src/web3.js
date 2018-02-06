import Web3 from 'web3';

const web3 = new Web3();

export default web3;

export const initWeb3 = (web3) => {
  if (window.web3) {
    web3.setProvider(window.web3.currentProvider);
  } else {
    web3.setProvider(new Web3.providers.HttpProvider('https://mainnet.infura.io/Tl5m5gSA2IY0XJe9BWrS'));
    web3.infura = true;
  }
  window.web3 = web3;
}
