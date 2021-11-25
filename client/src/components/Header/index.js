import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from '../Logout';
import './style.css';

export default function Header() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }).then((response) => {
      if (!response.data.auth) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    })
  }, [])

  return (
    <div 
      className="container-header"
      style={{
        justifyContent: isAuth ? 'space-between' : 'center',
      }}
    >
      <h1 
        className="text-light display-2"
        style={{
          marginRight: isAuth ? '1em' : '0',
        }}
      >
        Movies Reviews
      </h1>

      {isAuth &&
        <div className="container-logout">
          <Logout />
        </div>
      }
    </div>
  );
}