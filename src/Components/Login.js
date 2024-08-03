import React, { useState } from 'react';
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_SERVER_URL;

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Use navigate for redirection
    const accessToken = localStorage.getItem('accessToken');

    // Redirect if access token exists
    if (accessToken) {
        navigate('/showbookings');
        return null; // Ensure nothing else is rendered
    }

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
                toast.error('Usuario o clave inválidos');
                return;
            }

            const data = await response.json();

            if (data.tooManyAttempts) {
                toast.error('Demasiados intentos. Intenta de nuevo en 5 minutos.');
                return;
            }

            if (data.access) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);

                navigate('/showbookings');
            } else {
                toast.error('Usuario o contraseña inválidos.');
            }

        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Ha ocurrido un error.');
        }
    };

    return (
        <div className="Login">
            <h2>Login</h2>
            <p>Bienvenido al panel de administración de terraza del valle</p>
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

            {/* Include ToastContainer to render toasts */}
            <ToastContainer />
        </div>
    );
}

export default Login;
