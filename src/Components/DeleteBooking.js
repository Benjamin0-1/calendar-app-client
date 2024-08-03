import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import DeleteByName from "./DeleteByName";
import DeleteByPhone from "./DeleteByPhone";
import DeleteByRange from "./DeleteByDateRange";
import FetchWithAuth from "../auth/FetchWithAuth";

const accessToken = localStorage.getItem('accessToken');
const URL = process.env.REACT_APP_SERVER_URL;

function DeleteBooking() {
    const [dateToDelete, setDateToDelete] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [error, setError] = useState('');

    if (!accessToken) {
        window.location.href = '/login';
    }

    const handleDelete = async () => {
        setDeleteError('');
        setError('');

        if (!dateToDelete) {
            toast.error('Debe ingresar una fecha');
            return;
        }

        try {
            const response = await FetchWithAuth(`${URL}/deletebooking?deleteBooking=${dateToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                toast.success(`Fecha eliminada exitosamente: ${data.message}`);
                setDateToDelete('');
            } else {
                const data = await response.json();
                if (data.noDateFound) {
                    toast.error('No se encontró la fecha');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error('Error eliminando fecha');
        }
    };

    return (
        <Container>
            <ToastContainer />
            <Typography variant="h4" gutterBottom>Eliminar una fecha:</Typography>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    fullWidth
                    type="date"
                    name="dateToDelete"
                    label="Fecha a Eliminar"
                    value={dateToDelete}
                    onChange={(e) => setDateToDelete(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleDelete}>
                    Eliminar Reserva
                </Button>
            </Box>
            <Box mt={4}>
                <DeleteByName />
            </Box>
            <Box mt={4}>
                <DeleteByPhone />
            </Box>
            <Box mt={4}>
                <DeleteByRange />
            </Box>
        </Container>
    );
}

export default DeleteBooking;

