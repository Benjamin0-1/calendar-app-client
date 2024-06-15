import React, { useState, createContext, useEffect } from 'react';
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
import DeletedDate from './Components/DeletedDate';

// user pages
import FAQ from './UserPages/FAQ';
import AboutUsPage from './UserPages/AboutUs';
import Landing from './UserPages/Landing';
import NewsLetter from './UserPages/NewsLetter';

// Login Imports:
import Login from './Components/Login';

const accessToken = localStorage.getItem('accessToken');

const URL = process.env.REACT_APP_SERVER_URL;


function App() {
  const [access, setAccess] = useState(false); // MUST BE: FALSE
  
  // REMOVE !
 
  
  // LOGIN is not being rendered below.
  // these need to be normal routes not ProtedRoute.
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<BookDate />} access={access} />
          <Route path="/delete" element={<DeleteBooking />} access={access} />
          <Route path="/showbookings" element={<ShowAllBookings />} access={access} />
          <Route path="/parentsearch" element={<ParentSearch />} access={access} />
          <Route path="/deletebyname" element={<DeleteByName />} access={access} />
          <Route path="/deletebyphone" element={<DeleteByPhone />} access={access} />
          <Route path="/deletebyrange" element={<DeleteByRange />} access={access} />
          <Route path="/updatebooking" element={<UpdateBooking />} access={access} />
          <Route path="*" element={<Navigate to={access ? "/book" : "/login"} />} />
          <Route path='/deleteddate' element={< DeletedDate />} />
          <Route path='/admin' element={< Login />} />

          <Route path='/faq' element={< FAQ />} />
          <Route path='/aboutus' element={< AboutUsPage />} />
          <Route path='/landing'  element={< Landing/>}/>
          <Route path='/newsletter' element={< NewsLetter />} />
        </Routes>
        <header className="App-header">
          <h1></h1>
        </header>
      </div>
    </Router>
  );
}

export default App;


/*

After testing everything and being very sure everything works correclty and no matter what,
the app never breaks.
Then it's time to implement the Login in both the front-end and back-end. 
After the Login is done, it's time to implement the styles and then the app will be finally Finished.

*/
