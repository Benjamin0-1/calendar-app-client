import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FetchWithAuth from "../auth/FetchWithAuth";

const accessToken = localStorage.getItem('accessToken');
const URL = process.env.REACT_APP_SERVER_URL;

function DeleteByName() {
    const [name, setName] = useState(''); // <= name to search and delete such date

    if (!accessToken) {
        window.location.href = '/login';
    }

    const handleChange = (e) => {
        setName(e.target.value.toLowerCase());
    };

    const handleDelete = async () => {
        try {
            const response = await FetchWithAuth(`${URL}/deletebyname/${name}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            if (response.status === 404) {
                toast.error(`No se ha encontrado ninguna fecha con el nombre de Cliente: ${name}`);
                return;
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            toast.success(data.successMessage);
            setName('');
        } catch (error) {
            toast.error('Ha ocurrido un error, por favor intente nuevamente.');
            console.log(`Error from catch: ${error}`);
        }
    };

    return (
        <Container maxWidth="sm">
            <ToastContainer />
            <Typography variant="h6" color="error">
                <strong>ADVERTENCIA:</strong> Este método eliminará todas las fechas con el nombre de cliente ingresado
            </Typography>
            <Box component="form" noValidate autoComplete="off" mt={2}>
                <TextField
                    fullWidth
                    label="Nombre del Cliente"
                    type="text"
                    value={name}
                    onChange={handleChange}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDelete}
                    disabled={!name} // Disable the button if the name is empty
                >
                    Eliminar fechas por nombre
                </Button>
            </Box>
        </Container>
    );
}

export default DeleteByName;
