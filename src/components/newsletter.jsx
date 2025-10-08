import React, { useState } from 'react';
import axios from 'axios';
import './Newsletter.css'; // Optional: Add your own CSS for styling

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/newsletter/', { email });
            setMessage(response.data.message);
            setEmail(''); // Clear the input field
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage('⚠️ This email is already subscribed. Please use a different email. 🙁');
            } else {
                setMessage('⚠️ Error subscribing. Please try again later. 🙁');
            }
        }
    };

    return (
        <div className="newsletter-container">
            <h2>Subscribe to our Newsletter</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit">Subscribe</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Newsletter;