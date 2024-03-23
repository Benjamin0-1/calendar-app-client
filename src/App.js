// App.js
import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/NavBar';
import BookDate from './Components/BookDate';
import DeleteBooking from './Components/DeleteBooking';
import ShowAllBookings from './Components/ShowAllBookings';
import ParentSearch from './Components/AdvancedSearch/ParentSearch';
import DeleteByName from './Components/DeleteByName';
import DeleteByPhone from './Components/DeleteByPhone';
import DeleteByRange from './Components/DeleteByDateRange';
import UpdateBooking from './Components/UpdateBooking';

// Login Imports:
import Login from './Components/Login';

export const LoginContext = createContext();

function App() {
  const [access, setAccess] = useState(false); // MUST BE: FALSE

  const loginContextValue = {
    access,
    setAccess,
  };
  
  // LOGIN is not being rendered below.
  return (
    <LoginContext.Provider value={loginContextValue}>
      <Router>
        {access ? (
          <div className="App">
            <Navbar />

            <Routes>
              <Route path="/book" element={<BookDate />} />
              <Route path="/delete" element={<DeleteBooking />} />
              <Route path="/showbookings" element={<ShowAllBookings />} />
              <Route path="/parentsearch" element={<ParentSearch />} />
              <Route path='/deletebyname' element={< DeleteByName/>} />
              <Route path='/deletebyphone' element={< DeleteByPhone/>} />
              <Route path='/deletebyrange' element={< DeleteByRange />} />
              <Route path='/updatebooking' element={< UpdateBooking />} />
             
            </Routes>

            <header className="App-header">
              {/* Your header content goes here */}
              <h1></h1>
            </header>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Router>
    </LoginContext.Provider>
  );
}

export default App;


/*

After testing everything and being very sure everything works correclty and no matter what,
the app never breaks.
Then it's time to implement the Login in both the front-end and back-end. 
After the Login is done, it's time to implement the styles and then the app will be finally Finished.

*/
