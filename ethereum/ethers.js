import { ethers } from 'ethers';

// Configure uma instância do provedor Ethereum (por exemplo, Ropsten)
const provider = new ethers.providers.JsonRpcProvider('https://polygonzkevm-testnet.g.alchemy.com/v2/bYkdQzqu8Tk9Kv-iYQANtfy96U5I6LLi');

// Exporte a instância do provedor Ethereum
export const ethereumProvider = provider;