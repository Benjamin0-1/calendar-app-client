import React, { useState } from 'react';
import './Login.css';
import FetchWithAuth from '../auth/FetchWithAuth'; // <-- being used Here ?

const localhost_url = 'http://localhost:4001'

const accessToken = localStorage.getItem('accessToken');


const URL = process.env.REACT_APP_SERVER_URL;

function Login() {
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState('');

    // if access token then no need to view the login page
    if (accessToken) {
      window.location.href = '/showbookings'
    };


    // this logic needs to change
    // if the server responds posivetily,
    // then store the access and refresh token in localeStorage.
    /*
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:4001/login', {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
        console.log('DATA: ', data);
  
        if (data.access) {
          // context
 
          setAccess(true);
          setSuccessMessage('Login exitoso');

        } else {
          setError('Usuario o contraseña invalidos.');
          setSuccessMessage('');
          setAccess(false);
        }
  
      } catch (error) {
        console.error('Error during login:', error);
        setError('Ha ocurrido un error.');
        setSuccessMessage('');
      }
    };    */

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {

        const response = await fetch(`${URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ username, password }),

        });

        if (response.status === 401) {
          setError('Usuario o clave invalidos')
        };

        const data = await response.json();

        // check server.
        if (data.access) {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          // redirect after succeesful login?
          window.location.href = '/showbookings'

        } else {
          setError('Usuario o contraseña invalidos.');
          setSuccessMessage('');
        };

      } catch (error) {
        console.error('Error during login:', error);
        setError('Ha ocurrido un error.');
        setSuccessMessage('');
      }

    };


  return (
    <div className="Login">
      <h2>Login</h2>
      <p>Bienvenido al panel de administracion de terraza del valle</p>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>

      {alreadyLoggedIn && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          {alreadyLoggedIn}
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}

      

      
    </div>
  );
}

export default Login;
