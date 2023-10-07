import './login.css'
import { useState } from 'react'
import { TextField } from '@mui/material'
import web3 from "./../../web3"

function Login() {
  const [count, setCount] = useState(0);
  return (
    <>
      <body>
        <div className='background'>
              <div className='titulo-on-top'>
                <h1 className='titulo'>BUY & BUY</h1>
              </div>
                <div className='login'>
                    <div className='objeto'>
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                    </div>
                </div>
        </div>
      </body>
    </>
  )
}

export default Login
