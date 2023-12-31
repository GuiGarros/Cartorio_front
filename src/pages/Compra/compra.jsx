import Return from '@mui/icons-material/KeyboardBackspace';
import { TextField } from '@mui/material';
import React from 'react';
import './compra.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { getApiInstance } from '../../utils/axios';
import Cartorio from '../../../ethereum/Cartorio';
import { ethers } from 'ethers';
import ContratoVenda from "./../../../../Cartorio_Token_Hardhat/artifacts/contracts/cartorio.sol/ContratoVenda.json"


function Buy() {
    const {state} = useLocation();
    const compra = {...state};
    const navigate = useNavigate();
    function back() {
      navigate(-1);
    }
    async function comprar() {
      try {
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
        const transaction2 = await CartorioWithSigner.finalizaVenda(compra.contrato.id_imovel);
        await transaction2.wait();
  
        const instance = getApiInstance();
        const jsonCompra = {
          id_compra:compra.contrato.id_compra,
          status_compra:"2",
        }
        const {data} = await instance.put(`/compras`,jsonCompra);
        const jsonVenda = {
          id_venda:compra.contrato.id_venda,
          status_venda:"2"
        } 
        const {data2} = await instance.put(`/vendas`,jsonVenda);
        const jsonPropriedade = {
          id_patrimonio:compra.contrato.id_imovel,
          id_comprador:compra.contrato.id_usuario,
        }
        const {data3} = await instance.put(`/imoveis`,jsonPropriedade);
        navigate(-1);

      }catch(err) {
        console.log(err);
      }
    }
  return (
    <>
      <div className="maindivsell">
        <div>
          <button onClick={back} className="buttonreturn">
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
            <button className="button-nova-venda-final" onClick={comprar}>Comprar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Buy;
