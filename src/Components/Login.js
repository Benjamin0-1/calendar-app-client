import React, { useState, useContext } from 'react';
import { LoginContext } from '../App';
import { Navigate } from 'react-router-dom';
import './Login.css';

const localhostURL = 'http://localhost:4001/login';

function Login() {
    const {access, setAccess } = useContext(LoginContext);
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('https://calendar-app-server3-2499724774e3.herokuapp.com/login', {
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
    };


  return (
    <div className="Login">
      <h2>Login</h2>
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
