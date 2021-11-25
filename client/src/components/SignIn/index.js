import React, { useState } from 'react';
import Axios from 'axios';
import Alert from '@mui/material/Alert';
import './style.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [verify, setVerify] = useState(true);

    Axios.defaults.withCredentials = true;

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password,
        }).then((response) => {
            if (!response.data.auth) {
                setVerify(false);
            } else {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", username)
                navigate('/home');
            };
        });
    };

    return (
        <div className="login">
            
            <h1 className="display-3 m-4">Entrar</h1>

            <form className="d-flex flex-column w-75">
                <div className="mb-3">
                    <label className="form-label fs-5">Username:</label>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg my-style"
                            placeholder="Username..."
                            required
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div>
                    <label className="form-label fs-5">Senha:</label>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Senha..."
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                        />
                    </div>
                </div>
                
                {!verify &&
                    <Alert severity="warning" variant="outlined" style={{color: '#ff9800'}}>Usuário ou senha incorretos</Alert>
                }

                <div className="d-flex justify-content-around mt-3">
                    <button
                        type="button"
                        className="btn btn-primary btn-lg w-75"
                        onClick={login}
                    >
                        Entrar
                    </button>
                </div>
            </form>
        </div>
	);
}

export default SignIn;