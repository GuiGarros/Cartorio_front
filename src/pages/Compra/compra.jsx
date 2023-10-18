import Return from '@mui/icons-material/KeyboardBackspace';
import { TextField } from '@mui/material';
import React from 'react';
import './compra.css';
import { useLocation } from 'react-router-dom';
import { getApiInstance } from '../../utils/axios';
import Cartorio from '../../../ethereum/Cartorio';
import { ethers } from 'ethers';
import ContratoVenda from "./../../../../Cartorio_Token_Hardhat/artifacts/contracts/cartorio.sol/ContratoVenda.json"


function Buy() {
    const {state} = useLocation();
    const compra = {...state};
    console.log(compra);

    async function comprar() {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      await signer.getAddress();
      const CartorioWithSigner = await Cartorio.connect(signer);

      const contratoVendaAddress = compra.contrato.endereco_contrato;

      const contratoVenda = new ethers.Contract(contratoVendaAddress,ContratoVenda.abi,signer);
      const contratoVendaWithSigner = await contratoVenda.connect(signer);
      const transaction = await contratoVendaWithSigner.finalizarVenda({value:compra.contrato.valor});
      await transaction.wait();

      const transaction2 = await CartorioWithSigner.finalizaVenda();
      await transaction2.wait();

      



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
            <h2 className="titulo-casa">{compra.contrato.titulo}</h2>
          </div>
          <div className="div-texto-casa">
            <h3 className="texto-casa"> Descrição: </h3>
          </div>
          <div className="div-descricao-casa">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{compra.contrato.descricao}</div>
          <div className="div-valor-address-casa">
            <div className="div-valor-casa">
              <TextField
                id="fullWidth"
                disabled
                className="text-field-valor"
                variant="outlined"
                defaultValue={compra.contrato.valor}
              />
            </div>
            <div className="div-address-casa-compra">
              <TextField
                id="fullWidth"
                disabled
                className="text-field-address"
                defaultValue={compra.contrato.endereco_meta_vendedor}
              />
            </div>
          </div>
          <div className="div-venda-button">
            <button className="button-nova-venda-final">Comprar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Buy;
