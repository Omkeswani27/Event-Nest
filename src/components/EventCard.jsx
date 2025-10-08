// import { Link } from "react-router-dom";
// import "./EventCard.css";
// const EventCard = ({ id, heading, date, location, img }) => {
//   const { year, month } = date;
//   return (
//      <Link to ={`/events/${id}`}>
//       <div className="card">
//         <div className="card-content">
//           <h3>{heading}</h3>
//           <p>
//             <span>Year: {year}</span>
//             <span>Month: {month}</span>
//           </p>
//           <p>{location}</p>
//         </div>

//         <div className="card-img-wrapper">
//           <img src={img} alt="image not found" />
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default EventCard;
import { Link } from "react-router-dom";
import "./EventCard.css";

const EventCard = ({ id, heading, date, location, img }) => {
  const eventDate = new Date(date); 
  console.log(date)
  console.log(eventDate)
  const {year,month} = date
  // Convert the date string to a Date object
  // const year = eventDate.getFullYear(); 
console.log(year)
  // const month = eventDate.toLocaleString('default', { month: 'long' }); // Extract month name
  const day = eventDate.getDate(); // Extract day

  return (
    <Link to={`/showevents/${id}`}>
      <div className="card" style={{marginLeft: "300px", background: "white"}}>
        <div className="card-content">
          <h3>{heading}</h3>
          <p>
            <span>Year: {year}</span>
            <span>Month: {month}</span>
            <span>Day: {day}</span> {/* Display the day */}
          </p>
          <p>{location}</p>
        </div>

        <div className="card-img-wrapper">
          <img src={img} alt="image not found" className="mt-5"/>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;