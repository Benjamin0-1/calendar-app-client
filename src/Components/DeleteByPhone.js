import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FetchWithAuth from "../auth/FetchWithAuth";

const accessToken = localStorage.getItem('accessToken');
const URL = process.env.REACT_APP_SERVER_URL;

function DeleteByPhone() {
    const [phoneNumber, setPhoneNumber] = useState('');

    if (!accessToken) {
        window.location.href = '/login';
    }

    const handleChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleDelete = async () => {
        if (!/^\d*$/.test(phoneNumber)) {
            toast.error('El formato del número telefónico es inválido. Solamente debe contener números.');
            return;
        }

        if (phoneNumber.length < 7) {
            toast.error('Número demasiado corto.');
            return;
        }

        try {
            const response = await FetchWithAuth(`${URL}/deletebyphone/${phoneNumber}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.status === 404) {
                toast.error(`No se ha encontrado ninguna fecha con el número telefónico: ${phoneNumber}`);
                return;
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            toast.success(data.successMessage);
            setPhoneNumber('');
        } catch (error) {
            toast.error('Ha ocurrido un error, por favor intente nuevamente.');
            console.log(`Error from catch: ${error}`);
        }
    };

    return (
        <Container maxWidth="sm">
            <ToastContainer />
            <Typography variant="h6" color="error">
                <strong>ADVERTENCIA:</strong> Este método eliminará todas las fechas asociadas al número telefónico ingresado
            </Typography>
            <Box component="form" noValidate autoComplete="off" mt={2}>
                <TextField
                    fullWidth
                    label="Número Telefónico"
                    type="text"
                    value={phoneNumber}
                    onChange={handleChange}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDelete}
                    disabled={!phoneNumber} // Disable the button if the phone number is empty
                >
                    Eliminar fechas por número telefónico
                </Button>
            </Box>
        </Container>
    );
}

export default DeleteByPhone;
