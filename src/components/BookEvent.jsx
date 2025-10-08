// import React, { useState } from 'react';
// import events from '../eventData'; // Ensure this is correctly importing your event data
// import './BookEvent.css';

// function Bookevent() {
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [showTicketPopup, setShowTicketPopup] = useState(false);
//   const [formData, setFormData] = useState({ name: '', email: '', tickets: 1 });
//   const [bookingConfirmed, setBookingConfirmed] = useState(false);

//   const handleBookNow = (event) => {
//     setSelectedEvent(event);
//     setShowTicketPopup(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Simulate booking processing here
//     alert('Booking successful!');

//     // Here you might want to update the available tickets for the event
//     // This is commented out, as it would require managing event state differently.
//     // events = events.map(evt => evt.id === selectedEvent.id ? { ...evt, availableTickets: evt.availableTickets - formData.tickets } : evt);

//     setBookingConfirmed(true);
//     setShowTicketPopup(false); // Close the popup after booking
//   };

//   const handleClosePopup = () => {
//     setShowTicketPopup(false);
//     setBookingConfirmed(false); // Reset booking confirmation state
//     setFormData({ name: '', email: '', tickets: 1 }); // Reset form data
//   };

//   return (
//     <div className="EventBook" style={{ marginLeft: "300px" }}>
//       <h1>Event Booking System</h1>
//       <ul>
//         {events.map((event) => (
//           <li key={event.id}>
//             <h3>{event.title}</h3>
//             <p>{event.description}</p>
//             <p>Date: {event.date}</p>
//             <p>Venue: {event.venue}</p>
//             <p>Available Tickets: {event.availableTickets}</p>
//             <button className='btn btn-success' onClick={() => handleBookNow(event)}>Book Now</button>
//           </li>
//         ))}
//       </ul>

//       {showTicketPopup && !bookingConfirmed && (
//         <div className="popup">
//           <div className="popup-content">
//             <h2>Book Tickets for {selectedEvent.title}</h2>
//             <form onSubmit={handleSubmit}>
//               <label>
//                 Name:
//                 <input className='ticket-input'
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </label>
//               <br />
//               <label>
//                 Email:
//                 <input className='ticket-input'
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </label>
//               <br />
//               <label>
//                 Number of Tickets:
//                 <input className='ticket-input'
//                   type="number"
//                   name="tickets"
//                   value={formData.tickets}
//                   onChange={handleInputChange}
//                   min="1"
//                   max={selectedEvent.availableTickets}
//                   required
//                 />
//               </label>
//               <br />
//               <button type="submit" className='btn btn-primary'>Confirm Booking</button>
//             </form>
//             <button onClick={handleClosePopup}>Close</button>
//           </div>
//         </div>
//       )}

//       {bookingConfirmed && (
//         <div className="popup">
//           <div className="popup-content">
//             <h2>Ticket for {selectedEvent.title}</h2>
//             <p>Date: {selectedEvent.date}</p>
//             <p>Venue: {selectedEvent.venue}</p>
//             <p>Booked by: {formData.name}</p>
//             <p>Email: {formData.email}</p>
//             <p>Tickets: {formData.tickets}</p>
//             <button onClick={handleClosePopup}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Bookevent;
import React, { useState } from 'react';

const BookingForm = ({ stall, onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', tickets: 1 });
    const [error, setError] = useState(null);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset any previous errors

        try {
            const response = await fetch('http://localhost:8000/api/bookstall/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    tickets: formData.tickets,
                    stall: stall.id, // Include the selected stall ID
                    price: stall.rent_price // Use the fixed price from the stall
                }),
            });

            // Check if the response is not ok (status code 200-299)
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData); // Log error for debugging
                setError(errorData);
                return;
            }

            alert('Booking successful!');
            onClose(); // Close the form after successful booking
        } catch (error) {
            console.error('Fetch error:', error); // Log fetch error
            setError('An error occurred while booking.');
        }
    };

    return (
        <div className="booking-form">
            <h2>Book Stall: {stall.name}</h2>
            <p>Price: ₹{stall.rent_price} per day</p> {/* Display fixed price */}
            {error && <p className="error">{error.price ? error.price[0] : error}</p>} {/* Display error message */}
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
                    Number of Tickets:
                    <input
                        type="number"
                        name="tickets"
                        value={formData.tickets}
                        onChange={handleInputChange}
                        min="1"
                        required
                    />
                </label>
                <br />
                <button type="submit" className="btn btn-primary">Confirm Booking</button>
            </form>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default BookingForm;