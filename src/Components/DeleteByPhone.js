import React, { useState } from "react";
import './DeleteByPhone.css';

function DeleteByPhone() {
    const [generalError, setGeneralError] = useState('');
    const [dateNotFoundMessage, setDateNotFoundMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [invalidPhoneFormat, setInvalidPhoneFormat] = useState('');
    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        setPhoneNumber(e.target.value);
    };
/*
    const validatePhone = () => {
        if (!/^\d*$/.test(phoneNumber)) {
            setInvalidPhoneFormat('Solamente debe contener numeros');
            setSuccessMessage('');
            setDateNotFoundMessage('');
            setGeneralError('');
        }; 
    }; */

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://calendar-app-server3-2499724774e3.herokuapp.com/deletebyphone/${phoneNumber}`, {
                method: 'DELETE',
            });
    
            if (response.status === 404) {
                setDateNotFoundMessage(`No se ha encontrado ninguna fecha con el número telefónico: ${phoneNumber}`);
                setGeneralError('');
                setSuccessMessage('');
                setInvalidPhoneFormat('');
                setPhoneError('');
                return;
            }
    
            if (!/^\d*$/.test(phoneNumber)) {
                setInvalidPhoneFormat('Solamente debe contener numeros.'); 
                setGeneralError('');
                setDateNotFoundMessage('');
                setSuccessMessage('');
                setPhoneError('');
                return;
            }
            
            if (phoneNumber.length < 7) {
                setPhoneError('Numero demasiado corto.');
                setGeneralError('');
                setDateNotFoundMessage('');
                setSuccessMessage('');
                setInvalidPhoneFormat('');
                return;
            }
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setSuccessMessage(data.successMessage);
            setGeneralError('');
            setDateNotFoundMessage('');
            setInvalidPhoneFormat('');
            setPhoneError('');
        } catch (error) {
            setGeneralError('Ha ocurrido un error, por favor intente nuevamente.');
            setSuccessMessage('');
            setDateNotFoundMessage('');
            setInvalidPhoneFormat('');
            setPhoneError('');
            console.log(`Error from catch: ${error}`);
        }
    };
    

    return (
        <div className="DeleteByPhone">
            <h3>Eliminar fechas por número telefónico</h3>
            <p><strong>ADVERTENCIA:</strong> Este método eliminará todas las fechas asociadas al número telefónico ingresado</p>
            <input type="text" onChange={handleChange} />
            <button onClick={handleDelete}>Eliminar fechas por número telefónico</button>
            {generalError && <p style={{ color: 'red' }}>{generalError}</p>}
            {dateNotFoundMessage && <p style={{ color: 'red' }}>{dateNotFoundMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {phoneError && <p style={{color: 'red'}}>{phoneError}</p>}
            {invalidPhoneFormat && <p style={{ color: 'red' }}>El formato del número telefónico es inválido</p>}
        </div>
    );
    
};

export default DeleteByPhone;
