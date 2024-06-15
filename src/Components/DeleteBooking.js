import React from "react";
import { useState } from "react";
import './DeleteBooking.css';
import DeleteByName from "./DeleteByName";
import DeleteByPhone from "./DeleteByPhone";
import DeleteByRange from "./DeleteByDateRange";
import FetchWithAuth from "../auth/FetchWithAuth";

const accessToken = localStorage.getItem('accessToken');

const URL = process.env.REACT_APP_SERVER_URL;

function DeleteBooking() {
const [dateToDelete, setDateToDelete] = useState('');
const [deleteSuccess, setDeleteSuccess] = useState('');
const [deleteError, setDeleteError] = useState('');
const [successDeleting, setSuccessDeleting] = useState(false);
const [errorDeleting, setErrorDeleting] = useState(false);
const [currentDateError, setCurrentDateError] = useState('');
const [noDateFound, setNoDateFound] = useState(false); // from the server
const [error, setError] = useState(''); // for the catch block
// const [dateDetails, setDateDetails] = useState(null);

if (!accessToken) {
    window.location.href = '/login'
};

const handleDelete = async () => {
setSuccessDeleting(false);
setErrorDeleting(false);
setCurrentDateError('');
setError('');
setNoDateFound(false);
setDeleteError('');

if (!dateToDelete) {
setDeleteError('Debe ingresar una fecha');
return;
}

// const selectedDate = new Date(dateToDelete);
// const currentDate = new Date();

// if (selectedDate < currentDate) {
// setErrorDeleting(true);
// return;
// }

try {
const response = await FetchWithAuth(`${URL}/deletebooking?deleteBooking=${dateToDelete}`, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${accessToken}`
      },
});

if (response.status === 200) {
const data = await response.json();
setDeleteSuccess(data.message); // set the success message
setSuccessDeleting(true);
} else {
const data = await response.json();
if (data.noDateFound) {
setNoDateFound(true);
setErrorDeleting(true);
} else {
setErrorDeleting(true);
setDeleteError(data.message);
}
}
} catch (error) {
setError('Error eliminando fecha');
}
};




return (
<div className="DeleteBooking">
<h3>Eliminar una fecha:</h3>
<label>
Fecha a Eliminar:
<input
type="date"
name="dateToDelete"
value={dateToDelete}
onChange={(e) => setDateToDelete(e.target.value)}
/>
</label>
<br />

{deleteError && <div style={{ color: 'red' }}>{deleteError}</div>}
{/*} {currentDateError && <div style={{ color: 'red' }}>{currentDateError}</div>} */ }

{noDateFound && <div style={{ color: 'red' }}>No se encontró la fecha</div>}
{errorDeleting && <div style={{ color: 'red' }}>{deleteError}</div>}
{error && <div style={{ color: 'red' }}>{error}</div>}
<button type="button" onClick={handleDelete}>
Eliminar Reserva
</button>
{successDeleting && <div style={{ color: 'green' }}>Fecha eliminada exitosamente: {dateToDelete}</div>}

<br /> 
<br/>
<DeleteByName />
<br/>
<br/>
<DeleteByPhone/>
<br/>
<DeleteByRange/>
</div>
);
};






export default DeleteBooking;

