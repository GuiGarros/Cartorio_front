import Return from '@mui/icons-material/KeyboardBackspace';
import { TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cartorio from '../../../ethereum/Cartorio';
import { getApiInstance } from '../../utils/axios';
import ContratoVenda from './../../../../Cartorio_Token_Hardhat/artifacts/contracts/cartorio.sol/ContratoVenda.json';
import './sell.css';

function Sell() {
  const { state } = useLocation();
  const dados = { ...state };
  const [valor, setValor] = useState(0);
  const [metamaskAddress, setMetamask] = useState('');
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  function validaVenda() {
    if (valor === '' || metamaskAddress === '' || metamaskAddress.length !== 42) {
      return false;
    }
    return true;
  }
  function back() {
    navigate(-1);
  }
  async function insereVenda(json) {
    const instance = getApiInstance();
    const { data } = await instance.post(`/vendas`, json);
    return data;
  }
  async function novaVenda() {
    if (validaVenda()) {
      setAlert(false);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);

      const signer = provider.getSigner();
      await signer.getAddress();
      const CartorioWithSigner = await Cartorio.connect(signer);
      const transaction = await CartorioWithSigner.criaVenda(dados.contrato.id_patrimonio,valor,metamaskAddress);
      await transaction.wait();
      const contratoVendaAddress = await CartorioWithSigner.getVendaAddress(
        dados.contrato.id_patrimonio
      );

      const jsonVenda = {
        id_vendedor: dados.contrato.id_proprietario,
        valor: valor,
        endereco_contrato: contratoVendaAddress,
        endereco_meta_comprador: metamaskAddress,
        endereco_meta_vendedor: accounts[0],
        status: '1',
        id_patrimonio: dados.contrato.id_patrimonio,
        descricao: dados.contrato.descricao,
        titulo: dados.contrato.titulo,
        endereco: dados.contrato.endereco,
      };
      const instance = getApiInstance();
      const post = await insereVenda(jsonVenda);

      const { data } = await instance.get(`/usuarios/meta/${metamaskAddress}`);
      const jsonCompra = {
        id_usuario: data.id_usuarios,
        valor: valor,
        endereco_meta_comprador: metamaskAddress,
        endereco_meta_vendedor: accounts[0],
        status: '1',
        id_imovel: dados.contrato.id_patrimonio,
        descricao: dados.contrato.descricao,
        titulo: dados.contrato.titulo,
        endereco_contrato: contratoVendaAddress,
        id_venda: post.id_venda,
        endereco: dados.contrato.endereco,
      };

      await instance.post(`/compras`, jsonCompra);

      const jsonContrato = {
        endereco_contrato: contratoVendaAddress,
      };
      await instance.post(`/contratos`, jsonContrato);
      navigate(-1);
    } else {
      setAlert(true);
    }
  }
  return (
    <>
      <div className="maindivsell">
        {alert && (
          <Stack sx={{ width: '100%', position: 'absolute', top: '0' }} spacing={2}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Verifique o valor e o endereco metamask — <strong>e tente novamente!</strong>
            </Alert>
          </Stack>
        )}
        <div>
          <button className="buttonreturn" onClick={back} style={alert ? { 'margin-top': '60px' } : {}} >
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
            <button className="button-nova-venda-final" onClick={novaVenda}>
              Vender
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sell;
