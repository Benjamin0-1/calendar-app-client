import React, { useState, useEffect } from "react";
import './ShowAllBookings.css';
import { useNavigate } from "react-router-dom";
import FetchWithAuth from "../auth/FetchWithAuth";

const accessToken = localStorage.getItem('accessToken');
const URL = process.env.REACT_APP_SERVER_URL;

function ShowAllBookings() {
    const [dates, setDates] = useState([]);
    const [error, setError] = useState('');
    const [bookingsPerOwner, setBookingsPerOwner] = useState({});
    const [errorCount, setErrorCount] = useState('');
    const [selectedOwner, setSelectedOwner] = useState(''); // New state for selected owner
    const [owners, setOwners] = useState([]); // To store the list of owners

    const navigate = useNavigate();

    if (!accessToken) {
        window.location.href = '/login';
    }

    const getBookings = async (owner) => {
        try {
            const url = owner ? `${URL}/book-${owner}` : `${URL}/book`; // Dynamically construct URL
            const response = await FetchWithAuth(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });
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
            const response = await FetchWithAuth(`${URL}/getbookingcount`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                setBookingsPerOwner(data);
                setOwners(Object.keys(data)); // Set the list of owners
            }
        } catch (error) {
            console.log('Error : ', error);
            setErrorCount('Error mostrando resultados');
        }
    };

    useEffect(() => {
        getBookings();
        getBookingsPerOwner();
    }, []); // Empty dependency array means this runs once when the component mounts

    const handleOwnerChange = (event) => {
        const owner = event.target.value;
        setSelectedOwner(owner);
        getBookings(owner); // Fetch bookings for the selected owner
    };

    return (
        <div className="ShowAllBookings">
            <br />
            <p>Total de fechas apartadas: {dates.length}</p>

            <div>
                {Object.entries(bookingsPerOwner).map(([owner, count]) => (
                    <div key={owner}>{`${owner}: Ha apartado: ${count} Fechas`}</div>
                ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <label 
        htmlFor="owner-filter" 
        style={{ marginRight: '10px', fontSize: '16px', fontWeight: 'bold' }}
    >
        Filtrar por dueño:
    </label>
    <select 
        id="owner-filter" 
        value={selectedOwner} 
        onChange={handleOwnerChange}
        style={{
            padding: '5px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
            outline: 'none',
            cursor: 'pointer'
        }}
    >
        <option value="">Todos</option>
        {owners.map((owner) => (
            <option key={owner} value={owner}>{owner}</option>
        ))}
    </select>
</div>



            {error && <div style={{ color: 'red' }}>{error}</div>}
            <h2>Fechas apartadas:</h2>
            <ol>
                {dates.map((date) => (
                    <li key={date.date_id}>
                        <div>{new Date(date.date).toISOString().split('T')[0]}</div>
                        <div>Nombre de cliente: <span style={{ color: 'blue' }}> {date.person_who_booked || 'No existe nombre de cliente'} </span></div>
                        <div>Rentada a cliente por Dueño: <span style={{ color: 'green' }}>{date.owner}</span></div>
                        <br />
                        <div>Numero telefonico de cliente: {date.phone_number || 'No hay numero disponible'}</div>
                        <br />
                        <div>Correo cliente: {date.email || 'No hay correo disponible'}</div>
                        <div>Mensaje personalizado: {date.custom_message || 'No hay mensaje personalizado'}</div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ShowAllBookings;


/**
 * const checkTokenValidity = async () => {
        try {
            const response = await FetchWithAuth(`${URL}/validate-token`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.status === 401) { // Unauthorized
                // Token is invalid or expired
                localStorage.removeItem('accessToken'); // Clear invalid token
                navigate('/login'); // Redirect to login
            } else if (!response.ok) {
                setError('Failed to validate token.');
            }
        } catch (error) {
            console.error('Error validating token:', error);
            localStorage.removeItem('accessToken'); // Clear token on error
            navigate('/login'); // Redirect to login
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            navigate('/login');
        } else {
            checkTokenValidity(); // Check if the token is still valid
        }
    }, [navigate]);

 */