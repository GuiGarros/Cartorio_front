import './login.css'
import { useState } from 'react'
import { TextField } from '@mui/material'
import web3 from "./../../web3"

function Login() {

  const [count, setCount] = useState(0);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState(""); 

  return (
    <>
      <body>
        <div className='background'>
              <div className='titulo-on-top'>
                <h1 className='titulo'>BUY & BUY</h1>
                <h2 className='subtitulo'>INOVATE YOUR WAY TO BUY ACTIVE</h2>
              </div>
                <div className='login'>
                    <div>
                      <h1 className='login_titulo'>Login</h1>
                    </div>
                    <div className='objeto'>
                      <TextField  id="fullWidth" className='objeto2' label="Usuario" variant="outlined" />
                    </div>
                    <div className='objeto'>
                      <TextField  id="fullWidth" className='objeto2' type="password" label="Senha" variant="outlined" onChange={setSenha} />
                    </div>
                    <div className='criar_conta'>
                      <h4>criar conta</h4>
                    </div>
                    <div>
                        <button className='entrar' variant="contained"  size="large">
                          ENTRAR
                        </button>
                    </div>
                </div>
        </div>
      </body>
    </>
  )
}

export default Login
