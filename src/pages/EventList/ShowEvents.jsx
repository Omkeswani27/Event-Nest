import EventCard from "../../components/EventCard";
import { eventList } from "../../utils/EventDatabase"
import './ShowEvents.css'

function ShowEvents(){
   return(


<div className="event-list-wrapper">
    <div className="event-list">
      {eventList.map((event) => {
        return (
          <EventCard
            key={event.id}
            id={event.id}
            heading={event.heading}
            date={event.date}
            location={event.location}
            img={event.img}
            description={event.description}
          />
        );
      })}
      </div>
</div>
  
      )
}

export default ShowEvents
