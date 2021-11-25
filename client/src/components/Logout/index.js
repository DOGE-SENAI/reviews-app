import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/');
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-outline-danger btn-lg"
                onClick={logout}
            >
                Logout
            </button>
        </>
    );
}

export default Logout;
