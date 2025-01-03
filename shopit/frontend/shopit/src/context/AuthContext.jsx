import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import api from '../api'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");


    const handleAuth = () => {
        const token = localStorage.getItem("access");
        if (token) {
            const decoded = jwtDecode(token);
            const expiry_time = decoded.exp;
            const current_time = Date.now() / 1000;
            if (expiry_time >= current_time) {
                setIsAuthenticated(true);
            };
        };
    };

    function getUsername() {
        if (!isAuthenticated) {
            return;
        };
        api.get('/get_username/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`
            }
        })
            .then((response) => {
                setUsername(response.data.username);
            })
            .catch((error) => {
                console.error("Failed to fetch username:", error);
            });
    };

    useEffect(() => {
        handleAuth();
    }, []);

    useEffect(() => {
        getUsername();
    }, [isAuthenticated]);

    const authValue = { isAuthenticated, username, setIsAuthenticated, getUsername }

    return (
        <AuthContext.Provider value={authValue}> {children} </AuthContext.Provider>
    );
};
