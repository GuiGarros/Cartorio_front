import Return from '@mui/icons-material/KeyboardBackspace';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import './sell.css';
import { useLocation } from 'react-router-dom';
import { getApiInstance } from '../../utils/axios';
import Cartorio from '../../../ethereum/Cartorio';
import { ethers } from 'ethers';
import ContratoVenda from "./../../../../Cartorio_Token_Hardhat/artifacts/contracts/cartorio.sol/ContratoVenda.json"

function Sell() {
    const {state} = useLocation();
    const dados = {...state};
    console.log(state);
    const [valor, setValor] = useState(0);
    const [metamaskAddress, setMetamask] = useState("");
    async function novaVenda() {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      await signer.getAddress();
      const CartorioWithSigner = await Cartorio.connect(signer);
      console.log(dados.contrato.id_patrimonio);
      const transaction = await CartorioWithSigner.criaVenda(dados.contrato.id_patrimonio);
      await transaction.wait();
      const contratoVendaAddress = await CartorioWithSigner.getVendaAddress(dados.contrato.id_patrimonio);
      console.log(contratoVendaAddress);

      const contratoVenda = new ethers.Contract(contratoVendaAddress,ContratoVenda.abi,signer);
      const contratoVendaWithSigner = await contratoVenda.connect(signer);
      const lancamentoContrato = await contratoVendaWithSigner.compradorAddress(metamaskAddress);
      await lancamentoContrato.wait();

      const lancavalor = await contratoVendaWithSigner.setValor(valor);
      await lancavalor.wait();

      const jsonVenda = {
        id_vendedor:dados.contrato.id_proprietario,
        valor:valor,
        endereco_contrato:contratoVendaAddress,
        endereco_meta_comprador:metamaskAddress,
        endereco_meta_vendedor:accounts[0],
        status:"1",
        id_patrimonio:dados.contrato.id_patrimonio,
        descricao:dados.contrato.descricao,
        titulo:dados.contrato.titulo,
      } 
      const instance = getApiInstance();
      await instance.post(`/vendas`,jsonVenda);
      
      const {data} = await instance.get(`/usuarios/meta/${metamaskAddress}`);
      const jsonCompra = {
        id_usuario:data.id_usuarios,
        valor:valor,
        endereco_meta_comprador:metamaskAddress,
        endereco_meta_vendedor:accounts[0],
        status:"1",
        id_imovel:dados.contrato.id_patrimonio,
        descricao:dados.contrato.descricao,
        titulo:dados.contrato.titulo,
        endereco_contrato:contratoVendaAddress,
      } 

      await instance.post(`/compras`,jsonCompra);

      const jsonContrato = {
        endereco_contrato:contratoVendaAddress,
      };
      console.log(jsonContrato);
      await instance.post(`/contratos`,jsonContrato);

      console.log(valor);
      console.log(metamaskAddress);
      
    }
  return (
    <>
      <div className="maindivsell">
        <div>
          <button className="buttonreturn">
            <Return fontSize="large" />
          </button>
        </div>
        <div className="container-sell">
          <div className="div-titulo">
            <h2 className="titulo-casa">{dados.contrato.titulo}</h2>
          </div>
          <div className="div-texto-casa">
            <h3 className="texto-casa"> Descrição: </h3>
          </div>
          <div className="div-descricao-casa">
            <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{dados.contrato.descricao}</h4>
          </div>
          <div className="div-valor-address-casa">
            <div className="div-valor-casa">
              <TextField
                id="fullWidth"
                label="Valor:"
                className="text-field-valor"
                variant="outlined"
                onChange={(event) => setValor(event.target.value)}
              />
            </div>
            <div className="div-address-casa">
              <TextField
                id="fullWidth"
                label=" MetaMask Address:"
                className="text-field-address"
                variant="outlined"
                onChange={(event) => setMetamask(event.target.value)}
              />
            </div>
          </div>
          <div className="div-venda-button">
            <button className="button-nova-venda-final"
                    onClick={novaVenda}
            >Vender</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sell;
