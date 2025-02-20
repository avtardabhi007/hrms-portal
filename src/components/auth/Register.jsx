import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  IconButton,
  useTheme,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { Google, Apple } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { registerUser, selectAuthLoading, selectAuthError, clearError } from '../../store/auth';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(registerUser(formData));
      if (!resultAction.error) {
        navigate('/login');
      } else {
        console.error('Registration failed:', resultAction.error);
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        p: 3
      }}
    >
      <Paper
        sx={{
          maxWidth: 480,
          width: '100%',
          p: 4,
        }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main',
              borderRadius: 1,
              display: 'inline-flex',
              mb: 2
            }}
          />
          <Typography variant="h4" sx={{ mb: 1 }}>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Get started with your free account
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              variant="outlined"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              variant="outlined"
              value={formData.lastName}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </Box>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            sx={{ mb: 2 }}
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            type="tel"
            variant="outlined"
            sx={{ mb: 2 }}
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="e.g., +1234567890"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            sx={{ mb: 3 }}
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disabled={loading}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              mb: 2,
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            sx={{ borderColor: '#eee' }}
            disabled={loading}
          >
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Apple />}
            sx={{ borderColor: '#eee' }}
            disabled={loading}
          >
            Sign up with Apple
          </Button>
        </Box>

        <Typography variant="body2" align="center" color="text.secondary">
          Already have an account?{' '}
          <Link
            component="button"
            onClick={() => navigate('/login')}
            underline="none"
            color="primary.main"
            disabled={loading}
          >
            Sign in
          </Link>
        </Typography>
      </Paper>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => dispatch(clearError())}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => dispatch(clearError())} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register; 