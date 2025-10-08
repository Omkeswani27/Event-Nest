
// import './App.css'
// import RoutesProvider from './routes/Routes'
// import Stalls from './components/Stalls_1'
// import AddEvent from './components/AddEvent'
// import { AuthProvider } from './components/User_authentication/AuthContext'
// // import Navigation from './components/Navigation/Navigation'
// function App() {

//   return (
//     <>
//      <AuthProvider>
        
//          <RoutesProvider />
//      </AuthProvider>
//     </>
//   )
  
// }

// export default App

import './App.css';
import RoutesProvider from './routes/Routes';
import { AuthProvider } from './components/User_authentication/AuthContext';

function App() {
    return (
        <AuthProvider>
            <RoutesProvider />
        </AuthProvider>
    );
}

export default App;