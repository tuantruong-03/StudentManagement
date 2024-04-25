import { useContext, createContext, Component, FC, useState, ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const LOGIN_POST = 'http://localhost:8080/auth/login'


const authStateInit = {
    isAuthenticated: false,  // example state
    user: null,              // example state
    token: localStorage.getItem("site") || null,
    login: (input: object) => { },
    logout: () => { },
};

const AuthContext = createContext(authStateInit);
// Define the type for the props of AuthProvider (including any auth-related states or functions)
interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    // You might want to include authentication state and functions here
    const [authState, setAuthState] = useState(authStateInit)
    const navigate = useNavigate();
    const login = async (input: object) => {
        try {
            const response = await fetch(LOGIN_POST, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            })
            const data = await response.json();
            console.log(data)
            // Data includes {token, user}
            if (response.ok) {
                setAuthState(prev => ({
                    ...prev,
                    isAuthenticated: true,
                    user: data.user,
                    token: data.token
                }));
                localStorage.setItem("site", data.token);  // Save token in localStorage
                navigate("/");  // Navigate to the dashboard after successful login
            } else {
                throw new Error('Login failed!');
            }

        } catch (err) {
            throw err;
        }
    }
    const logout = () => {
        setAuthState((prevAuthState) => {
            return {
                ...prevAuthState,
                isAuthenticated: false,
                user: null,
                token: null
            }
        })
    }
    // setAuthState only once
    useEffect(() => {
        setAuthState(prev => ({
            ...prev,
            login,
            logout,
        }));
    }, []);

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
};



export default AuthProvider;
export const useAuth = () => {
    return useContext(AuthContext);
}