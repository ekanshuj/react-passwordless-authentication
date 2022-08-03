import React from 'react';
import { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'universal-cookie';

const Authenticate = () => {
  const [searchParams] = useSearchParams();
  const cookie = new Cookies();

  useEffect(() => {
    Axios.post('http://localhost:5000/authenticate', {
      token: searchParams.get('token')
    }).then((resp) => {
      cookie.set('sessionToken', resp.data)
    });
  })


  return <Navigate to='/' replace />
}

export default Authenticate