import Return from '@mui/icons-material/KeyboardBackspace';
import { TextField } from '@mui/material';
import React from 'react';
import './sell.css';
import { useLocation } from 'react-router-dom';

function Sell() {
    const {state} = useLocation();
    console.log(state);
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
            <h2 className="titulo-casa">CASA</h2>
          </div>
          <div className="div-texto-casa">
            <h3 className="texto-casa"> Descrição: </h3>
          </div>
          <div className="div-descricao-casa"></div>
          <div className="div-valor-address-casa">
            <div className="div-valor-casa">
              <TextField
                id="fullWidth"
                label="Valor:"
                className="text-field-valor"
                variant="outlined"
              />
            </div>
            <div className="div-address-casa">
              <TextField
                id="fullWidth"
                label=" MetaMask Address:"
                className="text-field-address"
                variant="outlined"
              />
            </div>
          </div>
          <div className="div-venda-button">
            <button className="button-nova-venda-final">Vender</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sell;
