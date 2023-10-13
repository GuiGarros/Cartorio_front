import './cadastrar.css'
import { useState } from 'react'
import { TextField } from '@mui/material'


function Cadastrar() {
    const [count, setCount] = useState(0);
    return (
        <body>
        <div className='background-cadastro' >
              <div className='titulo-on-top-cadastro'>
                <h1 className='titulo-cadastro'>BUY & BUY</h1>
                <h2 className='subtitulo-cadastro'>INOVATE YOUR WAY TO BUY ACTIVE</h2>
              </div>
                <div className='cadastro'>
                    <div>
                      <h1 className='cadastro_titulo'>Cadastrar</h1>
                    </div>
                    <div className='objeto-cadastro'>
                      <TextField  id="fullWidth" className='objeto2' label="Usuario" variant="outlined" />
                    </div>
                    <div className='objeto-cadastro'>
                      <TextField  id="fullWidth" className='objeto2' label="Nome" variant="outlined" />
                    </div>
                    <div className='objeto-cadastro'>
                      <TextField  id="fullWidth" className='objeto2' type="password" label="Senha" variant="outlined" />
                    </div>
                    <div className='objeto-cadastro'>
                      <TextField  id="fullWidth" className='objeto2' type="password" label="Repita a Senha" variant="outlined" />
                    </div>
                    <div className='objeto-cadastro'>
                      <TextField  id="fullWidth" className='objeto2' label="CPF" variant="outlined" />
                    </div>
                    <div className='objeto-cadastro'>
                      <TextField  id="fullWidth" className='objeto2' label="E-mail" variant="outlined" />
                    </div>
                    <div className='objeto-cadastro'>
                      <TextField  id="fullWidth" className='objeto2' label="Data de Nascimento" variant="outlined" />
                    </div>
                    <div className='objeto-cadastro'>
                      <TextField  id="fullWidth" className='objeto2' label="Endereço" variant="outlined" />
                    </div>
                    <div className='objeto-cadastro'>
                      <TextField  id="fullWidth" className='objeto2' label="MetaMask Address" variant="outlined" />
                    </div>

                </div>
        </div>
      </body>

    )
}

export default Cadastrar