import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';


const LOGIN_POST = 'http://localhost:8080/auth/login'

// Initial state with authentication check
const getToken = () => localStorage.getItem("token");
const getUser = () => {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
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
            const response = await fetch(LOGIN_POST, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            });
            const data = await response.json();
            if (response.ok) {
                setAuthState(prev => ({
                    ...prev,
                    isAuthenticated: true,
                    user: data.user,
                    token: data.token
                }));
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);  // Save token in localStorage
               
                navigate("/");
                return null;
            } else {
                return "Invalid username or password";
            }
        } catch (err) {
            console.error("Login Error: ", err);
        }
    };

    // Define logout function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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