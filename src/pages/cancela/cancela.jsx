import Return from '@mui/icons-material/KeyboardBackspace';
import { TextField } from '@mui/material';
import React from 'react';
import './cancela.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { getApiInstance } from '../../utils/axios';
import Cartorio from '../../../ethereum/Cartorio';
import { ethers } from 'ethers';
import ContratoVenda from "./../../../../Cartorio_Token_Hardhat/artifacts/contracts/cartorio.sol/ContratoVenda.json"


function Cancell() {
    const {state} = useLocation();
    const venda = {...state};
    console.log(venda.contrato.id_patrimonio);
    const navigate = useNavigate();
    function back() {
      navigate(-1);
    }
    async function CancelarCompra() {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
  
        const signer = provider.getSigner();
        await signer.getAddress();
        const CartorioWithSigner = await Cartorio.connect(signer);
        
        const transaction = await CartorioWithSigner.cancelaCompra(parseInt(venda.contrato.id_patrimonio));
        await transaction.wait()
  
        const instance = getApiInstance();
        const jsonCompra = {
          id_venda:venda.contrato.id_venda,
          status_compra:"3",
        }
        const {data} = await instance.put(`/compras/cancela`,jsonCompra);
        const jsonVenda = {
          id_venda:venda.contrato.id_venda,
          status_venda:"3"
        } 
        const {data2} = await instance.put(`/vendas`,jsonVenda);

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
            <h2 className="titulo-casa">{venda.contrato.titulo}</h2>
          </div>
          <div className="div-texto-casa">
            <h3 className="texto-casa"> Descrição: </h3>
          </div>
          <div className="div-descricao-casa">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{venda.contrato.descricao}</div>
          <div className="div-valor-address-casa">
            <div className="div-valor-casa">
              <TextField
                id="fullWidth"
                disabled
                className="text-field-valor"
                variant="outlined"
                defaultValue={venda.contrato.valor}
              />
            </div>
            <div className="div-address-casa-compra">
              <TextField
                id="fullWidth"
                disabled
                className="text-field-address"
                defaultValue={venda.contrato.endereco_meta_vendedor}
              />
            </div>
          </div>
          <div className="div-venda-button">
            <button className="button-nova-venda-final" onClick={CancelarCompra}>Cancelar Venda</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cancell;
