import React, { useState } from "react";
import './BookDate.css';

function BookDate() {
  const [successBooking, setSuccessBooking] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [ownerError, setOwnerError] = useState('');
  const [personError, setPersonError] = useState('');
  const [dateError, setDateError] = useState('');
  const [nameError, setNameError] = useState('');
  const [currentDateError, setCurrentDateError] = useState('');

  const [booking, setBooking] = useState({
    phone_number: '',
    email: '',
    custom_message: '',
    owner: '',
    person_who_booked: '',
    date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!booking.person_who_booked || booking.person_who_booked.length < 3) {
      setNameError('Debe introducir un nombre válido y de al menos 3 caracteres');
      return; 
    };
    // reset the previus error after it moves along through the form fields
    if (booking.phone_number.length < 7) {
      setPhoneError('Número telefónico demasiado corto');
      setNameError('');
      return;
    };

    if (!booking.owner) {
      setOwnerError('Debe seleccionar un dueño');
      setPhoneError('');
      return;
    };

    if (!booking.date) {
      setDateError('Debe seleccionar una fecha');
      setOwnerError('');
      return;
    };

    const selectedDate = new Date(booking.date);
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      setCurrentDateError('No puede reservar una fecha que ya pasó');
      setOwnerError('');
      setPersonError('');
      setErrorMessage('');
      setNameError('');
      return;
    };

    try {
      const response = await fetch('https://calendar-app-server3-2499724774e3.herokuapp.com/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      if (response.status === 201) {
        const data = await response.json();
        setSuccessBooking(true);
        setSuccessMessage(`Fecha: ${data.date} apartada con éxito`);
        setPhoneError('');
        setOwnerError('');
        setPersonError('');
        setDateError('');
        setCurrentDateError('');
        setNameError('');
      } else {
        const data = await response.json();
        setErrorMessage(data.isDateBooked ? 'La fecha ya está reservada ' : 'Error apartando fecha');
        setSuccessMessage('');
      }
    } catch (error) {
      console.log('Internal server error', error);
      setErrorMessage('Error apartando fecha');
      setSuccessMessage('');
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value
    }));
  };

  //to not allow uppercase values in the person_who_booked/cliente field.
const handleKeyPress = (e) => {
  if (e.target.name === 'person_who_booked' && e.key.toUpperCase() === e.key) {
    e.preventDefault();
    const newValue = e.target.value + e.key.toLowerCase();
    setBooking(prevBooking => ({
      ...prevBooking,
      person_who_booked: newValue
    }));
  }
};


  return (
    <div className="BookDate">
      <h3>Aparta una fecha</h3>

      <label>
        Persona que apartó:
        <input
          type="text"
          name="person_who_booked"
          value={booking.person_who_booked}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </label>
      {nameError && <div style={{color: 'red'}}> {nameError} </div>}

      <form onSubmit={handleSubmit}>
        <label>
          Numero telefónico:
          <input
            type="text"
            name="phone_number"
            value={booking.phone_number}
            onChange={handleChange}
          />
        </label>
        {phoneError && <div style={{color: 'red'}}> {phoneError} </div>}

        <label>
          Correo Electrónico (opcional):
          <input
            type="email"
            name="email"
            value={booking.email}
            onChange={handleChange}
          />
        </label>
        

        <label>
          Mensaje Personalizado (opcional):
          <textarea
            name="custom_message"
            value={booking.custom_message}
            onChange={handleChange}
          />
        </label>
        
        
        <label>
          Seleccionar Dueño:
          <select
            name="owner"
            value={booking.owner}
            onChange={handleChange}
          >
            <option value=''>Selecciona:</option>
            <option value='ricardo'>Ricardo</option>
            <option value='jose'>Jose</option>
          </select>
        </label>
       
        {ownerError && <div style={{color: 'red'}}> {ownerError} </div>}

        <label>
          Fecha:
          <input
            type="date"
            name="date"
            value={booking.date}
            onChange={handleChange}
          />
        </label>
       
        {dateError && <div style={{color: 'red'}}> {dateError} </div>}
        

        <button type="submit">Apartar Fecha</button>
        {currentDateError && <div style={{ color: 'red' }}>{currentDateError}</div>}
        {successMessage && <div style={{color: 'green'}}> {successMessage} </div>} 
        {errorMessage && <div style={{color: 'red'}}> {errorMessage} </div>}
      </form>
    </div>
  );
};

export default BookDate;
