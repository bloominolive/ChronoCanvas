import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Usando GET con los parámetros en la URL
      const response = await axios.get(
        'https://chronocanvas-api.onrender.com/auth/login',
        {
          params: {
            email: formData.email,
            password: formData.password
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.token) {
        // Guardar el token
        localStorage.setItem('token', response.data.token);
        // Redirigir al home
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err.response || err);
      setError(err.response?.data?.message || 'Error al iniciar sesión. Por favor, intente nuevamente.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 shadow-lg rounded bg-white" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100 text-light"
          >
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
}