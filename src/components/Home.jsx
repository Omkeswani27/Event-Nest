import CityMap from "./CityMap"
// import EventCard from "../../components/EventCard";
import { Features } from "./Features";
import Footer from "./Footer";
// import Map from "../../components/Map";
import Navigation from "././Navigation/Navigation";
// import { eventList } from "../../utils/EventDatabase";
import './Home.css'
import 'font-awesome/css/font-awesome.min.css';
import { NavLink } from "react-router-dom";
import Talk from "./Talk";
import Footer1 from "./Footer1";

// import { bg } from "../../../public/Images/intro-bg.jpg";
function EventList() {
  return (
    <>
<Navigation />
    <section className="py-lg-16 py-8" id="hero">
      <div className="container" style={{marginTop: "100px"}}>
                 <div className="row align-items-center">
                   <div className="col-lg-6 mb-6 mb-lg-0">
                     <div className="">
                       <h5 className="text-dark mb-4"><i className="fe fe-check icon-xxs icon-shape bg-light-success text-success rounded-circle me-2"></i>Most
                         trusted event booking platform</h5>
                       <h1 className="display-3 fw-bold mb-3">Creating Events that Spark Joy</h1>
                       <p className="pe-lg-10 mb-5">One platform, endless possibilities. Discover, book, and manage your events effortlessly, ensuring every moment is perfect.</p>
                       <NavLink to="showevents"><a href="#" className="btn btn-primary">Explore Events</a></NavLink>
                     </div>
                   </div>
                   <div className="col-lg-6 d-flex justify-content-center">
                      
                    <div className="position-relative">
                     <img src="../../../public/Images/intro-bg.jpg" alt="" className="img-bg"  />
                    
                </div>
                 </div>
              </div>
          </div>
  
   

</section>
<Features />
<h1 className="mt-5 text-center">Our Events on different cities </h1>
<CityMap />
<Talk />
<Footer />
</>
)
  
}

export default EventList;
