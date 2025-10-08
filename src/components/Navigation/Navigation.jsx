

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../User_authentication/AuthContext';
import './Navigation.css'; 

const Navigation = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/');  // Redirect to homepage after logout
    };

    return (
        <nav>
            
            <ul>
            
                <li style={{color: "brown"}}>
                    <Link to="/" style={{color: "gold"}}>Home</Link>
                </li>
                <li>
                    <Link to="/find-events" style={{color: "gold"}}>Find Events</Link>
                </li>
                <li>
                            <Link to="/poll" style={{color: "gold"}}>Poll</Link>
                        </li>
                {token ? (
                    <> 
                        <li>
                            <Link to="/addevent" style={{color: "gold"}}>Add Event</Link>
                        </li>
                        <li>
                            <Link to="/your_events" style={{color: "gold"}}>Your Events</Link>
                        </li>
                       
                        <li>
                            <button onClick={handleLogout} className='btn btn-success'>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                    <li>
                        <Link to="/login" style={{color: "gold"}}>Login</Link>
                    </li>
                    <li>
                        <Link to="/signup" style={{color: "gold"}}>Signup</Link>
                    </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;