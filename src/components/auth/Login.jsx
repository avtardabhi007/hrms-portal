import React, { useState, useEffect } from 'react';
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
import { 
  loginUser, 
  selectAuthLoading, 
  selectAuthError, 
  selectAuthSuccess,
  selectIsAuthenticated,
  clearError 
} from '../../store/auth';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const success = useSelector(selectAuthSuccess);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      // Short delay to show success message before redirect
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate, success]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(resultAction)) {
      // Success case is handled by useEffect above
      console.log('Login successful');
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
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back! Please enter your details.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
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
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Link
              component="button"
              onClick={() => navigate('/forgot-password')}
              underline="none"
              color="text.secondary"
              disabled={loading}
            >
              Forgot password?
            </Link>
          </Box>

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
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
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
            Sign in with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Apple />}
            sx={{ borderColor: '#eee' }}
            disabled={loading}
          >
            Sign in with Apple
          </Button>
        </Box>

        <Typography variant="body2" align="center" color="text.secondary">
          Don't have an account?{' '}
          <Link
            component="button"
            onClick={() => navigate('/register')}
            underline="none"
            color="primary.main"
            disabled={loading}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>

      <Snackbar 
        open={!!error || !!success} 
        autoHideDuration={success ? 2000 : 6000} 
        onClose={() => {
          dispatch(clearError());
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => dispatch(clearError())} 
          severity={error ? "error" : "success"} 
          sx={{ width: '100%' }}
        >
          {error || (success ? "Login successful! Redirecting to dashboard..." : "")}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login; 