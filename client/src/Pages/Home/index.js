import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Structure from '../../components/Structure';
import Content from '../../components/Content';
import './style.css';

const Home = () => {

    const user = localStorage.getItem("user");

    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            if (!response.data.auth) {
                setIsAuth(false);
                navigate('/')
            } else {
                setIsAuth(true);
            }
        })
    }, [])

    return (
        <Structure>
            <main className="container-main-home">
                <h1>Bem vindo(a) de volta <span>{user}</span></h1>

                <Content />
            </main>
        </Structure>
    );
}

export default Home;