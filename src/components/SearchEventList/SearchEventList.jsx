// import {eventList} from "../../utils/EventDatabase"
// import EventCard from "../EventCard"

// function SearchEventList({monthYear}) {
//     const {selectedMonth, selectedYear} = monthYear
 
//     const filterEvents = eventList.filter((event)=>{
//         return event.date.month === selectedMonth && event.date.year === selectedYear
//     })
//     return (
//         <div className="event-search">
//             {
//                 filterEvents.length > 0 ? filterEvents.map((event)=>{
//                     return <EventCard  key={event.id}
//                     id={event.id}
//                     heading={event.heading}
//                     date={event.date}
//                     location={event.location}
//                     img={event.img}
//                     description={event.description}/>
//                 }) : <p>No Events!</p>
//             }
//         </div>
//     )
// }

// export default SearchEventList


import { eventList } from "../../utils/EventDatabase";
import EventCard from "../EventCard";

function SearchEventList({ monthYear }) {
    const { selectedMonth, selectedYear } = monthYear;

    const filterEvents = eventList.filter((event) => {
        return event.date.month === selectedMonth && event.date.year === selectedYear;
    });

    return (
        <div className="event-search">
            {filterEvents.length > 0 ? (
                filterEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        id={event.id}
                        heading={event.heading}
                        date={`${event.date.day || 'N/A'} ${event.date.month} ${event.date.year}`} // Format date as needed
                        location={event.location}
                        img={event.img}
                        description={event.description}
                    />
                ))
            ) : (
                <p>No Events!</p>
            )}
        </div>
    );
}

export default SearchEventList;