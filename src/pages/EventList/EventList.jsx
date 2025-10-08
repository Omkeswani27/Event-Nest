import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../../components/EventCard'; // Adjust the path as needed
import './EventList.css'; // Assuming you have a CSS file for styling

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/events/');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError('Failed to load events');
            } finally {
                setLoading(false); // Stop loading indicator
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading events...</div>; // Loading state
    }

    if (error) {
        return <div className="error-message">{error}</div>; // Style this in CSS
    }

    return (
        <div className="event-list">
            <h1>All Events</h1>
            {events.length > 0 ? (
                <div className="event-cards">
                    {events.map((event) => (
                        <EventCard 
                            key={event.id}
                            id={event.id}
                            heading={event.title}
                            date={event.date}
                            location={event.location}
                            img={`http://localhost:8000${event.image}`} 
                            description={event.description}
                        />
                    ))}
                </div>
            ) : (
                <p>No Events Available</p>
            )}
        </div>
    );
};

export default EventList;