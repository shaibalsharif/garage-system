import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Box,
  Grid
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from '../../firebase'; // Ensure this is correctly imported
import { sendPasswordResetEmail } from 'firebase/auth'; // Import the function for resetting password

const theme = createTheme({
  palette: {
    primary: {
      main: '#f85f6a', // Coral color
    },
    background: {
      default: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
});

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // To display success or error messages
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email); // Send password reset email
      console.log("A password reset link has been sent to your email.");

      setMessage('A password reset link has been sent to your email.');
      setError(''); // Clear any previous errors
    } catch (error) {
      setMessage(''); // Clear any previous messages
      setError('Failed to send reset email. Please check your email address.');
      console.log('Error sending password reset email:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" className="h-screen flex items-center justify-center">
        <Paper elevation={10} className="w-full max-w-4xl overflow-hidden">
          <Grid container>
            {/* Left side - Forgot Password Form */}
            <Grid item xs={12} md={6} className="p-8">
              <Typography component="h1" variant="h4" className="mb-6 text-center">
                Forgot Password
              </Typography>
              <Typography className="text-center mb-6 text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
              </Typography>

              {message && (
                <Typography className="text-green-500 text-center mb-4">
                  {message}
                </Typography>
              )}

              {error && (
                <Typography className="text-red-500 text-center mb-4">
                  {error}
                </Typography>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-100"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="py-3 text-lg font-semibold mt-4"
                >
                  RESET PASSWORD
                </Button>
              </form>

              <Box className="mt-6 text-center">
                <Typography className="text-gray-600">
                  Remember your password?{' '}
                  <a href="/login" className="text-primary hover:underline font-semibold">
                    Back to Login
                  </a>
                </Typography>
              </Box>
            </Grid>

            {/* Right side - Decorative */}
            <Grid item xs={12} md={6} className="bg-primary text-black p-8 flex flex-col items-center justify-center">
              <Typography variant="h4" className="mb-6 font-bold">
                Password Recovery
              </Typography>
              <Typography className="text-center mb-8">
                Don't worry! It happens. Please enter the email address associated with your account.
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                href="/register"
                className="py-2 px-8 rounded-full border-2 hover:bg-white hover:text-primary transition-colors"
              >
                CREATE ACCOUNT
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
