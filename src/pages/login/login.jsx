import { TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cartorio from '../../../ethereum/Cartorio';
import { getApiInstance } from '../../utils/axios';
import './login.css';

function Login() {
  const [count, setCount] = useState(0);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  async function login(usuario) {
    try {
      setAlert(false);
      const instance = getApiInstance();
      const { data } = await instance.get(`/usuarios/${usuario}`);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      //const signer = new ethers.Wallet('0x338ac048143fc98223dff0546400c62f5c29499527517f2ab4d07bf55b936330',ethereumProvider);
      const CartorioWithSigner = await Cartorio.connect(signer);
      //const transaction = await CartorioWithSigner.registraPropriedade()

      const result = await CartorioWithSigner.getSenha();
      if (result === senha) {
        navigate('/home', { state: { data } });
      } else {
        setAlert(true);
      }
    } catch (error) {
      throw Error(error);
    }
  }

  return (
    <>
      <body>
        <div className="background">
          {alert && (
            <Stack sx={{ width: '100%', position:'absolute' }} spacing={2}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Verifiquei o usuario, senha e carteira — <strong>e tente novamente!</strong>
              </Alert>
            </Stack>
          )}
          <div className="titulo-on-top">
            <h1 className="titulo">BUY & BUY</h1>
            <h2 className="subtitulo">INOVATE YOUR WAY TO BUY ACTIVE</h2>
          </div>
          <div className="login">
            <div>
              <h1 className="login_titulo">Login</h1>
            </div>
            <div className="objeto">
              <TextField
                id="fullWidth"
                className="objeto2"
                label="Usuario"
                variant="outlined"
                value={usuario}
                onChange={(event) => setUsuario(event.target.value)}
              />
            </div>
            <div className="objeto">
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
            <div className="criar_conta">
              <h4
                onClick={() => {
                  navigate('/cadastrar');
                }}
              >
                criar conta
              </h4>
            </div>
            <div>
              <button
                className="entrar"
                variant="contained"
                size="large"
                onClick={() => {
                  login(usuario);
                }}
              >
                ENTRAR
              </button>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Login;
