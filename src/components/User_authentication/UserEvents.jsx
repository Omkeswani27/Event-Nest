import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../User_authentication/AuthContext';
import { useNavigate } from 'react-router-dom';

const YourEvents = () => {
    const { token } = useAuth();
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8000/api/user/events/', {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    });
                    setEvents(response.data);
                } catch (error) {
                    console.error('Error fetching events:', error);
                    setError('Failed to load events');
                }
            }
        };

        fetchEvents();
    }, [token]);

    const handleEdit = (id) => {
        navigate(`/edit-event/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this event?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/api/events/${id}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setEvents(events.filter(event => event.id !== id));
            } catch (error) {
                console.error('Error deleting event:', error);
                setError('Failed to delete event');
            }
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='' style={{marginTop: "100px",marginLeft: "455px"}}>
            <h1>Your Events</h1>
            {events.length > 0 ? (
                <ul>
                    {events.map(event => (
                        <li key={event.id}>
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                            {event.image && (
                                <img 
                                    src={`http://localhost:8000${event.image}`} 
                                    alt={event.title} 
                                    style={{ width: '200px', height: 'auto' }} 
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/default-image.jpg'; }}
                                />
                            )}
                            <p><strong>Date:</strong> {event.date}</p>
                            <p><strong>Time:</strong> {event.time}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <button className='btn btn-success' style={{margin: "8px"}} onClick={() => handleEdit(event.id)}>Edit</button>
                            <button className='btn btn-success' onClick={() => handleDelete(event.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events available.</p>
            )}
        </div>
    );
};

export default YourEvents;