import LogoutIcon from '@mui/icons-material/Logout';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from '../../components/Accordion/Accordion';
import ButtonGroup from '../../components/ButtonGroups/ButtonGroups';
import { getApiInstance } from '../../utils/axios';
import './home.css';

function HomePage() {
  const [activeTab, setActiveTab] = useState(
    'Propriedades'
  );
  const [dados, setDados] = useState([]);
  const [contrato, setContrato] = useState(null);
  const navigate = useNavigate();
  const {state} = useLocation();


  function handleClick(contrato) {
    setContrato(contrato);
  }

  function handleClickVenda(contrato) {
    console.log(contrato);
    navigate("/novavenda",{state:{contrato}});
  }

  function handleClickCompra(contrato) {
    console.log(contrato);
    if(parseInt(contrato.status) === 1){
      navigate("/novacompra",{state:{contrato}});
    }

  }


  const dispatch = useDispatch();
  const instance = getApiInstance();

  let id = state.data.id_usuarios;

  useEffect(() => {
    async function getData() {
      setContrato(null);
      //const {data} = await instance.get(`/usuarios/${usuario}`)

      if (activeTab === 'Propriedades') {
        const instance = getApiInstance();
        const { data } = await instance.get(`/imoveis/${id}`);
        setDados(data);
      } else if (activeTab === 'Vendas') {
        const instance = getApiInstance();
        const { data } = await instance.get(`/vendas/${id}`);
        setDados(data);
      } else if (activeTab === 'Compras') {
        const instance = getApiInstance();
        const { data } = await instance.get(`/compras/${id}`);
        setDados(data);
      } else {
        setDados([]);
      }
    }

    getData();
  }, [activeTab]);

  return (
    <body>
      <div className="background-home">
        <div className="teste">
          <button className="logoutbutton">
            <LogoutIcon className="logout" fontSize="large" />
          </button>
          <div className="titulo-on-top-home">
            <h1 className="titulo-home">BUY & BUY</h1>
          </div>
        </div>
        <div className="container">
          <div className="buttongrouphome">
            <ButtonGroup activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="backdiv"></div>
            {dados.length !== 0 &&
              dados.map((dado, index) => (
                <Accordion 
                  contrato={contrato}
                  dados={dado}
                  key={index}
                  aba = {activeTab}
                  handleClick={() => {
                    handleClick(dado);
                  }}
                />
              ))}
          </div>
        </div>
        {activeTab === 'Propriedades' && (
          <div className="divbutton">
            <button
              className="vendabutton"
              disabled={contrato === null}
              onClick={() => {
                handleClickVenda(contrato);
              }}
            >
              NOVA VENDA
            </button>
          </div>
        )}
        {activeTab === 'Compras' && (
          <div className="divbutton">
            <button
              className="vendabutton"
              disabled={contrato === null}
              onClick={() => {
                handleClickCompra(contrato);
              }}
            >
              COMPRAR
            </button>
          </div>
        )}

        <div className="div-valor-casa"></div>
      </div>
    </body>
  );
}

export default HomePage;
