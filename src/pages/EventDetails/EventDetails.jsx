// import { useParams } from "react-router-dom";
// import { eventList } from "../../utils/EventDatabase";
// import Navigation from "../../components/Navigation/Navigation";
// import { MdCalendarMonth } from "react-icons/md";
// import { IoLocationSharp } from "react-icons/io5";
// import "./EventDetails.css";
// function EventDetails() {
//   const { id } = useParams();
//   const numId = Number(id);

//   const filteredEvent = eventList.find(
//     (eventDetail) => eventDetail.id === numId
//   );

//   return (
//     <div className="event-details-container">
//       <Navigation />
//       <div className="event-details-wrapper">
//         <img src={filteredEvent.img} alt="Event" />
//         <div className="event-details-content">
//           <h3>Event Name : {filteredEvent.heading}</h3>
//           <div className="small-details">
//             <p className="date">
//               <MdCalendarMonth className="icon" />
//               <span className="font-weight-med">
//                 {filteredEvent.date.month}
//               </span>
//               <span className="font-weight-med">{filteredEvent.date.year}</span>
//             </p>
//             <p className="location font-weight-med">
//               <IoLocationSharp className="icon" />
//               {filteredEvent.location}
//             </p>
//           </div>
//           <p className="description">
//             <span className="description-heading">Event Description:</span>
//             <span className="description-heading-para">
//               {filteredEvent.description}
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default EventDetails;




// import { useParams } from "react-router-dom";
// import axios from "axios"; // Make sure to import axios
// import Navigation from "../../components/Navigation/Navigation";
// import { MdCalendarMonth } from "react-icons/md";
// import { IoLocationSharp } from "react-icons/io5";
// import "./EventDetails.css";
// import { useEffect, useState } from "react";

// function EventDetails() {
//   const { id } = useParams();
//   const numId = Number(id);
//   const [eventDetail, setEventDetail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:8000/api/events/${numId}/`) // Update to fetch a specific event
//       .then(response => {
//         // Assuming response.data returns the event object
//         setEventDetail(response.data); 
//         setLoading(false);
//       })
//       .catch(error => {
//         setError('There was an error fetching the event details!');
//         setLoading(false);
//         console.error('Error fetching event details:', error);
//       });
//   }, [numId]);

//   if (loading) {
//     return <div className="text-center mt-4"><p>Loading...</p></div>;
//   }

//   if (error) {
//     return <div className="text-center mt-4"><p>{error}</p></div>;
//   }

//   // Check if eventDetail is null
//   if (!eventDetail) {
//     return <div className="text-center mt-4"><p>No event found!</p></div>;
//   }

//   return (
//     <div className="event-details-container">
//       <Navigation />
//       <div className="event-details-wrapper">
//         <img src={`http://localhost:8000${eventDetail.image}`} alt="Event" />
//         <div className="event-details-content">
//           <h3>Event Name: {eventDetail.title}</h3>
//           <div className="small-details">
//             <p className="date">
//               <MdCalendarMonth className="icon" />
//               <span className="font-weight-med">
//                 {new Date(eventDetail.date).toLocaleString('default', { month: 'long' })} {/* Month */}
//               </span>
//               <span className="font-weight-med">{new Date(eventDetail.date).getFullYear()}</span> {/* Year */}
//             </p>
//             <p className="location font-weight-med">
//               <IoLocationSharp className="icon" />
//               {eventDetail.location}
//             </p>
//           </div>
//           <p className="description">
//             <span className="description-heading">Event Description:</span>
//             <span className="description-heading-para">
//               {eventDetail.description}
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EventDetails;




// import { useParams } from "react-router-dom";
// import axios from "axios"; 
// import Navigation from "../../components/Navigation/Navigation";
// import { MdCalendarMonth } from "react-icons/md";
// import { IoLocationSharp } from "react-icons/io5";
// import "./EventDetails.css";
// import { useEffect, useState } from "react";
// import { useAuth } from "../../components/User_authentication/AuthContext"; // Import useAuth

// function EventDetails() {
//   const { id } = useParams();
//   const numId = Number(id);
//   const [eventDetail, setEventDetail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { token } = useAuth(); // Get the token from AuthContext

//   useEffect(() => {
//     const fetchEventDetail = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/events/${numId}/`, {
//           headers: {
//             Authorization: `Token ${token}`, // Include the token in the header
//           },
//         });
//         setEventDetail(response.data);
//       } catch (error) {
//         setError('There was an error fetching the event details!');
//         console.error('Error fetching event details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEventDetail();
//   }, [numId, token]); // Add token to the dependency array

//   if (loading) {
//     return <div className="text-center mt-4"><p>Loading...</p></div>;
//   }

//   if (error) {
//     return <div className="text-center mt-4"><p>{error}</p></div>;
//   }

//   if (!eventDetail) {
//     return <div className="text-center mt-4"><p>No event found!</p></div>;
//   }

//   return (
//     <div className="event-details-container">
//       <Navigation />
//       <div className="event-details-wrapper">
//         {eventDetail.image && (
//           <img 
//             src={`http://localhost:8000${eventDetail.image}`} 
//             alt="Event" 
//             className="event-image"
//           />
//         )}
//         <div className="event-details-content">
//           <h3>Event Name: {eventDetail.title}</h3>
//           <div className="small-details">
//             <p className="date">
//               <MdCalendarMonth className="icon" />
//               <span className="font-weight-med">
//                 {new Date(eventDetail.date).toLocaleDateString('default', { month: 'long', year: 'numeric', day: 'numeric' })}
//               </span>
//             </p>
//             <p className="location font-weight-med">
//               <IoLocationSharp className="icon" />
//               {eventDetail.location}
//             </p>
//           </div>
//           <p className="description">
//             <span className="description-heading">Event Description:</span>
//             <span className="description-heading-para">{eventDetail.description}</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EventDetails;



import { useParams } from "react-router-dom";
import axios from "axios";
import Navigation from "../../components/Navigation/Navigation";
import { MdCalendarMonth } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import "./EventDetails.css";
import { useEffect, useState } from "react";

function EventDetails() {
    const { id } = useParams();
    const [eventDetail, setEventDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/events/${id}/`)
            .then(response => {
                setEventDetail(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('There was an error fetching the event details!');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!eventDetail) {
        return <div>No event found!</div>;
    }

    return (
        <div className="event-details-container">
            <Navigation />
            <img src={`http://localhost:8000${eventDetail.image}`} alt={eventDetail.title} />
            <h3>{eventDetail.title}</h3>
            <p>{eventDetail.description}</p>
            <p>
                <MdCalendarMonth /> {eventDetail.date} at {eventDetail.time}
            </p>
            <p>
                <IoLocationSharp /> {eventDetail.location}
            </p>
        </div>
    );
}

export default EventDetails;