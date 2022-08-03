import React from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';

const Home = () => {
  const cookie = new Cookies();

  const testSession = () => {
    Axios.post('http://localhost:5000/test',
      {},
      { headers: { sessiontoken: cookie.get('sessionToken').session_token } }
    )
      .then(resp => alert(resp.data))
      .catch(err => alert('Authentication Failed'))
  }

  return (
    <div style={{ padding: '20px' }}>
      <button style={{ padding: '10px', fontSize: '1.555rem' }} onClick={testSession}>Authenticate Test Session!</button>
    </div>
  )
}

export default Home