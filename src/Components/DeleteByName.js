import React, {useState} from "react";
import './DeleteByName.css';


function DeleteByName() {
    const [generalError, setGeneralError] = useState('');
    const [dateNotFoundMessage, setDateNotFoundMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [name, setName] = useState(''); // <= name to search and delete such date
    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        setName(e.target.value.toLowerCase());
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://calendar-app-server3-2499724774e3.herokuapp.com/deletebyname/${name}`, {
                method: 'DELETE',
            });
            
            if (response.status === 404) {
                setDateNotFoundMessage(`No se ha encontrado ninguna fecha con el nombre de Cliente: ${name}`);
                setGeneralError('');
                setSuccessMessage('');
                return;
            }
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setSuccessMessage(data.successMessage);
            setGeneralError('');
            setDateNotFoundMessage('');
        } catch (error) {
            setGeneralError('Ha ocurrido un error, por favor intente nuevamente.');
            setSuccessMessage('');
            setDateNotFoundMessage('');
            console.log(`Error from catch: ${error}`);
        }
    };
    

    return(
        <div className="DeleteByName">
            <h3>Eliminar fechas por nombre de cliente</h3>
            <p><strong>ADVERTENCIA:</strong> Este método eliminará todas las fechas con el nombre de cliente ingresado</p>
            <input type="text" onChange={handleChange} />
            <button onClick={handleDelete}>Eliminar fechas por nombre</button>
            {generalError && <p style={{color: 'red'}}>{generalError}</p>}
            {dateNotFoundMessage && <p style={{color: 'red'}}>{dateNotFoundMessage}</p>}
            {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
        </div>
    );

};




export default DeleteByName;
