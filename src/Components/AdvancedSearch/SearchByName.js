import React, { useState } from "react";
import './SearchByName.css';
import FetchWithAuth from "../../auth/FetchWithAuth";

const accessToken = localStorage.getItem('accessToken');
const URL = process.env.REACT_APP_SERVER_URL;

function SearchByName() {
  const [nameSearch, setNameSearch] = useState('');
  const [nameError, setNameError] = useState('');
  const [notFound, setNotFound] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // Redirect to login if no access token
  if (!accessToken) {
    window.location.href = '/login';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset states
    setNameError('');
    setNotFound('');
    setGeneralError('');
    setSearchResults(null);

    // Validate input
    if (!nameSearch.trim()) {
      setNameError('Please enter a valid name.');
      return;
    }

    try {
      // Encode the search query to handle spaces and special characters
      const query = encodeURIComponent(nameSearch.trim());
      const response = await FetchWithAuth(`${URL}/searchbypersonwhobooked?searchbypersonwhobooked=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        // Handle response errors
        if (response.status === 404) {
          setNotFound('No se encontraron fechas con ese nombre.');
        } else {
          setGeneralError('Error buscando fechas.');
        }
        return;
      }

      const data = await response.json();

      if (data.length > 0) {
        setSearchResults(data);
        setNotFound('');
      } else {
        setNotFound('No se encontraron fechas con ese nombre.');
      }
    } catch (error) {
      setGeneralError('Error buscando fechas.');
      console.error('Error during fetch:', error);
    }
  };

  return (
    <div className="SearchByName">
      <h3>Busqueda de fecha por nombre de cliente</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
        </label>
        <button type="submit">Buscar</button>
      </form>

      {nameError && (
        <div style={{ color: 'red' }}>{nameError}</div>
      )}

      {notFound && (
        <div style={{ color: 'red' }}>{notFound}</div>
      )}

      {generalError && (
        <div style={{ color: 'red' }}>
          <p>{generalError}</p>
        </div>
      )}

      {searchResults && (
        <div>
          <h2>Resultados de la búsqueda</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.date_id}>
                <p>Fecha: {result.date}</p>
                <p>Numero de telefono: {result.phone_number}</p>
                <p>Nombre de cliente: {result.person_who_booked || 'No hay nombre disponible'}</p>
                <p>Mensaje personalizado: {result.custom_message || 'No hay mensaje personalizado' }</p>
                <p>Dueño: {result.owner}</p>
                <p>Correo de cliente: {result.email || 'No hay correo disponible'}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchByName;
