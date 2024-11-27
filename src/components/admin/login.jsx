import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import fondo from '../../assets/image/Logo2.png';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Manejar el cambio en los campos de entrada
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginData = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(
                'https://movilidadback.ujed.mx/users/login/', 
                loginData, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            const { token, user } = response.data;

            //console.log("Token recibido:", response.data.token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', response.data.token);
            //window.location.href = "/dashboard";
            navigate("/main/inicio"); 
    
        } catch (err) {
            setError('Correo o contraseña incorrectos');
        }
    };

    return (
        <div className='contenedor'>
            <div className='login'>
                <div className='logo'>
                    <img src={fondo} alt="Logo Movilidad" />
                </div>
                <form onSubmit={handleSubmit} className='formulario'>
                    <div className='mb-3'>
                        <label htmlFor="email" className='form-label'>Correo institucional</label>
                        <input
                            type="email"
                            className='form-control'
                            id='email'
                            value={email}
                            onChange={handleEmailChange}
                            aria-describedby='emailHelp'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className='form-label'>Contraseña</label>
                        <input
                            type="password"
                            className='form-control'
                            id='password'
                            value={password}
                            onChange={handlePasswordChange}
                            aria-describedby='passwordHelp'
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger error-message">{error}</div>}
                    <div className='mb-3'>
                        <a href="/registro" className=''>Crear Cuenta</a>
                    </div>
                    <button type="submit" className="btn ingresar">Ingresar</button>
                </form>
            </div>
        </div>
    );
}
