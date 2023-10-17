import React, { Component } from 'react';
import { ethers } from "ethers";

class Metamask extends Component {
  constructor(props) {
    super(props);
  }

  async connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);
    this.setState({ selectedAddress: accounts[0] })
  }

  render() {
    return(
      <div>
      </div>
    )
  }
}

export default Metamask;