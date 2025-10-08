
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(localStorage.getItem('token') || null);

//     useEffect(() => {
//         if (token) {
//             localStorage.setItem('token', token);
//         } else {
//             localStorage.removeItem('token');
//         }
//     }, [token]);

//     const login = async (username, password) => {
//         try {
//             const response = await axios.post('http://localhost:8000/api/login/', {
//                 username,
//                 password,
//             });
//             setToken(response.data.token);  // Save the token
//         } catch (error) {
//             console.error('Login failed', error);
//             throw new Error('Invalid credentials');
//         }
//     };

//     const logout = () => {
//         setToken(null);
//     };

//     return (
//         <AuthContext.Provider value={{ token, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(() => localStorage.getItem('token') || null);
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         if (token) {
//             localStorage.setItem('token', token);
//             // Optionally fetch user info after login
//             fetchUserData(token);
//         } else {
//             localStorage.removeItem('token');
//             setUser(null); // Clear user state on logout
//         }
//     }, [token]);

//     const fetchUserData = async (token) => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/user/events', {
//                 headers: {
//                     Authorization: `Token ${token}`,
//                 },
//             });
//             setUser(response.data); // Set user data
//         } catch (error) {
//             console.error('Failed to fetch user data', error);
//         }
//     };

//     const login = async (username, password) => {
//         try {
//             const response = await axios.post('http://localhost:8000/api/login/', {
//                 username,
//                 password,
//             });
//             setToken(response.data.token);  // Save the token
//         } catch (error) {
//             console.error('Login failed', error);
//             throw new Error('Invalid credentials');
//         }
//     };

//     const logout = () => {
//         setToken(null);
//         setUser(null); // Clear user state
//     };

//     return (
//         <AuthContext.Provider value={{ token, user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null); // Add error state for better error handling

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            fetchUserData(token); // Fetch user data after setting the token
        } else {
            localStorage.removeItem('token');
            setUser(null);
        }
    }, [token]);

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get('http://localhost:8000/api/user/events/', { // Adjusted endpoint to fetch user info
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setUser(response.data); // Set user data
        } catch (error) {
            console.error('Failed to fetch user data', error);
            setError('Failed to fetch user data'); // Set error message
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password,
            });
            setToken(response.data.token); // Save the token
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Login failed', error);
            setError('Invalid credentials'); // Set error message
            throw new Error('Invalid credentials');
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setError(null); // Clear error on logout
    };

    return (
        <AuthContext.Provider value={{ token, user, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};