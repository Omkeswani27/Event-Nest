import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import Auth context
import './signup.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // Get login function from context

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setLoading(true); // Start loading

        try {
            await axios.post('http://localhost:8000/api/signup/', {
                username,
                email,
                password,
            });
            login(); // Call login after successful signup
            navigate('/login'); // Redirect to login page
        } catch (error) {
            setError(error.response?.data?.error || 'Registration failed.'); // Set error message
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="signup-container" style={{marginLeft: "500px", padding: "20px"}}>
            <h2>Sign Up</h2>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            <form onSubmit={handleSignUp}>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default SignUp;