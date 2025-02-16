import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importar el hook useAuth

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Usar el hook useAuth
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const response = await axios.post(
        'https://chronocanvas-api.onrender.com/auth/login',
        {
          email: formData.email,
          password: formData.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.user) {
          // Usar la función login del contexto
          login(response.data.user);
        }
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err.response || err);
      setError(
        err.response?.data?.message || 
        'Error al iniciar sesión. Por favor, verifique sus credenciales.'
      );
    } finally {
      setLoading(false);
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
              disabled={loading}
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
              disabled={loading}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100 text-light"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Login'}
          </Button>
        </Form>
      </div>
    </Container>
  );
}