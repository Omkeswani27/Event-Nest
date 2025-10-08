

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/User_authentication/AuthContext';

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        image: null, // Ensure this will hold the file
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!token) {
                setError('Authentication required. Please log in.');
                navigate('/login');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8000/api/events/${id}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event:', error);
                setError('Failed to fetch event details.');
            }
        };

        fetchEvent();
    }, [id, token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', event.title);
        formData.append('description', event.description);
        formData.append('date', event.date);
        formData.append('time', event.time);
        formData.append('location', event.location);

        // Add the image file to formData only if it exists
        if (event.image instanceof File) {
            formData.append('image', event.image); 
        } else {
            console.log('Image is not a file');
        }

        console.log('Form Data:', Array.from(formData)); // Log form data for debugging

        try {
            const response = await axios.put(`http://localhost:8000/api/events/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${token}`,
                },
            });
            console.log('PUT response:', response);
            setSuccess('Event updated successfully!');
            setError(null);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.image) {
                setError(error.response.data.image[0]); // Display backend validation error for the image
            } else {
                setError('There was an error updating the event.');
            }
            console.error('Error updating event:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: files ? files[0] : value, // Handle file input separately
        }));
    };

    return (
        <div className="container mt-5" style={{marginLeft: "300px"}}>
            <h1>Edit Event</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={event.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={event.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input
                        type="time"
                        className="form-control"
                        id="time"
                        name="time"
                        value={event.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={event.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Update Event</button>
            </form>
        </div>
    );
};

export default EditEvent;