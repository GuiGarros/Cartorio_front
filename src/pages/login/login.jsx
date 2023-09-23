import './login.css'
import { useState } from 'react'
import { TextField } from '@mui/material'
function Login() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className='background'>
            <div className='login'>
                <div className='objeto'>
                <TextField id="standard-basic" label="Standard" variant="standard" />
                </div>
            </div>
        </div>
    </>
  )
}

export default Login
