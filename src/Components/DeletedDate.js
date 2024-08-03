import React, { useState, useEffect } from "react";
import FetchWithAuth from "../auth/FetchWithAuth";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  Grid,
  Box
} from '@mui/material';

const accessToken = localStorage.getItem('accessToken');
const URL = process.env.REACT_APP_SERVER_URL;

function DeletedDate() {
  const [dates, setDates] = useState([]);
  const [error, setError] = useState('');
  const [generalError, setGeneralError] = useState('');

  if (!accessToken) {
    window.location.href = '/login';
  }

  const getDeletedBookings = async () => {
    try {
      const response = await FetchWithAuth(`${URL}/dates/all-deleted-dates`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      const data = await response.json();

      if (data.noDeletedDatesFound) {
        setError('No hay fechas eliminadas disponibles');
        return;
      }

      setDates(data);

    } catch (error) {
      setGeneralError('Ha ocurrido un error');
    }
  };

  useEffect(() => {
    getDeletedBookings();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Fechas Eliminadas</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {generalError && <Typography color="error">{generalError}</Typography>}
      <Typography variant="h6">Total de fechas eliminadas: {dates.length}</Typography>

      <Grid container spacing={3}>
        {dates.map((date) => (
          <Grid item xs={12} sm={6} md={4} key={date.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Fecha: {new Date(date.date).toISOString().split('T')[0]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nombre de cliente: <span style={{ color: 'blue' }}>{date.person_who_booked || 'No existe nombre de cliente'}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rentada a cliente por Dueño: <span style={{ color: 'green' }}>{date.owner}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Numero telefonico de cliente: {date.phone_number || 'No hay numero disponible'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Correo cliente: {date.email || 'No hay correo disponible'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mensaje personalizado: {date.custom_message || 'No hay mensaje personalizado'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha eliminada el: {date.createdAt}
                </Typography>
              </CardContent>
              <CardActions>
        
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default DeletedDate;
