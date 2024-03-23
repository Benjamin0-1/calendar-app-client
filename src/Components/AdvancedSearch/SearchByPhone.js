import React from "react";
import { useState } from "react";
import './SearchByPhone.css'

function SearchByPhone() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const [notFound, setNotFound] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPhoneError('');
    setGeneralError('');

    const isNumeric = /^[0-9]+$/.test(phoneNumber);

    if (!isNumeric) {
      setPhoneError('Numero de telefono invalido.');
      return;
    }

    try {
      const response = await fetch(`https://calendar-app-server3-2499724774e3.herokuapp.com/searchbyphone?searchbyphone=${phoneNumber}`);

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setSearchResults(data);
          setNotFound('');
        } else {
          setNotFound('No hay fechas con ese numero telefonico');
          setSearchResults(null); // Reset search results
        }
      } else {
        setGeneralError('Error buscando fechas. Por favor, inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error from catch:', error);
      setGeneralError('Ha ocurrido un Error.');
    }
  };

  return (
    <div className="SearchByPhone">
      <h3>Busqueda por numero telefonico de cliente</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Numero telefonico:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>

        {phoneError && (
          <div style={{ color: 'red' }}>{phoneError}</div>
        )}

        <button type="submit">Buscar</button>
      </form>

      {generalError && (
        <div style={{ color: 'red' }}>
          <p>{generalError}</p>
        </div>
      )}

      {/* Display search results if available */}
      {searchResults && (
        <div>
          <h2>Resultados </h2>
          {/* Render search results in a user-friendly manner */}
          <ol>
            {searchResults.map((result) => (
              <li key={result.date_id}>
                <p>Fecha: {result.date}</p>
                <p>Numero de telefono: {result.phone_number}</p>
                <p>Nombre de cliente: {result.person_who_booked || 'No hay nombre disponible'}</p>
                <p>Mensaje personalizado: {result.custom_message || 'No hay mensaje personalizado'}</p>
                <p>Dueño: {result.owner}</p>
                <p>Correo de cliente: {result.email || 'No hay correo disponible'}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Display not found message if no data is found */}
      {notFound && (
        <div style={{ color: 'red' }}>{notFound}</div>
      )}
    </div>
  );
}

export default SearchByPhone;