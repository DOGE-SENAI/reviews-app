import React, { useState } from 'react';
import Axios from 'axios';
import { Alert } from '@mui/material';
import './style.css';

const SignUp = () => {
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [verifyInputs, setVerifyInputs] = useState(true);

    const register = () => {
        if ((usernameReg === "") || (passwordReg === "")) {
            setVerifyInputs(false);
        } else {
            Axios.post('http://localhost:3001/register', {
                username: usernameReg,
                password: passwordReg,
            })

            setVerifyInputs(true)

            setUsernameReg('');
            setPasswordReg('');
        }

        document.getElementById("usernameInput").value = "";
        document.getElementById("passwordInput").value = "";

    };

    return (
        <div className="registration">

            <h1 className="display-3 m-4">Criar Conta</h1>

            <form className="d-flex flex-column w-75">
                <div>
                    <label className="form-label fs-5">Username:</label>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="ex: Adam@123"
                            id="usernameInput"
                            required
                            onChange={(e) => {
                                setUsernameReg(e.target.value);
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
                            placeholder="Senha"
                            id="passwordInput"
                            onChange={(e) => {
                                setPasswordReg(e.target.value);
                            }}
                            required
                        />
                    </div>
                </div>

                {!verifyInputs &&
                    <Alert severity="warning" variant="outlined" style={{color: '#ff9800'}}>Preenche os campos para criar uma conta</Alert>
                }

                <div className="d-flex align-items-center justify-content-center mt-3 ">
                    <button
                        type="button"
                        className="btn btn-outline-success btn-lg w-75"
                        onClick={register}
                    >
                        Criar Conta
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;