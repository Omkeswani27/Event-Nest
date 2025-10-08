import React, { useState } from 'react';
import axios from 'axios';

function BookingForm({ stall, onClose }) {
    const [formData, setFormData] = useState({ name: '', email: '', address: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post('http://localhost:8000/api/bookstall/', {
                name: formData.name,
                email: formData.email,
                address: formData.address, // New field
                stall: stall.id, // ID of the selected stall
                price: stall.rent_price // Use the fixed price
            });

            if (response.status === 201) {
                setSuccess(true); // Booking was successful
                onClose(); // Close the booking form
            }
        } catch (err) {
            setError('There was an error booking the stall.');
            console.error('Error booking stall:', err);
        }
    };

    return (
        <div className="booking-form">
            <h2>Booking for {stall.name}</h2>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">Booking successful!</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Address:  {/* New Address Field */}
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <button type="submit" className="btn btn-primary">Confirm Booking</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

export default BookingForm;