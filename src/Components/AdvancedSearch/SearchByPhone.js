import React, { useState } from "react";
import './SearchByPhone.css'
import FetchWithAuth from "../../auth/FetchWithAuth";

const accessToken = localStorage.getItem('accessToken');
const URL = process.env.REACT_APP_SERVER_URL;

function SearchByPhone() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [notFound, setNotFound] = useState('');

  if (!accessToken) {
    window.location.href = '/login';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPhoneError('');
    setGeneralError('');

    // Validate phone number format (numeric only)
    const isNumeric = /^[0-9]+$/.test(phoneNumber);

    if (!isNumeric) {
      setPhoneError('Número de teléfono inválido.');
      return;
    }

    try {
      const response = await FetchWithAuth(`${URL}/searchbyphone?searchbyphone=${phoneNumber}`, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      });

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setSearchResults(data);
          setNotFound('');
        } else {
          setNotFound('No hay fechas con ese número telefónico');
          setSearchResults(null); // Reset search results
        }
      } else {
        setGeneralError('Error buscando fechas. Por favor, inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error from catch:', error);
      setGeneralError('Ha ocurrido un error.');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\s+/g, ''); // Remove spaces from input value
    setPhoneNumber(value);
  };

  const handleKeyPress = (e) => {
    if (e.target.name === 'phoneNumber' && e.key === ' ') {
      e.preventDefault(); // Prevent space input
    }
  };

  return (
    <div className="SearchByPhone">
      <h3>Búsqueda por número telefónico de cliente</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Número telefónico:
          <input
            type="number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
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
          <h2>Resultados</h2>
          {/* Render search results in a user-friendly manner */}
          <ol>
            {searchResults.map((result) => (
              <li key={result.date_id}>
                <p>Fecha: {result.date}</p>
                <p>Número de teléfono: {result.phone_number}</p>
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
