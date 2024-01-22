"use client"
import React, { useState } from 'react';
import axios from 'axios';  // Import Axios for making HTTP requests
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { redirect } from 'next/navigation'


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Use the correct endpoint for login
      const response = await axios.post('http://localhost:3001/admin/login', credentials);

      console.log(response.data);
      setLoggedIn(true);

      setCredentials({ username: '', password: '' });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

   if (loggedIn) {
    redirect('/pages/Dashboard');
  }

  return (
    <Container style={{ maxWidth: '400px', marginTop: '100px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={credentials.username}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={credentials.password}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
