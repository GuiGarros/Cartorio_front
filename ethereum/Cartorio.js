import { ethereumProvider } from "./ethers";
import {ethers} from "ethers"
import Cartorio from "./../../Cartorio_Token_Hardhat/artifacts/contracts/cartorio.sol/Cartorio.json"
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = ethereumProvider.getSigner(accounts[0]);

const instance = new ethers.Contract("0x562f85c786F20492985A84bc1FCA9c91Accb03de",Cartorio.abi, signer);

export default instance