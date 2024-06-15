import React, { useState } from "react";

const URL = process.env.REACT_APP_SERVER_URL;

function NewsLetter() {
  const [email, setEmail] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailAlreadyAddedError, setEmailAlreadyAddedError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch(`${URL}/newsletter/email`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.invalidEmailFormat) {
        setGeneralError("Correo invalido");
        setSuccessMessage("");
        setEmailAlreadyAddedError("");
        setIsLoading(false);
        return;
      }

      if (data.emailAlreadyAdded) {
        setEmailAlreadyAddedError(data.emailAlreadyAdded);
        setGeneralError("");
        setSuccessMessage("");
        setIsLoading(false);
        return;
      }

      setSuccessMessage("Email added successfully to the newsletter");
      setGeneralError("");
      setEmailAlreadyAddedError("");
    } catch (error) {
      setGeneralError("Ha ocurrido un error");
      setSuccessMessage("");
      setEmailAlreadyAddedError("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f3f3f3", padding: "10px", borderRadius: "4px", textAlign: "center" }}>
      <h3>Suscríbete a nuestro Newsletter para recibir ofertas especiales</h3>

      {generalError && <p style={{ color: "red" }}>{generalError}</p>}
      {emailAlreadyAddedError && (
        <p style={{ color: "red" }}>{emailAlreadyAddedError}</p>
      )}
      {isLoading && <p>Cargando...</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingresa tu dirección de correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", marginRight: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          required
        />
        <button type="submit" style={{ padding: "8px", borderRadius: "4px", border: "none", backgroundColor: "#2196f3", color: "#fff" }}>
          Suscribirse
        </button>
      </form>
    </div>
  );

}

export default NewsLetter;
