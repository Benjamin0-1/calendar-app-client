import React, { useState } from "react";
import './UpdateBooking.css'; 

function UpdateBooking() {
    // State variables to manage input values and errors
    const [dateToUpdate, setDateToUpdate] = useState("");
    const [personWhoBooked, setPersonWhoBooked] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [customMessage, setCustomMessage] = useState("");
    const [owner, setOwner] = useState("");
    const [error, setError] = useState("");

    // Function to handle form submission
    // Function to handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`https://calendar-app-server3-2499724774e3.herokuapp.com/updatebooking/${dateToUpdate}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                person_who_booked: personWhoBooked,
                phone_number: phoneNumber,
                email: email,
                custom_message: customMessage,
                owner: owner,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.successMessage);
            // Optionally, you can update the UI to show success message
        } else {
            const text = await response.text();
            setError(text || 'Error updating booking');
        }
    } catch (error) {
        console.error('Error updating booking:', error);
        setError('Internal Server Error');
    }
};


    return (
        <div className="UpdateBooking">
            <h3>Update Booking</h3>
            <form onSubmit={handleSubmit}>
                <label>Date to Update:</label>
                <input
                    type="text"
                    value={dateToUpdate}
                    onChange={(e) => setDateToUpdate(e.target.value)}
                    required
                />
                <label>Person Who Booked:</label>
                <input
                    type="text"
                    value={personWhoBooked}
                    onChange={(e) => setPersonWhoBooked(e.target.value)}
                />
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Custom Message:</label>
                <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                />
                <label>Owner:</label>
                <input
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                />
                <button type="submit">Update Booking</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default UpdateBooking;
