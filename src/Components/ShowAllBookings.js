import React from "react";
import { useState, useEffect } from "react";
import './ShowAllBookings.css'

//Login Imports:
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

function ShowAllBookings() {
    const [dates, setDates] = useState([]);
    const [error, setError] = useState('');
    const[bookingsPerOwner, setBookingsPerOwner] = useState({});
    const [errorCount, setErrorCount] = useState('');

    const checkAuthentication = async () => { // this function was added for debugging and also called in useEffect below.
      try {
          const response = await fetch('https://calendar-app-server3-2499724774e3.herokuapp.com/login', {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username: "Compadres", password: "Compadres2024" }),
          });
  
          // Handle the response here if needed
          const data = await response.json();
          console.log(data);
  
      } catch (error) {
          console.log('ERROR FROM CATCH: ', error);
      }
  };
  

    const getBookings = async () => {
        try {
            const response = await fetch('https://calendar-app-server3-2499724774e3.herokuapp.com/book')
            if (response.ok) {
                const data = await response.json();
                if (data.noDates) {
                    setError('No hay fechas disponibles');
                } else {
                    setDates(data);
                }
            }
        } catch (error) {
            setError('Error mostrando fechas');
        }
    };

    const getBookingsPerOwner = async () => {
        try {
            const response = await fetch('https://calendar-app-server3-2499724774e3.herokuapp.com/getbookingcount');
            if (response.status === 200) {
                const data = await response.json();
                setBookingsPerOwner(data)
            }
        } catch (error) {
            console.log('Error : ', error);
            setErrorCount('Error mostrando resultados')
        }
    };


    useEffect(() => {
        getBookings();
        getBookingsPerOwner(); // might add dependancy array to update it if other user is booking dates
        checkAuthentication();
    }, []); 
    // this component must also showed who booked the date, person who booked, phone number and email.


   /* const {access} = useAuth(); // Login.
    console.log(access);
    if (!access) {
      return <Navigate to='/login' />;
    }; */


    return (
        <div className="ShowAllBookings">
          <br/>
          <p>Total de fechas apartadas: {dates.length}</p> 
    
          <div>
            {Object.entries(bookingsPerOwner).map(([owner, count]) => (
              <div key={owner}>{`${owner}: Ha apartado: ${count} Fechas`}</div>
            ))}
          </div>
    
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <h2>Fechas apartadas:</h2>
          <ol>
            {dates.map((date) => (
              <li key={date.date_id}>
                <div>{new Date(date.date).toISOString().split('T')[0]}</div>
                <div>Nombre de cliente: <span style={{color: 'blue'}}>  {date.person_who_booked || 'No existe nombre de cliente'} </span> </div>
                
                <div>Rentada a cliente por Dueño: <span style={{ color: 'green' }}>{date.owner}</span></div>
                <br/>
                <div>Numero telefonico de cliente: {date.phone_number || 'No hay numero disponible'}</div>
                <br/>
                <div>Correo cliente: {date.email || 'No hay correo disponible'}</div>
                <div>Mensaje personalizado: {date.custom_message || 'No hay mensaje personalizado'}</div>
              </li>
            ))}
          </ol>
        </div>
      );
}

export default ShowAllBookings;
