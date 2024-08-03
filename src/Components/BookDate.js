import React, { useState } from "react";
import FetchWithAuth from "../auth/FetchWithAuth";
import { TextField, Button, Typography, MenuItem, Select, InputLabel, CircularProgress, Container } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const accessToken = localStorage.getItem('accessToken');
const URL = process.env.REACT_APP_SERVER_URL;

function BookDate() {
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState({
    phone_number: '',
    email: '',
    custom_message: '',
    owner: '',
    person_who_booked: '',
    date: ''
  });

  if (!accessToken) {
    window.location.href = '/login'; 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!booking.person_who_booked || booking.person_who_booked.length < 3) {
      toast.error('Debe introducir un nombre válido y de al menos 3 caracteres');
      setIsLoading(false);
      return; 
    }

    if (booking.phone_number.length < 7) {
      toast.error('Número telefónico demasiado corto');
      setIsLoading(false);
      return;
    }

    if (!booking.owner) {
      toast.error('Debe seleccionar un dueño');
      setIsLoading(false);
      return;
    }

    if (!booking.date) {
      toast.error('Debe seleccionar una fecha');
      setIsLoading(false);
      return;
    }

    const selectedDate = new Date(booking.date);
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      toast.error('No puede reservar una fecha que ya pasó');
      setIsLoading(false);
      return;
    }

    try {
      const response = await FetchWithAuth(`${URL}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(booking),
      });

      if (response.status === 201) {
        const data = await response.json();
        toast.success(`Fecha: ${data.date} apartada con éxito`);
        setBooking({
          phone_number: '',
          email: '',
          custom_message: '',
          owner: '',
          person_who_booked: '',
          date: ''
        });
      } else {
        const data = await response.json();
        toast.error(data.isDateBooked ? 'La fecha ya está reservada' : 'Error apartando fecha');
      }
    } catch (error) {
      toast.error('Error apartando fecha');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value
    }));
  };

  const handleKeyPress = (e) => {
    if ((e.target.name === 'person_who_booked' || e.target.name === 'phone_number') && e.key === ' ') {
      e.preventDefault(); // Prevent space input in person_who_booked and phone_number
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>Aparta una fecha</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Persona que apartó"
          type="text"
          name="person_who_booked"
          value={booking.person_who_booked}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Numero telefónico"
          type="number" // Change the type to "number"
          name="phone_number"
          value={booking.phone_number}
          onChange={handleChange}
          onKeyPress={handleKeyPress} // Add this line to handle space in phone_number
          margin="normal"
        />

        <TextField
          fullWidth
          label="Correo Electrónico (opcional)"
          type="email"
          name="email"
          value={booking.email}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Mensaje Personalizado (opcional)"
          name="custom_message"
          value={booking.custom_message}
          onChange={handleChange}
          multiline
          rows={4}
          margin="normal"
        />

        <InputLabel id="owner-label">Seleccionar Dueño</InputLabel>
        <Select
          labelId="owner-label"
          fullWidth
          name="owner"
          value={booking.owner}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value=""><em>Selecciona:</em></MenuItem>
          <MenuItem value='ricardo'>Ricardo</MenuItem>
          <MenuItem value='jose'>Jose</MenuItem>
        </Select>

        <TextField
          fullWidth
          label="Fecha"
          type="date"
          name="date"
          value={booking.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Apartar Fecha'}
        </Button>
      </form>
    </Container>
  );
}

export default BookDate;
