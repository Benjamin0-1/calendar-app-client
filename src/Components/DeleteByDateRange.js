import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import FetchWithAuth from "../auth/FetchWithAuth";

const accessToken = localStorage.getItem('accessToken');
const URL = process.env.REACT_APP_SERVER_URL;

function DeleteByRange() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    if (!accessToken) {
        window.location.href = '/login';
    }

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const handleDelete = async () => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
            toast.error('La fecha es inválida, debe estar en formato: YYYY-MM-DD');
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        if (startDate >= endDate) {
            toast.error('La fecha no está en orden cronológico');
            return;
        }

        try {
            const response = await FetchWithAuth(`${URL}/deletebyrange/${startDate}/${endDate}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.successMessage);
                setStartDate('');
                setEndDate('');
            } else {
                toast.error(`No se encontraron fechas con el rango: ${startDate} y ${endDate}`);
            }
        } catch (error) {
            toast.error('Error eliminando fechas');
        }
    };

    return (
        <Container maxWidth="sm">
            <ToastContainer />
            <Typography variant="h6" color="error"><strong>ADVERTENCIA:</strong> Utilizar este método eliminará todas las fechas en el rango especificado.</Typography>
            <Box component="form" noValidate autoComplete="off" mt={2}>
                <TextField
                    fullWidth
                    type="date"
                    label="Fecha de inicio"
                    value={startDate}
                    onChange={handleStartDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    type="date"
                    label="Fecha de fin"
                    value={endDate}
                    onChange={handleEndDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleDelete}>
                    Eliminar fechas por rango
                </Button>
            </Box>
        </Container>
    );
}

export default DeleteByRange;
