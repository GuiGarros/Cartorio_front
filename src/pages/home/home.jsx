import LogoutIcon from '@mui/icons-material/Logout';
import { TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Cartorio from '../../../ethereum/Cartorio';
import Accordion from '../../components/Accordion/Accordion';
import ButtonGroup from '../../components/ButtonGroups/ButtonGroups';
import { getApiInstance } from '../../utils/axios';
import './home.css';

function HomePage() {
  const [activeTab, setActiveTab] = useState('Propriedades');
  const [dados, setDados] = useState([]);
  const [contrato, setContrato] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [senha0, setSenha0] = useState('');
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');
  const [email, setEmail] = useState('');
  const [senhaMail, setSenhaMail] = useState('');
  const [alert, setAlert] = useState(false);
  let id = state.data.id_usuarios;

  async function validaSenhaAtual(senhaToCompare) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const CartorioWithSigner = await Cartorio.connect(signer);
    const result = await CartorioWithSigner.getSenha();

    if (result === senhaToCompare) {
      return true;
    }

    return false;
  }

  function back() {
    navigate(-1);
  }

  function handleClick(contrato) {
    setContrato(contrato);
  }

  async function handleClickMudaSeha() {
    if (senha === senha2 && (await validaSenhaAtual(senha0))) {
      setAlert(false);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      await signer.getAddress();
      const CartorioWithSigner = await Cartorio.connect(signer);
      const transaction = await CartorioWithSigner.registraSenha(senha);
      await transaction.wait();
    } else {
      setAlert(true);
    }
  }

  async function handleclickMudaEmail() {
    if (await validaSenhaAtual(senhaMail)) {
      setAlert(false);
      const jsonChangeEmail = {
        id_usuarios: id,
        email: email,
      };
      const { data } = await instance.put('/usuarios', jsonChangeEmail);
    } else {
      setAlert(true);
    }
  }
  function handleClickVenda(contrato) {
    navigate('/novavenda', { state: { contrato } });
  }

  function handleClickCompra(contrato) {
    if (parseInt(contrato.status) === 1) {
      navigate('/novacompra', { state: { contrato } });
    }
  }

  function handleClickCancela(contrato) {
    if(parseInt(contrato.status) === 1) {
      navigate('/cancelavenda',{state:{contrato}});
    }
  }

  const dispatch = useDispatch();
  const instance = getApiInstance();

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
        {alert && (
          <Stack sx={{ width: '100%', position: 'absolute' }} spacing={2}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Os dados não conferem — <strong>Verfique a senha e tente novamente!</strong>
            </Alert>
          </Stack>
        )}
        ;
        <div className="teste">
          <button className="logoutbutton" onClick={back}>
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
                  aba={activeTab}
                  handleClick={() => {
                    handleClick(dado);
                  }}
                />
              ))}
          </div>
          {activeTab === 'Perfil' && (
            <>
              <div className="div-change-user-config">
                <h2>Mudar Senha</h2>
                <div className="objeto-cadastro">
                  <TextField
                    id="fullWidth"
                    type="password"
                    label="Senha atual"
                    variant="outlined"
                    className="text-field-home"
                    value={senha0}
                    onChange={(event) => setSenha0(event.target.value)}
                  />
                </div>
                <div className="objeto-cadastro">
                  <TextField
                    id="fullWidth"
                    type="password"
                    label="Nova senha"
                    variant="outlined"
                    className="text-field-home"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                  />
                </div>
                <div className="objeto-cadastro">
                  <TextField
                    id="fullWidth"
                    type="password"
                    label="Repita a nova Senha"
                    variant="outlined"
                    className="text-field-home"
                    value={senha2}
                    onChange={(event) => setSenha2(event.target.value)}
                  />
                </div>
                <button onClick={handleClickMudaSeha} className="button-user-config">
                  Mudar senha
                </button>
                <h2>Mudar Email</h2>
                <div className="objeto-cadastro">
                  <TextField
                    id="fullWidth"
                    type="text"
                    label="Novo Email"
                    variant="outlined"
                    className="text-field-home"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="objeto-cadastro">
                  <TextField
                    id="fullWidth"
                    type="password"
                    label="Senha"
                    variant="outlined"
                    className="text-field-home"
                    value={senhaMail}
                    onChange={(event) => setSenhaMail(event.target.value)}
                  />
                </div>
                <button onClick={handleclickMudaEmail} className="button-user-config">
                  Mudar Email
                </button>
              </div>
            </>
          )}
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
        {activeTab === 'Vendas' && (
          <div className="divbutton">
            <button
              className="vendabutton"
              disabled={contrato === null}
              onClick={() => {
                handleClickCancela(contrato);
              }}
            >
              Cancelar Venda
            </button>
          </div>
        )}
        <div className="div-valor-casa"></div>
      </div>
    </body>
  );
}

export default HomePage;
