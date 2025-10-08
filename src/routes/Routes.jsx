// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import EventDetails from '../pages/EventDetails/EventDetails';
// import EventList from '../pages/EventList/EventList';
// import FilterEvents from '../pages/FilterEvents/FilterEvents';
// import Stalls from '../components/Stalls_1';
// import AddEvent from '../components/AddEvent';
// import Login from '../components/User_authentication/login'
// import SignUp  from '../components/User_authentication/signup';
// import UserEvents from '../components/User_authentication/UserEvents';
// import EditEvent from '../components/EditEvent';
// import Navigation from '../components/Navigation/Navigation';
// import '../components/Navigation/Navigation.css'

// function RoutesProvider() {
//     return (
//         <BrowserRouter>
        
//             <Routes>
//                 <Route path='/' element={<EventList />} />
//                 <Route path='/find-events' element={<FilterEvents />} />
//                 <Route path='/events/:id' element={<EventDetails />} />
//                 <Route path='/stall' element={<Stalls />} />
//                 <Route path='/addevent' element={<AddEvent />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<SignUp />} />
//                 <Route path='/your_events' element={<UserEvents />} />
//                 <Route path='/edit-event/:id' element={<EditEvent />} />
//             </Routes>
        
//         </BrowserRouter>
//     );
// }

// // export default RoutesProvider;
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import EventDetails from '../pages/EventDetails/EventDetails';
// import EventList from '../pages/EventList/EventList';
// import FilterEvents from '../pages/FilterEvents/FilterEvents';
// import Stalls from '../components/Stalls_1';
// import AddEvent from '../components/AddEvent';
// import Login from '../components/User_authentication/login';
// import SignUp from '../components/User_authentication/signup';
// import UserEvents from '../components/User_authentication/UserEvents';
// import EditEvent from '../components/EditEvent';
// import Navigation from '../components/Navigation/Navigation';
// // import { AuthProvider } from '../components/User_authentication/AuthContext';
// import '../components/Navigation/Navigation.css';
// // import UserProfile from '../components/user_profile';


// function RoutesProvider() {
//     return (
//         <BrowserRouter>
//             <Navigation />
//             <Routes>
//                 <Route path='/' element={<EventList />} />
//                 <Route path='/find-events' element={<FilterEvents />} />
//                 <Route path='/events/:id' element={<EventDetails />} />
//                 <Route path='/stall' element={<Stalls />} />
//                 <Route path='/addevent' element={<AddEvent />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<SignUp />} />
//                 <Route path='/your_events' element={<UserEvents />} />
//                 <Route path='/edit-event/:id' element={<EditEvent />} />
//                 {/* <Route path="/profile" element={<UserProfile />} />  */}
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default RoutesProvider;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventDetails from '../pages/EventDetails/EventDetails';
import EventList from '../pages/EventList/EventList';
import FilterEvents from '../pages/FilterEvents/FilterEvents';
import Stalls from '../components/Stalls_1';
import AddEvent from '../components/AddEvent';
import Login from '../components/User_authentication/login';
import SignUp from '../components/User_authentication/signup';
import UserEvents from '../components/User_authentication/UserEvents';
import EditEvent from '../components/EditEvent';
import Navigation from '../components/Navigation/Navigation';
import { AuthProvider } from '../components/User_authentication/AuthContext';
import '../components/Navigation/Navigation.css';
import Home from "../components/Home"
import ShowEvents from '../pages/EventList/ShowEvents';
import DisplayEvents from '../pages/EventDetails/DisplayEvents';
import Chatbot from '../components/Chatbot';
import Bookevent from '../components/BookEvent';
import Poll from '../components/Poll';

function RoutesProvider() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navigation />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/showevents' element={<ShowEvents />}></Route>
                    <Route path="/showevents/:id" element={<DisplayEvents />}></Route>
                    <Route path='/find-events' element={<FilterEvents />} />
                    <Route path='/events/:id' element={<EventDetails />} />
                    <Route path='/stall' element={<Stalls />} />
                    <Route path='/addevent' element={<AddEvent />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/your_events' element={<UserEvents />} />
                    <Route path='/eventbook' element={<Bookevent />}></Route>
                    <Route path='/poll' element={<Poll />}></Route>
                    <Route path='/edit-event/:id' element={<EditEvent />} />
                    <Route path='chatbot' element={<Chatbot />}></Route>
                    {/* Uncomment if needed */}
                    {/* <Route path="/profile" element={<UserProfile />} /> */}
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default RoutesProvider;