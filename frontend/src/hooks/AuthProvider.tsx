import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const hours = 3;
const expiryDate = new Date();
expiryDate.setTime(expiryDate.getTime() + (hours * 60 * 60 * 1000)); // Milliseconds conversion



const LOGIN_POST = 'http://localhost:8080/auth/login'

// Initial state with authentication check
const getToken = () => {
    const token = Cookies.get('token');
    return token ? token : null
} 
const getUser = () => {
    const userJson = Cookies.get('user');
    try {
        return userJson ? JSON.parse(userJson) : null;
    } catch (e) {
        console.error('Failed to parse user data:', e);
        return null;
    }
};

const authStateInit = {
    isAuthenticated: !!getUser(),  // Checks if token is not null
    user: getUser(),                     // Example state
    token: getToken(),
    login: async (input: object) => Promise<any>,
    logout: () => {},
};

const AuthContext = createContext(authStateInit);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authState, setAuthState] = useState(authStateInit);
    const navigate = useNavigate();

    // Define login function
    const login = async (input: object): Promise<any> => {
        try {
            const response = await axios(LOGIN_POST, {
                method: 'POST',
                withCredentials: true, // This is critical for cookies to be sent and received
                
                data: input
            });
            // After fetch backend server, server response with Set-Cookie header (include token and user)
            if (response.status == 200) { // OK
                setAuthState(prev => {
                    const userJson = Cookies.get('user');
                    console.log("userJson", userJson)
                    let user = null;
                    if (userJson) {
                        try {
                            user = JSON.parse(userJson);
                        } catch (error) {
                            console.error('Failed to parse user JSON:', error);
                            // Handle the error appropriately (maybe clear the cookie or notify the user)
                        }
                    }
                    return {
                        ...prev,
                        isAuthenticated: true,
                        user: user,
                        token: Cookies.get('token') || null,
                    };
                });
                // Cookies.set("token", data.token, {path: "/", expires: expiryDate})
                // Cookies.set("user", JSON.stringify(data.user), {path: "/", expires: expiryDate})
                navigate("/");
                return null;
            } else {
                return "Invalid username or password";
            }
        } catch (err) {
            console.error("Login Error: ", err);
            return "Invalid username or password";
        }
    };

    // Define logout function
    const logout = () => {
        Cookies.remove("token", {path: '/'});
        Cookies.remove("user", {path: '/'})
        setAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
            login,
            logout,
        });
        navigate("/login");
    };

    // Runs when reload page, and run only one time
    useEffect(() => {
        setAuthState(prev => ({
            ...prev,
            login,
            logout,
        }));
        // console.log("authState in useEffect ", authState)
    }, []);

    // console.log("authState ", authState) // Run 4 times



    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext)
}


export default AuthProvider;