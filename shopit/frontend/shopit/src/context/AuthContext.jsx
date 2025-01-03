import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext(false);

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleAuth = () => {
        const token = localStorage.getItem("access");
        if (token) {
            const decoded = jwtDecode(token);
            const expiry_time = decoded.exp;
            const current_time = Date.now() / 1000;
            if (expiry_time >= current_time) {
                setIsAuthenticated(true);
            }
        }

    }
    useEffect(() => {
        handleAuth();
    }, []);

    const authValue = {isAuthenticated, setIsAuthenticated}

        return (
            <AuthContext.Provider value={authValue}> {children} </AuthContext.Provider>
        );
    }

    export { AuthContext, AuthProvider };