import React, { useState } from 'react';
import Axios from 'axios';

const Login = () => {

  const [email, setEmail] = useState('');

  const login = async () => {
    await Axios.post("http://localhost:5000/login", { email });
  }

  return (
    <div className='login'>
      <div style={{ padding: '25px' }} className="container">
        <h1 style={{ textTransform: 'uppercase' }}>React Passwordless Authentication</h1>
        <div style={{ marginTop: '10px', marginBottom: '10px', padding: '10px' }} className="login_body">
          <input style={{ height: '50px', width: '325px' }} type="email" name="text" id="text" onChange={(e) => { setEmail(e.target.value) }} />
          <button style={{ height: '50px', marginLeft: '5px', padding: '0px 10px' }} onClick={login}>Enter</button>
        </div>
      </div>
    </div>
  )
}

export default Login