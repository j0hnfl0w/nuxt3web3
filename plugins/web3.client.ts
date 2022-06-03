// eslint-disable-next-line
declare const window: any;

import { ethers } from 'ethers';

export const cutStr = (str, len = 13, start = 4, end = 6) => {
  if (str.length <= len) {
    return str;
  }
  return `${str.substr(0, start)}...${str.substr(-end)}`;
};

// eslint-disable-next-line
export default defineNuxtPlugin((nuxtApp) => {
  console.log('Adding web3 plugin...');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return {
    provide: {
      async init() {
        console.log(':init', window?.ethereum?.selectedAddress);
        const address = window?.ethereum?.selectedAddress;
        console.log(':init address', address);
        return {
          address: address,
          addressShort: cutStr(address),
        };
      },
      async connect() {
        console.log(':connect start');

        const accounts = await provider.send('eth_requestAccounts', []);
        console.log(':connect accounts', accounts);
        const signer = provider.getSigner();
        console.log(':connect signer', signer);
        const address = accounts?.[0] || null;
        return {
          address,
          addressShort: cutStr(address),
        };
      },
    },
  };
});
