import React, { useState } from "react";
import './SearchByDateRange.css';
import FetchWithAuth from "../../auth/FetchWithAuth";

const accessToken = localStorage.getItem('accessToken');

const URL = process.env.REACT_APP_SERVER_URL;

function SearchByDateRange() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [notFound, setNotFound] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [generalError, setGeneralError] = useState('');

  const [error, setError] = useState('');

  if (!accessToken) {
    window.location.href = '/login'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidDate = (dateString) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(dateString);
    };

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      setDateError('Formato de fecha no válido. Use el formato YYYY-MM-DD.');
      return;
    }

    try {
      const response = await fetch(`${URL}/searchbydaterange?start=${startDate}&end=${endDate}`, {
        credentials: 'include'
      });
      const data = await response.json();

      if (response.ok) {
        if (data.length > 0) {
          setSearchResults(data);
          setDateError('');
          setNotFound('');

        } else {

          setError('No se encontraron fechas en ese rango.');
          setSearchResults(null);
          setDateError('');
        }
      } 
      
      
      else {
        setDateError('No se encontraron fechas con ese rango');

        setNotFound('');
       };


    } catch (error) {
      setDateError('Error buscando fechas. Por favor, inténtelo de nuevo.');
      console.error('Internal Error from catch: ', error);
    }
  };

  return (
    <div className="SearchByDateRange">
      <h2>Busqueda de fecha por rango</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Fecha de inicio:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label>
          Fecha de fin:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <button type="submit">Buscar</button>
      </form>

      {dateError && (
        <div style={{ color: 'red' }}>{dateError}</div>
      )}

      {notFound && (
        <div style={{ color: 'red' }}>{notFound}</div>
      )}

      {searchResults && (
        <div>
          <h3>Resultados de la búsqueda</h3>
          {/* Render search results in an ordered list */}
          <ol>
            {searchResults.map((result) => (
              <li key={result.date_id}>
                <p>Fecha: {result.date}</p>
                <p>Numero de telefono de cliente: {result.phone_number}</p>
                <p>Nombre de cliente: {result.person_who_booked || 'No hay nombre disponible'}</p>
                <p>Mensaje personalizado: {result.custom_message || 'No hay mensaje personalizado' }</p>
                <p>Dueño: {result.owner}</p>
                <p>Correo de cliente: {result.email || 'No hay correo disponible'}</p>
        
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );

}

export default SearchByDateRange;
