
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Stalls.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

// function Stalls() {
//     const [stalls, setStalls] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios.get('http://localhost:8000/api/stalls/') // Django API endpoint
//             .then(response => {
//                 console.log(response.data); // Log response for debugging
//                 setStalls(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 setError('There was an error fetching the stalls!');
//                 setLoading(false);
//                 console.error('Error fetching stalls:', error);
//             });
//     }, []);

//     if (loading) {
//         return <div className="text-center mt-4"><p>Loading...</p></div>;
//     }

//     if (error) {
//         return <div className="text-center mt-4"><p>{error}</p></div>;
//     }

//     return (
//         <div className="container mt-4">
//             <h1 style={{fontSize: "40px",marginTop:"100px"}} className='text-center'>
//                 Available Stalls for Upcoming Events
//             </h1>
//             <p style={{fontSize: "15px"}} className='text-center'>
//                 Book your stall for upcoming events!
//             </p>
//             {stalls.length === 0 ? (
//                 <div className="text-center mt-4">
//                     <p>No stalls available at the moment.</p>
//                 </div>
//             ) : (
//                 stalls.map(stall => (
//                     <div className="stall-info mt-4" key={stall.id} >
//                         <div className="row">
//                             <div className="col col-md-6">
//                                 <img
//                                     src={`${stall.image}`} // Correctly formatted URL
//                                     className='stall-1'
//                                     alt={stall.name}
//                                 />
//                             </div>
//                             <div className="col col-md-6">
//                                 <h1>{stall.name}</h1>
//                                 <p>{stall.description}</p>
//                                 <p>Rent Price: ₹{stall.rent_price} per day</p>
//                                 <button type="button" className="btn btn-success">
//                                     Book Now
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default Stalls;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Stalls.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import BookingForm from '../components/book_stall'; // Import BookingForm component

function Stalls() {
    const [stalls, setStalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStall, setSelectedStall] = useState(null); // Track selected stall for booking

    useEffect(() => {
        axios.get('http://localhost:8000/api/stalls/') // Django API endpoint
            .then(response => {
                console.log(response.data); // Log response for debugging
                setStalls(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('There was an error fetching the stalls!');
                setLoading(false);
                console.error('Error fetching stalls:', error);
            });
    }, []);

    if (loading) {
        return <div className="text-center mt-4"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="text-center mt-4"><p>{error}</p></div>;
    }

    return (
        <div className="container mt-4">
            <h1 style={{ fontSize: "40px", marginTop: "100px" }} className='text-center'>
                Available Stalls for Upcoming Events
            </h1>
            <p style={{ fontSize: "15px" }} className='text-center'>
                Book your stall for upcoming events!
            </p>
            {stalls.length === 0 ? (
                <div className="text-center mt-4">
                    <p>No stalls available at the moment.</p>
                </div>
            ) : (
                stalls.map(stall => (
                    <div className="stall-info mt-4" key={stall.id}>
                        <div className="row">
                            <div className="col col-md-6">
                                <img
                                    src={`${stall.image}`} // Correctly formatted URL
                                    className='stall-1'
                                    alt={stall.name}
                                />
                            </div>
                            <div className="col col-md-6">
                                <h1>{stall.name}</h1>
                                <p>{stall.description}</p>
                                <p>Rent Price: ₹{stall.rent_price} per day</p>
                                <button 
                                    type="button" 
                                    className="btn btn-success" 
                                    onClick={() => setSelectedStall(stall)} // Set selected stall for booking
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {selectedStall && ( // Show booking form if a stall is selected
                <BookingForm stall={selectedStall} onClose={() => setSelectedStall(null)} />
            )}
        </div>
    );
}

export default Stalls;