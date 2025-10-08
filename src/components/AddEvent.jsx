import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/User_authentication/AuthContext';

const AddEvent = () => {
    const { token } = useAuth();
    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        image: null,
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setEvent((prevEvent) => ({
            ...prevEvent,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', event.title);
        formData.append('description', event.description);
        formData.append('date', event.date);
        formData.append('time', event.time);
        formData.append('location', event.location);
        if (event.image) {
            formData.append('image', event.image);
        }

        try {
            await axios.post('http://localhost:8000/api/events/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${token}`,  // Use Token instead of Bearer
                },
            });
            setSuccess('Event created successfully!');
            setEvent({
                title: '',
                description: '',
                date: '',
                time: '',
                location: '',
                image: null,
            });
        } catch (error) {
            console.error('Error adding event:', error);
            setError('There was an error creating the event.');
        }
    };

    return (
        <div className="container mt-4" style={{marginLeft: "300px"}}>
            <h1>Add Event</h1>
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
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add Event</button>
            </form>
        </div>
    );
};

export default AddEvent;