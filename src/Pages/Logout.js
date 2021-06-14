import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import AuthContext from '../Context/AuthContext';

function Logout() {
    const context = useContext(AuthContext);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    
    useEffect(() => {
        context.setIsLoggedIn(false);
        context.setToken(null);
    })

    return (
        <Redirect to="/login?logout=success" />
    );
};

export default Logout;
