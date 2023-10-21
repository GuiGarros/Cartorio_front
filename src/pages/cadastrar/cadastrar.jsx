import { TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getApiInstance } from '../../utils/axios';
import './cadastrar.css';
// import web3 from "../../../ethereum/web3"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { ethers } from 'ethers';
import Cartorio from '../../../ethereum/Cartorio';

function Cadastrar() {
  const [count, setCount] = useState(0);
  const [usuario, setUsuario] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [metaMask, setMetaMask] = useState('');
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRedirect = () => {
    // navigate('/');
  };

  function validacao() {
    if (senha !== senha2) {
      return false;
    } else if (
      usuario === '' ||
      nome === '' ||
      senha === '' ||
      senha2 === '' ||
      cpf === '' ||
      dataNascimento === '' ||
      endereco === '' ||
      metaMask === ''
    ) {
      return false;
    } else if(cpf.length !== 11 || metaMask.length !== 42) {
      return false;
    }

    return true;
  }

  async function cadastra() {
    const json = {
      usuario,
      nome,
      cpf,
      email,
      data_nascimento: dataNascimento,
      endereco: endereco,
      endereco_meta_mask: metaMask,
    };

    try {
      if (validacao()) {
        setAlert(false);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        //const signer = new ethers.Wallet('0x338ac048143fc98223dff0546400c62f5c29499527517f2ab4d07bf55b936330',ethereumProvider);
        const signer = provider.getSigner();
        await signer.getAddress();
        const CartorioWithSigner = await Cartorio.connect(signer);

        const transaction = await CartorioWithSigner.registraSenha(senha);
        await transaction.wait();

        const instance = getApiInstance();
        const { data } = await instance.post(`/usuarios`, json);
        navigate('/');
      } else {
        setAlert(true);
      }
    } catch (error) {
      setAlert(true);
      throw Error(error);
    }
  }

  return (
    <>
      <body>
        <div className="background-cadastro">
          {alert && (
            <Stack sx={{ width: '100%', position: 'absolute' }} spacing={2}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Os dados não conferem — <strong>Corrija e tente novamente!</strong>
              </Alert>
            </Stack>
          )}
          ;
          <div className="titulo-on-top-cadastro">
            <h1 className="titulo-cadastro">BUY & BUY</h1>
            <h2 className="subtitulo-cadastro">INOVATE YOUR WAY TO BUY ACTIVE</h2>
          </div>
          <div className="cadastro">
            <div>
              <h1 className="cadastro_titulo">Cadastrar</h1>
            </div>
            <div className="objeto-cadastro">
              <TextField
                id="fullWidth"
                className="objeto2"
                label="Usuario"
                variant="outlined"
                value={usuario}
                onChange={(event) => setUsuario(event.target.value)}
              />
            </div>
            <div className="objeto-cadastro">
              <TextField
                id="fullWidth"
                className="objeto2"
                label="Nome"
                variant="outlined"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            </div>
            <div className="objeto-cadastro">
              <TextField
                id="fullWidth"
                className="objeto2"
                type="password"
                label="Senha"
                variant="outlined"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
            </div>
            <div className="objeto-cadastro">
              <TextField
                id="fullWidth"
                className="objeto2"
                type="password"
                label="Repita a Senha"
                variant="outlined"
                value={senha2}
                onChange={(event) => setSenha2(event.target.value)}
              />
            </div>
            <div className="objeto-cadastro">
              <TextField
                id="fullWidth"
                className="objeto2"
                label="CPF"
                variant="outlined"
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
              />
            </div>
            <div className="objeto-cadastro">
              <TextField
                id="fullWidth"
                className="objeto2"
                label="E-mail"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="objeto-cadastro">
              <TextField
                id="fullWidth"
                className="objeto2"
                label="Data de Nascimento"
                variant="outlined"
                value={dataNascimento}
                onChange={(event) => setDataNascimento(event.target.value)}
              />
            </div>
            <div className="objeto-cadastro">
              <TextField
                id="fullWidth"
                className="objeto2"
                label="Endereço"
                variant="outlined"
                value={endereco}
                onChange={(event) => setEndereco(event.target.value)}
              />
            </div>
            <div className="objeto-cadastro">
              <TextField
                id="fullWidth"
                className="objeto2"
                label="MetaMask Address"
                variant="outlined"
                value={metaMask}
                onChange={(event) => setMetaMask(event.target.value)}
              />
            </div>
            {/* <div>
                      <FormatedInputs/>
                    </div> */}
            <div className="div-button-venda">
              <button
                className="button-cadastrar"
                onClick={() => {
                  cadastra();
                  handleRedirect();
                }}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Cadastrar;
