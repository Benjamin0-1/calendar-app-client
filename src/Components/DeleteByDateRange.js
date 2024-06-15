import React, { useState } from "react";
import './DeleteByRange.css';
import FetchWithAuth from "../auth/FetchWithAuth";


const accessToken = localStorage.getItem('accessToken');

const URL = process.env.REACT_APP_SERVER_URL;

function DeleteByRange() {
    const [generalError, setGeneralError] = useState('');
    const [invalidFormatError, setInvalidFormatError] = useState('');
    const [notFoundError, setNotFoundError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [invalidDateRange, setInvalidDateRange] = useState('');

    if (!accessToken) {
        window.location.href = '/login'
    };

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${URL}/deletebyrange/${startDate}/${endDate}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                  },
            });

            if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
                setInvalidFormatError('La fecha es invalida, debe estar en formato: YYYY-MM-DD');
                setGeneralError('');
                setNotFoundError('');
                setSuccessMessage('');
                setInvalidDateRange('');
                return;
            };
            
            const start = new Date(startDate)
            const end = new Date(endDate)
            if (startDate >= endDate) {
                setInvalidDateRange('La fecha no esta en orden cronologico');
                setGeneralError('');
                setNotFoundError('');
                setSuccessMessage('');
                setInvalidFormatError('');
                return;
            };


            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(data.successMessage);
                setGeneralError('');
                setInvalidFormatError('');
                setNotFoundError('');
            } else {
                setNotFoundError(`No se encontraron fechas con el rango: ${startDate} y ${endDate}`);
                setGeneralError('');
                setInvalidFormatError('');
                setSuccessMessage('');
                setInvalidDateRange('');
            };

        } catch (error) {
            console.log(`Error from catch: ${error}`);
            setInvalidFormatError('');
            setNotFoundError('');
            setSuccessMessage('');
            setInvalidDateRange('');
        };
    };

    return (
        <div className="DeleteByRange">
            <p style={{ color: 'red' }}><strong>ADVERTENCIA:</strong> utilizar este metodo eliminara todas fechas en el rango especificado.</p>
            <label style={{color: 'black'}}>Fecha de inicio:
                <input type="date" value={startDate} onChange={handleStartDate} />
            </label>
            <label style={{color: 'black'}}>Fecha de fin:
                <input type="date" value={endDate} onChange={handleEndDate} />
            </label>
            <button onClick={handleDelete}>Eliminar fechas por rango</button>
            {generalError && <p style={{ color: 'red' }}>{generalError}</p>}
            {invalidFormatError && <p style={{ color: 'red' }}>{invalidFormatError}</p>}
            {notFoundError && <p style={{ color: 'red' }}>{notFoundError}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {invalidDateRange && <p style={{color: 'red'}}>{invalidDateRange}</p>}
        </div>
    );
};

export default DeleteByRange;
